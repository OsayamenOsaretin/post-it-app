import Dispatcher from '../../flux/Dispatcher';
import ActionTypes from '../../flux/ActionTypes';
import recieveRequestAction from '../../flux/actions/receiveRequestAction';

describe('RecieveRequestAction', () => {
  it('should dispatch payload with right arguments to request store', () => {
    const dispatcherSpy = spyOn(Dispatcher, 'handleServerAction');
    const someRequest = 'testRequest';
    recieveRequestAction(someRequest);
    expect(dispatcherSpy).toHaveBeenCalledWith({
      type: ActionTypes.RECEIVE_REQUESTS,
      requests: someRequest
    });
  });
});
