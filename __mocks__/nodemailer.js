/* global jest */

/**
 * transporter mock function
 * @returns {void}
 */
export const transporter = {
  /**
   * @returns {Function} mockFunction
   */
  sendMail() {
    return jest.fn();
  }
};

/**
 * nodemailer mock
 * @returns {void}
 */
const nodemailer = {
  createTransport() {
    return transporter;
  }
};


export default nodemailer;
