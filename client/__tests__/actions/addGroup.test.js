import { mockAuth } from 'firebase';
import PostItActionTypes from '../../src/ActionTypes';
import PostItDispatcher from '../../src/Dispatcher';
import addGroup from '../../src/actions/addGroup';


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
    mockAuth.currentUser = {
      id: 'testUserId',
      provider: 'custom'
    };
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

