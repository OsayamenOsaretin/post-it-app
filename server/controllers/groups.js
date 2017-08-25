import resolveGroupRequest from '../controllerFunctions/resolveGroupRequest';
import createGroup from '../controllerFunctions/createGroup';
import getGroups from '../controllerFunctions/getGroups';
import addUserGroup from '../controllerFunctions/addUserGroup';
import getUsersNotInGroup from '../controllerFunctions/getUsersNotInGroup';

const groups = {
  resolveGroupRequest,
  createGroup,
  getGroups,
  addUserGroup,
  getUsersNotInGroup
};

export default groups;
