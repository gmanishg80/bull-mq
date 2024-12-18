const {Queue} = require('bullmq');

const notificationQueue = new Queue("email-queue",{
    connection:{
        host:"127.0.0.1",
        port:6379
    }
});

async function addJobToQueue() {
    const res = await notificationQueue.add("email to manish",{
        email:"manish@gmail.com",
        subject:"hello",
        message:"hello manish",
        body:"hello manish"
    },{delay:5 ,units:"seconds"},);
    // },);

    console.log("job added to queue",res.id);
}

addJobToQueue();







