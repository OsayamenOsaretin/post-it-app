
import getMessageAction from '../flux/actions/getMessagesAction';
import getUsersList from '../flux/actions/getAllUsersAction';

/**
 *@param {Map} groups
 *
 *@returns {void}
*/
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
