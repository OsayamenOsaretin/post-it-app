// gets the initials of the message sender
export default (sender) => {
  if (sender) {
    const initials = sender.match(/\b\w/g) || [];
    return ((initials.shift() || '') + (initials.pop() || ''));
  }
  return '';
};
