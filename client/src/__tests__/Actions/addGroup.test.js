import { mockAuth } from 'firebase';
import PostItActionTypes from '../../flux/ActionTypes';
import PostItDispatcher from '../../flux/Dispatcher';
import addGroup from '../../flux/actions/addGroup';


describe('AddGroupAction', () => {
  let newGroup;
  let dispatcherSpy;

  beforeEach(() => {
    newGroup = {
      groupName: 'test group name'
    };
    dispatcherSpy = spyOn(PostItDispatcher, 'handleServerAction');
  });

  it('should dispatch to stores with right arguments on add group', () => {
    mockAuth.changeAuthState({
      uid: 'testUserId',
      provider: 'custom',
      token: 'authToken'
    });
    mockAuth.autoFlush();
    addGroup(newGroup);
    expect(dispatcherSpy).toHaveBeenCalledWith({
      type: PostItActionTypes.ADD_GROUP,
      groupName: 'test group name'
    });
  });

  it('should dispatch error payload when no user is found', () => {
    mockAuth.changeAuthState(undefined);
    mockAuth.autoFlush();
    addGroup(newGroup);
    expect(dispatcherSpy).toHaveBeenCalledWith({
      type: PostItActionTypes.FAILED_ADD_GROUP
    });
  });
});

