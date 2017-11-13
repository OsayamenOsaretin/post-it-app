// get the read status for a message

/**
 *@param {Object} message
 *@param {String} displayName
 *
 *@returns {Boolean} read status
 */
export default (message, displayName) => (
  message.read && message.read[displayName]
);
