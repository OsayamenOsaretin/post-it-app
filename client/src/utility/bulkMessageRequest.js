
import getMessageAction from '../data/postItActions/getMessagesAction';
import getUsersList from '../data/postItActions/getAllUsersAction';

export default (groups) => {
  groups.forEach((value, key) => {
    getMessageAction({
      groupId: key
    });
    getUsersList({
      groupId: key
    });
  });
};
