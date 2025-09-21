import aiohttp
import asyncio
from typing import Dict, Tuple, Optional


class EnvironmentMonitor:
    """
    A comprehensive environment monitor that retrieves weather and air quality data
    for a given city using OpenWeatherMap API. It also provides environmental alerts
    and recommendations based on the collected data.
    """

    def __init__(self, api_key: str):
        self.api_key = api_key
        self.geo_url = "http://api.openweathermap.org/geo/1.0/direct"
        self.weather_url = "https://api.openweathermap.org/data/2.5/weather"
        self.air_quality_url = "http://api.openweathermap.org/data/2.5/air_pollution"

    async def _fetch_api(self, url: str, params: Dict) -> Optional[Dict]:
        """Helper to send async GET requests and handle responses."""
        try:
            async with aiohttp.ClientSession() as session:
                async with session.get(url, params=params, timeout=10) as response:
                    response.raise_for_status()
                    return await response.json()
        except Exception as e:
            print(f"API request failed: {e}")
            return None

    async def _get_coordinates(self, city: str) -> Optional[Tuple[float, float]]:
        """Get latitude and longitude for a given city name."""
        params = {"q": city, "appid": self.api_key}
        data = await self._fetch_api(self.geo_url, params)
        if data and len(data) > 0:
            return data[0]["lat"], data[0]["lon"]
        return None

    async def _get_weather(self, lat: float, lon: float) -> Optional[Dict]:
        """Fetch weather data using latitude and longitude."""
        params = {"lat": lat, "lon": lon, "appid": self.api_key, "units": "metric"}
        return await self._fetch_api(self.weather_url, params)

    async def _get_air_quality(self, lat: float, lon: float) -> Optional[Dict]:
        """Fetch air quality index and pollutants."""
        params = {"lat": lat, "lon": lon, "appid": self.api_key}
        return await self._fetch_api(self.air_quality_url, params)

    def _interpret_environmental_risk(self, weather: Dict, air_quality: Dict) -> str:
        """Interpret environmental conditions and provide alerts + recommendations."""

        alerts = []

        # Weather risk analysis
        temp = weather["main"]["temp"]
        humidity = weather["main"]["humidity"]
        description = weather["weather"][0]["description"]

        if temp > 35:
            alerts.append("⚠️ High temperature: Risk of heat stress. Stay hydrated.")
        elif temp < 5:
            alerts.append("❄️ Low temperature: Risk of cold-related illness. Wear warm clothes.")

        if humidity > 80:
            alerts.append("💧 High humidity: May cause discomfort and breathing difficulty.")
        elif humidity < 30:
            alerts.append("🌵 Low humidity: Risk of dry skin and dehydration.")

        alerts.append(f"🌦 Current weather: {description.capitalize()}, {temp}°C, Humidity {humidity}%.")

        # Air Quality risk analysis
        aqi = air_quality["list"][0]["main"]["aqi"]
        pollutants = air_quality["list"][0]["components"]

        aqi_levels = {
            1: "Good",
            2: "Fair",
            3: "Moderate",
            4: "Poor",
            5: "Very Poor"
        }
        alerts.append(f"🌍 Air Quality Index: {aqi} ({aqi_levels.get(aqi, 'Unknown')}).")

        if aqi >= 4:
            alerts.append("🚫 Air pollution is high. Avoid outdoor activities and wear a mask.")
        elif aqi == 3:
            alerts.append("😷 Moderate pollution: Sensitive groups should limit outdoor exposure.")

        # Recommendation summary
        recommendations = " | ".join(alerts)
        return recommendations

    async def get_environment_report(self, city: str) -> str:
        """
        Main async method to generate an environment report for a city.
        Returns alerts and recommendations.
        """
        coords = await self._get_coordinates(city)
        if not coords:
            return f"❌ Could not find coordinates for city: {city}"

        lat, lon = coords
        weather = await self._get_weather(lat, lon)
        air_quality = await self._get_air_quality(lat, lon)

        if not weather or not air_quality:
            return f"❌ Failed to retrieve environment data for {city}"

        report = self._interpret_environmental_risk(weather, air_quality)
        return f"📍 City: {city}\n{report}"

