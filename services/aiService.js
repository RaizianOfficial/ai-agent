const { GoogleGenAI } = require('@google/genai');
const config = require('../config');

// Initialize the Google Gen AI client
let ai;
try {
  if (config.GEMINI_API_KEY) {
    ai = new GoogleGenAI({ apiKey: config.GEMINI_API_KEY });
  } else {
    console.warn('GEMINI_API_KEY is not set. AI generate calls will fail.');
  }
} catch (error) {
  console.error('Failed to initialize GoogleGenAI client:', error);
}

/**
 * Helper to call Gemini model
 * @param {string} prompt 
 * @param {boolean} jsonMode 
 */
async function generateContent(prompt, jsonMode = false) {
  if (!ai) {
    throw new Error('AI client not initialized. Please set GEMINI_API_KEY in .env');
  }

  const generateConfig = {
    temperature: 0.7
  };

  if (jsonMode) {
    generateConfig.responseMimeType = 'application/json';
  }

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: prompt,
    config: generateConfig
  });
  
  return response.text;
}

module.exports = {
  generateContent
};
