import kue from 'kue';

// Create the blacklisted phone numbers array
const blacklistedNumbers = ['4153518780', '4153518781'];

// Create the sendNotification function
function sendNotification(phoneNumber, message, job, done) {
  // Track progress 0%
  job.progress(0);

  // Check if number is blacklisted
  if (blacklistedNumbers.includes(phoneNumber)) {
    return done(new Error(`Phone number ${phoneNumber} is blacklisted`));
  }

  // Track progress 50%
  job.progress(50);
  
  // Log notification
  console.log(`Sending notification to ${phoneNumber}, with message: ${message}`);
  
  // Complete the job
  done();
}

// Create a queue with Kue
const queue = kue.createQueue();

// Process jobs with concurrency of 2
queue.process('push_notification_code_2', 2, (job, done) => {
  const { phoneNumber, message } = job.data;
  sendNotification(phoneNumber, message, job, done);
});