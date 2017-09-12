import GetMessagesAction from 'GetMessagesAction';
import Immutable from 'immutable';
import bulkMessageRequest from '../utility/bulkMessageRequest';

/* global jest */
jest.mock('GetMessagesAction', () => jest.fn());

describe('bulkMessageRequestUtility', () => {
  const firstGroup = new Map();
  firstGroup.set('firstKey', 'firstGroup');
  const groups = new Immutable.Map(firstGroup);

  it('should dispatch to get message action', () => {
    bulkMessageRequest(groups);
    expect(GetMessagesAction.mock.calls.length).toBeGreaterThan(0);
  });
});
