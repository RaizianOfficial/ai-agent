const cron = require('node-cron');
const { runDailyContentAgent } = require('../index');

function startScheduler() {
  console.log('Starting Scheduler. Cron expression: "0 17 * * *", Timezone: Asia/Kolkata');
  
  // Schedule task to run every day at 5:00 PM Asia/Kolkata
  cron.schedule('0 10 * * *', async () => {
    console.log('CRON TRIGGERED: Running daily content agent...');
    await runDailyContentAgent();
  }, {
    scheduled: true,
    timezone: 'Asia/Kolkata'
  });
}

// Ensure the process stays alive or can just be imported and run
if (require.main === module) {
  startScheduler();
}

module.exports = { startScheduler };
