// request for messages from all groups on app load
import getMessageAction from '../data/postItActions/getMessagesAction';

export default (groups) => {
  console.log('call bulk request message action');
  Object.values(groups).map(group => (
    getMessageAction({
      groupId: group[0]
    })
  ));
  // Object.values(groups).map((group) => {
  //   console.log(group[0]);
  //   // console.log(value);
  //   return true;
  // });
};
