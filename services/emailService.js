const nodemailer = require('nodemailer');
const config = require('../config');

// Create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
  host: config.SMTP_HOST,
  port: config.SMTP_PORT,
  secure: config.SMTP_PORT === 465, // true for 465, false for other ports
  auth: {
    user: config.SMTP_USER,
    pass: config.SMTP_PASS,
  },
});

async function sendNotificationEmail(dataPayload) {
  if (!config.SMTP_USER || !config.SMTP_PASS || !config.TO_EMAIL) {
    console.warn('Email credentials or recipient missing. Skipping email notification.');
    return;
  }

  console.log('Sending email notification...');

  const htmlContent = `
    <h2>Daily AI Content Generated</h2>
    <p><strong>Date:</strong> ${new Date(dataPayload.date).toLocaleDateString()}</p>
    <hr/>
    <h3>Title</h3>
    <p>${dataPayload.title}</p>
    
    <h3>Topic</h3>
    <p>${dataPayload.topic}</p>
    
    <h3>Post</h3>
    <p>${dataPayload.post.replace(/\\n/g, '<br/>')}</p>
    
    <h3>Caption</h3>
    <p>${dataPayload.caption}</p>
    
    <h3>Hashtags</h3>
    <p>${dataPayload.hashtags.join(' ')}</p>
    
    <h3>Image Prompt</h3>
    <p>${dataPayload.image_prompt}</p>
  `;

  try {
    const info = await transporter.sendMail({
      from: '"AI Agent" <' + config.SMTP_USER + '>',
      to: config.TO_EMAIL,
      subject: 'Daily AI Content Generated',
      html: htmlContent,
    });
    console.log('Message sent: %s', info.messageId);
  } catch (error) {
    console.error('Error sending email notification:', error);
  }
}

module.exports = { sendNotificationEmail };
