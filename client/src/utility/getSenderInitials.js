// gets the initials of the message sender
export default (sender) => {
  let initials = '';
  if (sender) {
    const names = sender.split(' ');

    names.forEach((name) => {
      initials += name.charAt(0);
    });
  }

  return initials;
};
