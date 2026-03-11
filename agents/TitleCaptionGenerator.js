const { generateContent } = require('../services/aiService');

async function generateTitleAndCaption(postContent) {
  console.log('Generating Title, Caption, and Hashtags...');
  
  const PROMPT = `From the generated post create:
1 Title
1 Caption
5 Relevant Hashtags

Generated Post:
${postContent}

Rules:
* Title should be punchy
* Caption should be concise
* Hashtags must be relevant to tech/AI/startups

Return in JSON format exactly like this, no markdown formatting outside the JSON:
{
  "title": "Your Punchy Title",
  "caption": "Your concise caption.",
  "hashtags": ["#AI", "#Startup", "#Tech", "#Growth", "#Innovation"]
}`;

  const result = await generateContent(PROMPT, true);
  
  try {
    // Sometimes the model wraps JSON in markdown blocks even with JSON mode
    const sanitizeStr = result.replace(/^```json/, '').replace(/```$/, '').trim();
    return JSON.parse(sanitizeStr);
  } catch (err) {
    console.error('Error parsing JSON from TitleCaptionGenerator:', err);
    console.error('Raw result:', result);
    throw new Error('Failed to generate valid JSON for Title/Caption.');
  }
}

module.exports = { generateTitleAndCaption };
