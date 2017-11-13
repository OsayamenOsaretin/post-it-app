import { transporter } from 'nodemailer';
import { message } from 'nexmo';
import notificationHelper from '../utilities/notificationHelper';


describe('NotificationHelper', () => {
  let emails, numbers;
  let nexmoSpy;
  let transporterSpy;
  beforeEach(() => {
    emails = ['firstemail@email.com', 'secondemail@email.componentDidMount'];
    numbers = ['2348128186810'];
    transporterSpy = spyOn(transporter, 'sendMail');
    nexmoSpy = spyOn(message, 'sendSms');
  });

  it('should not send anything for the default case', () => {
    notificationHelper(emails, numbers, 'normal');
    expect(transporterSpy).not.toHaveBeenCalled();
    expect(nexmoSpy).not.toHaveBeenCalled();
  });

  it('should call email function only, for urgent messages', () => {
    notificationHelper(emails, numbers, 'urgent');
    expect(nexmoSpy).not.toHaveBeenCalled();
    expect(transporterSpy).toHaveBeenCalled();
  });

  it('should call email and sms function for critical messages', () => {
    notificationHelper(emails, numbers, 'critical');
    expect(transporterSpy).toHaveBeenCalled();
    expect(nexmoSpy).toHaveBeenCalled();
  });
});
