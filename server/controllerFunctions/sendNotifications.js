import notify from '../utilities/send_notifications';

/**
 * @export
 * @param {any} req 
 * @param {any} res 
 * @return {void}
 */
export default function sendNotifications(req, res) {
  const emails = req.body.emailList;
  const phones = req.body.phoneNumbers;
  const priority = req.body.priority;

  notify(emails, phones, priority);
  res.status(200).send('notifications sent!');
}
