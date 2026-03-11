# Daily Content AI Agent

## Architecture Explanation

The Daily Content AI Agent is a modular, event-driven Node.js application built to fully automate the process of social media content creation. 
At the core of the system sits a **Scheduler** that utilizes `node-cron` to trigger the processing pipeline daily at 5:00 PM (Asia/Kolkata timezone).

Once triggered, the orchestration lifecycle flows continuously via `index.js`, which acts as the **Main Controller**. The Main Controller triggers multiple asynchronous agent functions in sequence:
1. **Topic Generator Agent:** Interacts with the AI model (`services/aiService.js`) to procure a fresh topic related to AI, tech, startups, etc.
2. **Post Generator Agent:** Given the topic, writes a highly insightful, minimal social post using standard prompting rules.
3. **Title & Caption Agent:** Consumes the generated post to extract an optimized title, succinct caption, and a set of 5 corresponding hashtags.
4. **Image Prompt Agent:** Analyzes the post to envision a visual aesthetic (minimalist, modern tech) and forms an image generation prompt.

The results flow to the **Storage Layer** (`services/storageService.js`) which dumps the artifact into an immutable JSON artifact locally at `/data/posts/YYYY-MM-DD.json`. Finally, an **Email Service** built on `nodemailer` wraps the entire payload and emails the administrator a notification containing the structured content.

---

## Folder Structure

\`\`\`
/AI Agent
├── /agents                 # AI content generation modules
│   ├── ImagePromptGenerator.js
│   ├── PostGenerator.js
│   ├── TitleCaptionGenerator.js
│   └── TopicGenerator.js
├── /config                 # Configuration abstraction
│   └── index.js
├── /data
│   └── /posts              # Extracted JSON output payloads 
├── /scheduler              # Cron scheduler setup
│   └── cronJob.js
├── /services               # Core underlying logic
│   ├── aiService.js        # @google/genai abstracted API module
│   ├── emailService.js     # Nodemailer SMTP wrapping 
│   └── storageService.js   # Local filesystem interaction
├── .env                    # Secrets and SMTP definitions
├── AGENT_CHECKLIST.md      # Progress and integration tracker
├── index.js                # Main system controller
├── package.json            # Node abstractions and dependency tracking
└── README.md               # Architecture and documentation (this file)
\`\`\`

---

## Code Modules

- **`index.js`**: `runDailyContentAgent()` – Ties everything together, logging progress and maintaining module order.
- **`agents/TopicGenerator.js`**: Defines the topic prompt logic and rules.
- **`agents/PostGenerator.js`**: Translates the chosen topic into a professional write-up.
- **`agents/TitleCaptionGenerator.js`**: Defines a prompt extracting JSON-encoded schema (`{ title, caption, hashtags }`) from posts.
- **`agents/ImagePromptGenerator.js`**: Crafts a targeted midjourney or standard generation prompt focusing on "futuristic aesthetic".
- **`scheduler/cronJob.js`**: Initializes `0 17 * * *` rule on `Asia/Kolkata` tz using `node-cron`.
- **`services/aiService.js`**: Integrates `@google/genai` making pure inferences (`generateContent` fn).
- **`services/storageService.js`**: Appends generation output as stringified JSON under standard timestamp nomenclature.
- **`services/emailService.js`**: Ships an active payload via SMTP mapping from standard user config.

---

## Prompts Used by the Agent

**Topic Prompt:**
> Generate one engaging topic related to: AI, startups, technology, digital growth or automation.
> Rules: Topic must be short, must be unique, Avoid repeating previous topics. Return only the topic.

**Post Prompt:**
> Write a high quality social media post. Topic: {{topic}}
> Rules: 120 to 150 words, Simple language, Insightful tone, Startup / innovation vibe, No emojis, No fluff

**Title/Caption/Hashtags Prompt:**
> From the generated post create: 1 Title, 1 Caption, 5 Relevant Hashtags
> Rules: Title should be punchy, Caption should be concise, Hashtags must be relevant to tech/AI/startups... Return in JSON format.

**Image Prompt Prompt:**
> Create a detailed prompt for generating an illustration related to the post.
> Style requirements: futuristic, minimal, startup aesthetic, modern tech visuals, suitable for AI image generators. Return a single descriptive prompt.

---

## Example Generated Output

\`\`\`json
{
  "date": "2026-03-11T11:30:00.000Z",
  "topic": "The Future of Autonomous AI Agents in Startups",
  "title": "Autonomous Systems: The Silent Co-Founders",
  "post": "In the modern startup ecosystem, relying purely on manual process optimization is obsolete. The real leverage lies in autonomous AI agents. These systems no longer merely suggest actions; they execute them. By integrating transparent loops for complex orchestration scenarios, startups can outpace larger competitors through raw operational agility. The true shift isn't about replacing human creativity, but building digital infrastructures where code handles the friction, allowing teams to innovate rather than maintain.",
  "caption": "Efficiency is no longer a metric; it's an architecture. Let AI handle the execution.",
  "hashtags": [
    "#AI",
    "#Startups",
    "#Automation",
    "#Tech",
    "#FutureOfWork"
  ],
  "image_prompt": "A minimalist and futuristic digital illustration showing a glowing network of transparent data nodes managing a modern startup operations board, sleek deep blue and silver color palette."
}
\`\`\`
