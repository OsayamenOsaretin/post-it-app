import { mockAuth, mockDatabase } from 'firebase'; // eslint-disable-line
import sendMessageAction from '../../flux/actions/sendMessageAction';
import PostItActionTypes from '../../flux/ActionTypes';
import PostItDispatcher from '../../flux/Dispatcher';

/* global jest */

jest.mock('firebase');
jest.mock('../../flux/Dispatcher');
jest.mock('../../utility/getUsersEmailsNumbers.js', () => jest.fn());

describe('sendMessageAction', () => {
  const messageDetails = {
    groupId: 'testId',
    sender: 'testSender',
    priorityLevel: 'priority',
    message: 'test message'
  };

  it('should get messages after successfully sending messages', async () => {
    const spyOnDispatcher = spyOn(PostItDispatcher, 'handleServerAction');
    mockAuth.changeAuthState({
      uid: 'testUid',
      provider: 'custom',
      token: 'authToken',
    });
    mockAuth.autoFlush();
    mockDatabase.autoFlush();
    await sendMessageAction(messageDetails);
    expect(spyOnDispatcher).toHaveBeenCalledWith({
      type: PostItActionTypes.SENT_MESSAGE
    });
  });

  it('should dispatch error payload when send message is unsuccessful', () => {
    const spyOnDispatcher = spyOn(PostItDispatcher, 'handleServerAction');
    mockAuth.changeAuthState(undefined);
    sendMessageAction(messageDetails);
    expect(spyOnDispatcher).toHaveBeenCalledWith({
      type: PostItActionTypes.FAILED_SEND_MESSAGE
    });
  });
});
