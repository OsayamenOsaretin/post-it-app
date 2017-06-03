import PostItActionTypes from './PostItActionTypes';
import PostItDispatcher from './PostItDispatcher';

const Actions = {
  registerUser(email, password, userName) {
    PostItDispatcher.dispatch({
      type: PostItActionTypes.REGISTER_USER, email, password, userName
    });
  },

  loginUser(email, password) {
    PostItDispatcher.dispatch({
      type: PostItActionTypes.LOGIN_USER, email, password
    });
  },

  addGroup(group) {
    PostItDispatcher.dispatch({
      type: PostItActionTypes.ADD_GROUP, group
    });
  },

  addUserGroup(userId, groupId) {
    PostItDispatcher.dispatch({
      type: PostItActionTypes.ADD_USER_GROUP, userId, groupId
    });
  },

  signOut() {
    PostItDispatcher.dispatch({
      type: PostItActionTypes.SIGN_OUT
    });
  }

};

export default Actions;
