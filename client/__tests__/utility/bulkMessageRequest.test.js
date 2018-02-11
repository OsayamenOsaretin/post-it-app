import GetMessagesAction from 'GetMessagesAction';   // eslint-disable-line
import Immutable from 'immutable';
import bulkMessageRequest from '../../src/utility/bulkMessageRequest';

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
