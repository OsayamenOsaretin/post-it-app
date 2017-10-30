
import getMessageAction from '../flux/actions/getMessagesAction';
import getUsersList from '../flux/actions/getAllUsersAction';

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
