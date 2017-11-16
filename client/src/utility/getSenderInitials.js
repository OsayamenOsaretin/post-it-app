// gets the initials of the message sender

/**
 *@param {String} sender
 *
 *@returns {String} initials
 */
export default (sender) => {
  if (sender) {
    const initials = sender.match(/\b\w/g) || [];
    return ((initials.shift() || '') + (initials.pop() || ''));
  }
  return '';
};
