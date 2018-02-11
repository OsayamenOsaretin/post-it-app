import sendNotifications from '../../src/utility/sendNotifications';
import Dispatcher from '../../src/Dispatcher';
import ActionTypes from '../../src/ActionTypes';


/* global jest */

jest.mock('superagent');

describe('SendNotificationsFunction', () => {
  it('should send notification', () => {
    const dispatcherSpy = spyOn(Dispatcher, 'handleServerAction');
    sendNotifications([], [], 'normal');
    expect(dispatcherSpy).toHaveBeenCalledWith({
      type: ActionTypes.NOTIFICATIONS_SENT
    });
  });
  it('should dispatch failure payload when request fails', () => {
    const dispatcherSpy = spyOn(Dispatcher, 'handleServerAction');
    require('superagent').__setMockError({      // eslint-disable-line
      message: 'get all users field'
    });
    sendNotifications([], [], 'normal');
    expect(dispatcherSpy).toHaveBeenCalledWith({
      type: ActionTypes.FAILED_NOTIFICATIONS
    });
  });
});
