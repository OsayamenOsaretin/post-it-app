import Dispatcher from '../../src/Dispatcher';
import ActionTypes from '../../src/ActionTypes';
import recieveRequestAction from '../../src/actions/receiveRequestAction';

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
