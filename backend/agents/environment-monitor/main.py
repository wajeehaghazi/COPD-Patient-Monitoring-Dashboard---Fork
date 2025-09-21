import logging
import os, json, asyncio, traceback
from langchain_mcp_adapters.client import MultiServerMCPClient
from langchain.prompts import ChatPromptTemplate
from langchain.chat_models import init_chat_model
from langchain.agents import create_tool_calling_agent, AgentExecutor
from langchain.tools import Tool
from dotenv import load_dotenv
import urllib.parse
from environment_monitor import EnvironmentMonitor

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

async def environment_monitor_tool(location: str):
    """
    Monitors environmental conditions relevant to COPD patients using weather and air quality data.

    Args:
        location (str): The city name to retrieve environmental data for.
        
    Returns:
        str: Structured assessment of environmental risk factors (e.g., AQI, temperature, humidity) 
            along with COPD-related risk level and patient-friendly recommendations.
    """
    api_key = os.getenv("OPENWEATHER_API_KEY")

    if not api_key:
        raise ValueError("❌ OPENWEATHER_API_KEY is not set in environment variables.")
        
    solver = EnvironmentMonitor(api_key)
    solution = await solver.get_environment_report(location)
    return solution

def get_tools_description(tools):
    return "\n".join(
        f"Tool: {tool.name}, Schema: {json.dumps(tool.args_schema).replace('{', '{{').replace('}', '}}')}"
        for tool in tools
    )

async def create_agent(coral_tools, agent_tools):
    coral_tools_description = get_tools_description(coral_tools)
    agent_tools_description = get_tools_description(agent_tools)
    combined_tools = coral_tools + agent_tools

    prompt = ChatPromptTemplate.from_messages([
        (
            "system",
            f"""You are a specialized environmental monitoring agent that helps assess COPD-related risks 
            based on air quality and weather conditions. You interact with tools from Coral Server and 
            have your own environment monitoring capabilities.

            Follow these steps in order:

            1. Call wait_for_mentions from coral tools (timeoutMs: 30000) to receive mentions from other agents.
            2. When you receive a mention, keep the thread ID and the sender ID.
            3. Analyze the content to identify if it contains a location or an environmental monitoring request.
            4. If it's an environmental request:
            - Use your environment_monitor tool to fetch weather and air quality data
            - Assess environmental risk factors such as AQI, temperature, humidity, and weather conditions
            - Provide COPD-focused recommendations in clear, patient-friendly language
            - Indicate whether the conditions pose low, moderate, or high risk
            5. If it's a general question about environmental effects on COPD:
            - Explain the relevant factors clearly
            - Use examples appropriate for patient understanding
            - Break down complex ideas into simple, actionable advice
            6. Structure your response with:
            - Clear identification of the environmental factors
            - Step-by-step risk assessment
            - Final risk level with context
            - Key takeaways or recommendations for the patient
            7. Use send_message from coral tools to send your complete assessment back to the sender.
            8. If any error occurs, use send_message to send an error message with a brief explanation.
            9. Always respond back to the sender agent even if you cannot process the request.
            10. Repeat the process from step 1.

            Environmental factors you can help with include:
            - Air Quality Index (AQI) and pollutants (PM2.5, PM10, NO2, O3, etc.)
            - Weather conditions (temperature, humidity, wind speed)
            - Extreme heat or cold as COPD triggers
            - Seasonal variations affecting COPD symptoms
            - Recommendations for safe outdoor activities
            - Preventive actions to minimize environmental risk

            These are the list of coral tools: {coral_tools_description}
            These are the list of your tools: {agent_tools_description}."""
        ),
        ("placeholder", "{agent_scratchpad}")
    ])

    model = init_chat_model(
        model=os.getenv("MODEL_NAME"),
        model_provider=os.getenv("MODEL_PROVIDER"),
        api_key=os.getenv("MODEL_API_KEY"),
        temperature=float(os.getenv("MODEL_TEMPERATURE", "0.1")),
        max_tokens=int(os.getenv("MODEL_MAX_TOKENS", "8000")),
        base_url=os.getenv("MODEL_BASE_URL") if os.getenv("MODEL_BASE_URL") else None
    )

    agent = create_tool_calling_agent(model, combined_tools, prompt)
    return AgentExecutor(agent=agent, tools=combined_tools, verbose=True, handle_parsing_errors=True)

async def main():
    runtime = os.getenv("CORAL_ORCHESTRATION_RUNTIME", None)
    if runtime is None:
        load_dotenv()

    base_url = os.getenv("CORAL_SSE_URL")
    agentID = os.getenv("CORAL_AGENT_ID")

    coral_params = {
        "agentId": agentID,
        "agentDescription": "A specialized COPD environment monitoring agent that fetches weather and air quality data, evaluates environmental risk levels, and provides patient-friendly recommendations."
    }

    query_string = urllib.parse.urlencode(coral_params)

    CORAL_SERVER_URL = f"{base_url}?{query_string}"
    logger.info(f"Connecting to Coral Server: {CORAL_SERVER_URL}")
    
    timeout = int(os.getenv("TIMEOUT_MS", 300))

    client = MultiServerMCPClient(
        connections={
            "coral": {
                "transport": "sse",
                "url": CORAL_SERVER_URL,
                "timeout": timeout,
                "sse_read_timeout": timeout,
            }
        }
    )
    logger.info("Coral Server Connection Established")

    coral_tools = await client.get_tools(server_name="coral")
    logger.info(f"Coral tools count: {len(coral_tools)}")

    agent_tools = [
        Tool(
            name="environment_monitor",
            func=None,
            coroutine=environment_monitor_tool,
            description="Fetches weather and air quality data for a given location, assesses COPD-related environmental risks, and provides actionable recommendations.",
            args_schema={
                "properties": {
                    "location": {
                        "type": "string",
                        "description": "City name for retrieving environmental conditions"
                    }
                },
                "required": ["location"],
                "type": "object"
            }
        )
    ]
    
    agent_executor = await create_agent(coral_tools, agent_tools)

    while True:
        try:
            logger.info("Starting new agent invocation")
            await agent_executor.ainvoke({"agent_scratchpad": []})
            logger.info("Completed agent invocation, restarting loop")
            await asyncio.sleep(1)
        except Exception as e:
            logger.error(f"Error in agent loop: {str(e)}")
            logger.error(traceback.format_exc())
            await asyncio.sleep(5)

if __name__ == "__main__":
    asyncio.run(main())
