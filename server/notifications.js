import notify from './utilities/notificationHelper';

/**
 * @export
 * @param {Object} req 
 * @param {Object} res 
 * @return {void}
 */
export default function sendNotifications(req, res) {
  const { emails, numbers, priorityLevel } = req.body;
  notify(emails, numbers, priorityLevel);
  res.status(200).send({
    message: 'notification sent!'
  });
}
