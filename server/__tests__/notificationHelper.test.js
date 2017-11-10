import { transporter } from 'nodemailer';
import { message } from 'nexmo';
import notificationHelper from '../utilities/notificationHelper';


describe('NotificationHelper', () => {
  let emails, numbers;
  beforeEach(() => {
    emails = ['firstemail@email.com', 'secondemail@email.componentDidMount'];
    numbers = ['2348128186810'];
  });

  it('should not send anything for the default case', () => {
    const transporterSpy = spyOn(transporter, 'sendMail');
    const nexmoSpy = spyOn(message, 'sendSms');

    notificationHelper(emails, numbers, 'normal');
    expect(transporterSpy).not.toHaveBeenCalled();
    expect(nexmoSpy).not.toHaveBeenCalled();
  });
  it('should call email function only for urgent messages', () => {
    const transporterSpy = spyOn(transporter, 'sendMail');
    notificationHelper(emails, numbers, 'urgent');
    expect(transporterSpy).toHaveBeenCalled();
  });

  it('should call email and sms function for critical messages', () => {
    const transporterSpy = spyOn(transporter, 'sendMail');
    const nexmoSpy = spyOn(message, 'sendSms');

    notificationHelper(emails, numbers, 'critical');
    expect(transporterSpy).toHaveBeenCalled();
    expect(nexmoSpy).toHaveBeenCalled();
  });
});
