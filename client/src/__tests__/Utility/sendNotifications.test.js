import sendNotifications from '../../utility/sendNotifications';
import Dispatcher from '../../flux/Dispatcher';
import ActionTypes from '../../flux/ActionTypes';


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
