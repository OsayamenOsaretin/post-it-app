import PostItDispatcher from '../../flux/Dispatcher';
import PostItActionTypes from '../../flux/ActionTypes';
import receiveGroup from '../../flux/actions/receivGroups';


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
