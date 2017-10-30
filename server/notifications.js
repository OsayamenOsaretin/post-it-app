import notify from './utilities/notificationHelper';

/**
 * @export
 * @param {any} req 
 * @param {any} res 
 * @return {void}
 */
export default function sendNotifications(req, res) {
  const { emails, numbers, priorityLevel } = req.body;
  notify(emails, numbers, priorityLevel);
  res.status(200).send('notifications sent!');
}
