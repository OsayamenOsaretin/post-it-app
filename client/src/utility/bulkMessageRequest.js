// request for messages from all groups on app load
import getMessageAction from '../data/postItActions/getMessagesAction';

export default (groups) => {
  console.log('call bulk request message action');
  // groups.keySeq().toArray().map(groupKey => (
  //   getMessageAction({
  //     groupId: groupKey
  //   })
  // ));
  Object.keys(groups).map(groupKey => (
    getMessageAction({
      groupId: groupKey
    })
  ));
};
