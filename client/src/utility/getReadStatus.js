// get the read status for a message

export default (message, displayName) => {
  if (message.read) {
    if (message.read[displayName]) {
      return true;
    }
    // Object.keys(message.read).forEach((key) => {
    //   console.log(key);
    // });
  } else {
    return false;
  }
};
