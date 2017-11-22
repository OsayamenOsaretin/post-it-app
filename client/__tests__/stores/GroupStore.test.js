import PostItActionTypes from '../../src/ActionTypes';
import groupList from '../../src/models/groupList';

/* global jest */

jest.mock('../../src/Dispatcher');

describe('PostItGroupStore', () => {
  const sampleGroup = new Map();
  sampleGroup.set('key', {});
  const recieveGroups = {
    action: {
      type: PostItActionTypes.RECIEVE_GROUP_RESPONSE,
      userGroups: sampleGroup
    }
  };

  const clearGroups = {
    action: {
      type: PostItActionTypes.CLEAR_GROUPS_STORE
    }
  };

  const noGroups = {
    action: {
      type: PostItActionTypes.NO_GROUPS
    }
  };

  let callback;
  let PostItDispatcher;
  let PostItGroupStore;

  beforeEach(() => {
    jest.resetModules();
    PostItGroupStore = require('../../src/stores/GroupStore').default;  // eslint-disable-line
    PostItDispatcher = require('../../src/Dispatcher').default;  // eslint-disable-line
    callback = PostItDispatcher.register.mock.calls[0][0];
  });

  it('should register a callback with the dispatcher', () => {
    expect(PostItDispatcher.register.mock.calls.length).toBe(1);
  });

  it('should initialize with an empty group map', () => {
    expect((PostItGroupStore.getGroups()).size).toBe(0);
  });

  it('should update group map after recieving dispatch', () => {
    callback(recieveGroups);
    const groupMap = PostItGroupStore.getGroups();
    const groupKeys = groupMap.keySeq().toArray();
    expect(groupKeys[0]).toEqual('key');
  });

  it('should clear groups on clear groups action', () => {
    callback(clearGroups);
    expect((PostItGroupStore.getGroups()).size).toBe(0);
  });

  it('should change loading state after receiving no groups payload', () => {
    expect(PostItGroupStore.getLoadingState()).toBe(true);
    callback(noGroups);
    expect(PostItGroupStore.getLoadingState()).toBe(false);
  });

  it('should attach event emitter when add change listener is called', () => {
    const spyOnAddEvent = spyOn(PostItGroupStore, 'on');
    const mockCallBack = jest.fn();
    PostItGroupStore.addChangeListener(mockCallBack);
    expect(spyOnAddEvent).toHaveBeenCalledWith('change', mockCallBack);
  });

  it('should remove event emitter when remove change lister is called', () => {
    const spyOnRemoveEvent = spyOn(PostItGroupStore, 'removeListener');
    const mockCallBack = jest.fn();
    PostItGroupStore.removeChangeListener(mockCallBack);
    expect(spyOnRemoveEvent).toHaveBeenCalledWith('change', mockCallBack);
  });
});
