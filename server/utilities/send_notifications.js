import nodemailer from 'nodemailer';
import Nexmo from 'nexmo';

require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: process.env.TRANSPORTER_SERVICE,
  host: process.env.TRASNPORTER_HOST,
  port: process.env.TRASPORTER_PORT,
  secure: process.env.TRANSPORTER_SECURE,
  auth: {
    user: process.env.AUTH_USER,
    pass: process.env.AUTH_PASSWORD
  }
});

const emailOptions = {
  subject: 'New Message from Post-It',
  text: 'You have an important message on Post-It, check it out',
  from: 'postitbyyamen@gmail.com'
};
// send notification based on priority level

export default (emails, numbers, priorityLevel) => {
  switch (priorityLevel) {
  case 'urgent': {
    emails.forEach((email) => {
      emailOptions.to = email;
      transporter.sendMail(emailOptions, (error, info) => {
        if (error) return error;
        return info.response;
      });
    });
    break;
  }
  case 'critical': {
    const nexmo = new Nexmo({
      apiKey: process.env.NEXMO_APIKEY,
      apiSecret: process.env.NEXMO_APISECRET,
    },
    { debug: true });

    // send sms messages
    numbers.forEach((number) => {
      nexmo.message.sendSms(
        'Post-It', number,
        'You have a critical message on Post-It, login to check now!',
        { type: 'unicode' },
        (err, responseData) => {
          if (err) return err;
          return responseData;
        }
      );
    });

    // send email also, because critical
    emails.forEach((email) => {
      emailOptions.to = email;
      transporter.sendMail(emailOptions, (error, info) => {
        if (error) return error;
        return info.response;
      });
    });
    break;
  }
  default: {
    return true;
  }
  }
};
