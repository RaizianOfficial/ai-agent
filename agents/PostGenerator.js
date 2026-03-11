const { generateContent } = require('../services/aiService');

async function generatePost(topic) {
  console.log(`Generating Post for topic: "${topic}"...`);
  
  const PROMPT = `Write a high quality social media post.

Topic: ${topic}

Rules:
* 120 to 150 words
* Simple language
* Insightful tone
* Startup / innovation vibe
* No emojis
* No fluff`;

  const result = await generateContent(PROMPT);
  return result.trim();
}

module.exports = { generatePost };
