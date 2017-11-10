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

/**
 * @param {Array} emails
 * @param {Array} numbers
 * @param {String} priorityLevel
 * 
 * @return {void}
 */
export default (emails, numbers, priorityLevel) => {
  console.log('gets here in production');
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
    numbers.forEach(() => {
      nexmo.message.sendSms(
        'Post-It', 2348128186810,
        'You have a critical message on Post-It, login to check now!',
        { type: 'unicode' },
        (error, responseData) => {
          if (error) return console.log(error);
          return console.log(responseData);
        }
      );
    });

    // send email also, because critical
    emails.forEach((email) => {
      emailOptions.to = email;
      transporter.sendMail(emailOptions, (error, info) => {
        if (error) return console.log(error);
        return console.log(info.response);
      });
    });
    break;
  }
  default: {
    return true;
  }
  }
};
