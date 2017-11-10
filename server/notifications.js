import notify from './utilities/notificationHelper';

/**
 * @export
 * @param {Object} req 
 * @param {Object} res 
 * @return {void}
 */
export default function sendNotifications(req, res) {
  console.log('reaches the controller');
  const { emails, numbers, priorityLevel } = req.body;
  notify(emails, numbers, priorityLevel);
  res.status(200).send('notifications sent!');
}
