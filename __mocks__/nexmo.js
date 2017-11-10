/* global jest */

export const message = {
  sendSms: jest.fn()
};

/**
 * mock for nexmo sms sender
*/
export default class nexmo {
  /**
    * constructor for nexmo class
    */
  constructor() {
    this.message = message;
  }
}
