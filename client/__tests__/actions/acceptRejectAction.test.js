import { mockAuth, mockDatabase } from 'firebase';
import Dispatcher from '../../src/Dispatcher';
import ActionTypes from '../../src/ActionTypes';
import acceptRejectAction from
  '../../src/actions/acceptRejectGroupRequestAction';

/* global  jest */

jest.mock('../../src/Dispatcher');

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
