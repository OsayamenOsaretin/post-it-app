import notify from '../utilities/send_notifications';

/**
 * @export
 * @param {any} req 
 * @param {any} res 
 * @return {void}
 */
export default function sendNotifications(req, res) {
  const { emailList, phoneNumbers, priority } = req.body;

  notify(emailList, phoneNumbers, priority);
  res.status(200).send('notifications sent!');
}
