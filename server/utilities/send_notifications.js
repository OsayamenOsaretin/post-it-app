import nodemailer from 'nodemailer';
import Nexmo from 'nexmo';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: 'postitbyyamen@gmail.com',
    pass: '123postit890'
  }
});

const emailOptions = {
  subject: 'New Message from Post-It',
  text: 'You have an important message on Post-It, check it out',
  from: 'postitbyyamen@gmail.com'
};
// send notification based on priority level

module.exports = (emails, numbers, priorityLevel) => {
  switch (priorityLevel) {
  case 'urgent': {
    emails.forEach((email) => {
      emailOptions.to = email;
      transporter.sendMail(emailOptions, (error, info) => {
        if (error) {
          return console.log(error);
        }
        console.log(info.response);
      });
    });
    break;
  }
  case 'critical': {
    const nexmo = new Nexmo({
      apiKey: '0fd3e87e',
      apiSecret: '8d3bd3eddbbb5d37',
    },
    { debug: true });

    // send sms messages
    numbers.forEach(() => {
      nexmo.message.sendSms(
        'Post-It', '2348128186810', 'You have a critical message on Post-It, login to check now!',
        { type: 'unicode' },
        (err, responseData) => {
          if (err) {
            console.log(err);
          } else {
            console.dir(responseData);
            // Optional: add socket.io -- will explain later
          }
        }
      );
    });

    // send email also, because critical
    emails.forEach((email) => {
      emailOptions.to = email;
      transporter.sendMail(emailOptions, (error, info) => {
        if (error) {
          return console.log(error);
        }
        console.log(info.response);
      });
    });
    break;
  }
  default: {
    return true;
  }
  }
};
