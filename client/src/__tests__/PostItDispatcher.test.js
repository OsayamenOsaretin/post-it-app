import PostItDispatcher from '../data/PostItDispatcher';

describe('PostItDispatcher', () => {
  it('should call handle view action', () => {
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

  it('should call handle server action', () => {
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
