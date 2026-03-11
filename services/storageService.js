const fs = require('fs');
const path = require('path');

const POSTS_DIR = path.join(__dirname, '..', 'data', 'posts');

// Ensure the directory exists
if (!fs.existsSync(POSTS_DIR)) {
  fs.mkdirSync(POSTS_DIR, { recursive: true });
}

function saveGeneratedData(topic, post, titleCaptionData, imagePrompt) {
  const date = new Date();
  
  // Format YYYY-MM-DD in local or UTC (UTC is safer but requirements didn't specify, default to ISO split)
  const dateString = date.toISOString().split('T')[0];
  
  const payload = {
    date: date.toISOString(),
    topic: topic,
    title: titleCaptionData.title,
    post: post,
    caption: titleCaptionData.caption,
    hashtags: titleCaptionData.hashtags,
    image_prompt: imagePrompt
  };

  const filePath = path.join(POSTS_DIR, `${dateString}.json`);
  
  fs.writeFileSync(filePath, JSON.stringify(payload, null, 2), 'utf8');
  console.log(`Successfully saved generated content to: ${filePath}`);
  
  return payload;
}

module.exports = { saveGeneratedData };
