import PostItDispatcher from '../src/Dispatcher';

describe('PostItDispatcher', () => {
  it('should call handleview action, when handle view action is calld', () => {
    const spyOnDispatcher = spyOn(PostItDispatcher, 'dispatch');
    PostItDispatcher.handleViewAction({
      type: 'FakeTestAction'
    });
    expect(spyOnDispatcher).toHaveBeenCalledWith({
      source: 'VIEW_ACTION',
      action: {
        type: 'FakeTestAction'
      }
    });
  });

  it('should call handle server action, for handle server action', () => {
    const spyOnDispatcher = spyOn(PostItDispatcher, 'dispatch');
    PostItDispatcher.handleServerAction({
      type: 'FakeTestAction'
    });
    expect(spyOnDispatcher).toHaveBeenCalledWith({
      source: 'SERVER_ACTION',
      action: {
        type: 'FakeTestAction'
      }
    });
  });
});
