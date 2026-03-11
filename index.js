const { generateTopic } = require('./agents/TopicGenerator');
const { generatePost } = require('./agents/PostGenerator');
const { generateTitleAndCaption } = require('./agents/TitleCaptionGenerator');
const { generateImagePrompt } = require('./agents/ImagePromptGenerator');
const { saveGeneratedData } = require('./services/storageService');
const { sendNotificationEmail } = require('./services/emailService');

async function runDailyContentAgent() {
  console.log('--- Starting Daily Content AI Agent ---');
  try {
    // 1. Generate Topic
    const topic = await generateTopic();
    console.log(`[x] Generated Topic: ${topic}`);

    // 2. Generate Post
    const post = await generatePost(topic);
    console.log(`[x] Generated Post (${post.length} characters)`);

    // 3. Generate Title, Caption, Hashtags
    const titleCaptionData = await generateTitleAndCaption(post);
    console.log(`[x] Generated Title: ${titleCaptionData.title}`);

    // 4. Generate Image Prompt
    const imagePrompt = await generateImagePrompt(post);
    console.log(`[x] Generated Image Prompt`);

    // 5. Save Data
    const savedData = saveGeneratedData(topic, post, titleCaptionData, imagePrompt);
    console.log(`[x] Data saved to storage.`);

    // 6. Send Email Notification
    await sendNotificationEmail(savedData);
    console.log(`[x] Email notification sent (if configured).`);

    console.log('--- Daily Content AI Agent Finished Successfully ---');
  } catch (error) {
    console.error('--- Daily Content AI Agent Failed ---');
    console.error(error);
  }
}

module.exports = {
  runDailyContentAgent
};
