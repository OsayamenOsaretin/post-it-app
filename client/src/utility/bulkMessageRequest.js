// request for messages from all groups on app load
import getMessageAction from '../data/postItActions/getMessagesAction';

export default (groups) => {
  Object.values(groups).map(group => (
    getMessageAction({
      groupId: group[0]
    })
  ));
};
