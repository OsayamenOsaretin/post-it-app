import PostItDispatcher from '../../src/Dispatcher';
import PostItActionTypes from '../../src/ActionTypes';
import receiveGroup from '../../src/actions/receivGroups';


describe('ReceiveGroup', () => {
  let dispatcherSpy;
  let response;
  beforeEach(() => {
    dispatcherSpy = spyOn(PostItDispatcher, 'handleServerAction');
    response = new Map();
    response.set('groupKey', []);
  });
  it('should dispatch action with right arguments when called', () => {
    receiveGroup(response);
    expect(dispatcherSpy).toHaveBeenCalledWith({
      type: PostItActionTypes.RECIEVE_GROUP_RESPONSE,
      userGroups: response
    });
  });
});
