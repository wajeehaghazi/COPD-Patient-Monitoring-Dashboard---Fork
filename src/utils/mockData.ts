// Generate random data within ranges for demo purposes
export const generateVitals = () => {
  return {
    spo2: Math.floor(Math.random() * (99 - 88) + 88),
    heartRate: Math.floor(Math.random() * (100 - 60) + 60),
    respiratoryRate: Math.floor(Math.random() * (25 - 12) + 12),
    temperature: (Math.random() * (99.5 - 97.5) + 97.5).toFixed(1)
  };
};
export const generateRiskScore = () => {
  return Math.floor(Math.random() * 100);
};
export const generateAirQuality = () => {
  const aqiValue = Math.floor(Math.random() * (150 - 30) + 30);
  let status = 'Good';
  let color = 'text-green-500';
  if (aqiValue > 100) {
    status = 'Unhealthy';
    color = 'text-red-500';
  } else if (aqiValue > 50) {
    status = 'Moderate';
    color = 'text-yellow-500';
  }
  return {
    value: aqiValue,
    status,
    color
  };
};
export const generateWeather = () => {
  const conditions = ['Sunny', 'Partly Cloudy', 'Cloudy', 'Rainy', 'Windy'];
  const condition = conditions[Math.floor(Math.random() * conditions.length)];
  const temperature = Math.floor(Math.random() * (85 - 55) + 55);
  const humidity = Math.floor(Math.random() * (90 - 30) + 30);
  return {
    condition,
    temperature,
    humidity
  };
};
export const generateSymptomHistory = () => {
  const symptoms = [{
    date: '2023-06-01',
    type: 'Shortness of Breath',
    severity: 3
  }, {
    date: '2023-06-02',
    type: 'Coughing',
    severity: 2
  }, {
    date: '2023-06-03',
    type: 'Wheezing',
    severity: 4
  }, {
    date: '2023-06-04',
    type: 'Chest Tightness',
    severity: 3
  }, {
    date: '2023-06-05',
    type: 'Fatigue',
    severity: 2
  }];
  return symptoms;
};
export const generateTrendData = () => {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  return days.map(day => ({
    name: day,
    breathlessness: Math.floor(Math.random() * 5),
    coughing: Math.floor(Math.random() * 5),
    wheezing: Math.floor(Math.random() * 5)
  }));
};
export const generateRecommendations = () => {
  return [{
    id: 1,
    title: 'Inhaler Usage',
    content: 'Based on your symptoms, consider using your rescue inhaler. Follow your prescribed dosage.',
    icon: 'inhaler'
  }, {
    id: 2,
    title: 'Breathing Exercise',
    content: 'Try pursed-lip breathing for 5 minutes to help control your breathing pattern.',
    icon: 'breathing'
  }, {
    id: 3,
    title: 'Environmental Tip',
    content: 'Air quality is moderate today. Consider limiting outdoor activities or wearing a mask.',
    icon: 'environment'
  }];
};
export const generateAlerts = () => {
  return [{
    id: 1,
    title: 'Low Oxygen Saturation',
    content: 'Your SpO2 dropped below 90% for more than 10 minutes.',
    timestamp: '2023-06-05T14:32:00',
    severity: 'high'
  }, {
    id: 2,
    title: 'Increased Respiratory Rate',
    content: 'Your respiratory rate has been elevated for the past hour.',
    timestamp: '2023-06-05T13:15:00',
    severity: 'medium'
  }, {
    id: 3,
    title: 'Poor Air Quality Alert',
    content: 'Air quality in your area has deteriorated. Consider staying indoors.',
    timestamp: '2023-06-05T09:45:00',
    severity: 'medium'
  }];
};
export const generateMessages = () => {
  return [{
    id: 1,
    sender: 'user',
    content: "I'm feeling more short of breath today.",
    timestamp: '10:30 AM'
  }, {
    id: 2,
    sender: 'ai',
    content: "I'm sorry to hear that. Have you used your rescue inhaler as prescribed?",
    timestamp: '10:31 AM'
  }, {
    id: 3,
    sender: 'user',
    content: "Yes, but it's not helping as much as usual.",
    timestamp: '10:32 AM'
  }, {
    id: 4,
    sender: 'ai',
    content: "If your symptoms aren't improving with your rescue inhaler, this could be a sign of an exacerbation. I recommend contacting your healthcare provider. Would you like me to help you reach out to them?",
    timestamp: '10:33 AM'
  }];
};