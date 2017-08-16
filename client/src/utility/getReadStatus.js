// get the read status for a message

export default (message, displayName) => {
  if (message.read) {
    if (message.read[displayName]) {
      return true;
    }
  } else {
    return false;
  }
};
