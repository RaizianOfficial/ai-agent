const { generateContent } = require('../services/aiService');

async function generateImagePrompt(postContent) {
  console.log('Generating Image Prompt...');
  
  const PROMPT = `Create a detailed prompt for generating an illustration related to the post.

Generated Post:
${postContent}

Style requirements:
* futuristic
* minimal
* startup aesthetic
* modern tech visuals
* suitable for AI image generators

Return a single descriptive prompt.`;

  const result = await generateContent(PROMPT);
  return result.trim();
}

module.exports = { generateImagePrompt };
