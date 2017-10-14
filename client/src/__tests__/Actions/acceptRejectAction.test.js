import { mockAuth, mockDatabase } from 'firebase';
import Dispatcher from '../../flux/Dispatcher';
import ActionTypes from '../../flux/ActionTypes';
import acceptRejectAction from
  '../../flux/actions/acceptRejectGroupRequestAction';

/* global  jest */

jest.mock('../../flux/Dispatcher');

const details = {
  groupId: 'testGroupId',
  status: 'true'
};

describe('acceptRejectAction', () => {
  it('should not call dispatch action when not authenticated', () => {
    const dispatcherSpy = spyOn(Dispatcher, 'handleServerAction');
    mockAuth.changeAuthState(undefined);
    mockAuth.autoFlush();
    acceptRejectAction(details);
    expect(dispatcherSpy).not.toHaveBeenCalled();
  });

  it('should dispatch delete request payload when authenticated', () => {
    const dispatcherSpy = spyOn(Dispatcher, 'handleServerAction');
    mockAuth.changeAuthState({
      uid: 'testUid',
      token: 'authToken',
      provider: 'custom'
    });
    mockAuth.autoFlush();
    mockDatabase.autoFlush();
    acceptRejectAction(details);
    expect(dispatcherSpy).toHaveBeenCalledWith({
      type: ActionTypes.DELETE_REQUEST,
      id: expect.anything()
    });
  });
});
