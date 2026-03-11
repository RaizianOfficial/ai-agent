const { generateContent } = require('../services/aiService');

const PROMPT = `Generate one engaging topic related to: 
AI, startups, technology, digital growth or automation.

Rules:
* Topic must be short
* Topic must be unique
* Avoid repeating previous topics

Return only the topic.`;

async function generateTopic() {
  console.log('Generating Topic...');
  const result = await generateContent(PROMPT);
  return result.trim();
}

module.exports = { generateTopic };
