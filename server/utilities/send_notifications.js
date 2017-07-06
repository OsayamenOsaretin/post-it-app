import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: 'superyamen@gmail.com',
    pass: ''
  }
});

const emailOptions = {
  subject: 'New Message from Post-It',
  text: 'You have an important message on Post-It, check it out',
  from: 'superyamen@gmail.com'
};
// send notification based on priority level and emails

module.exports = (emails, priorityLevel) => {
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
  default: {
    return true;
  }
  }
};
