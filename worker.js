const { Worker } = require('bullmq');

const sendEmailHelper = async (n) => new Promise((res) => setTimeout(() => res(), 5000));

const sendEmail = async (job) => {
    console.log(`Message received ID: ${job.id}`);
    console.log("Processing message...");
    console.log(`Sending email to ${job.data.email}`);
    await sendEmailHelper(5); 
}

const emailWorker = new Worker("email-queue", sendEmail, {
    connection: {
        host: "127.0.0.1",
        port: 6379
    }
});

emailWorker.on("completed", (job) => {
    console.log(`${job.id} job completed !!!`);
    console.log("Email sent successfully.");
});

emailWorker.on("failed", (job, err) => {
    console.log("Failed !!!");
    console.log(`${job.id} job failed with error: ${err.message}`);
});
