// get the read status for a message

export default (message, displayName) => {
  return message.read && message.read[displayName];
};
