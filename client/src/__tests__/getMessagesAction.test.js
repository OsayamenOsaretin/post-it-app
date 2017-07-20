import GetMessagesAction from 'GetMessagesAction';
// import PostItActionTypes from '../data/PostItActionTypes';

/* global jest */

jest.mock('superagent');
jest.mock('GetMessagesAction', () => jest.fn());
jest.mock('../data/PostItDispatcher');

describe('getMessagesAction', () => {
  // let PostItDispatcher;

  const groupId = {
    groupId: 'testId'
  };

  beforeEach(() => {
    // PostItDispatcher = require('../data/PostItDispatcher');
  });

  it('should call get message function with the right arguments', () => {
    // const getMessagesSpy = spyOn('GetMessagesAction');
    GetMessagesAction(groupId);
    expect(GetMessagesAction).toHaveBeenLastCalledWith(groupId);
  });
});
