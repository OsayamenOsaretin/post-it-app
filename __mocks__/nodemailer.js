/* global jest */

export const transporter = {
  sendMail() {
    return jest.fn();
  }
};

const nodemailer = {
  createTransport() {
    return transporter;
  }
};


export default nodemailer;
