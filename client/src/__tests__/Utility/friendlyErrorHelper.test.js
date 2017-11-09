import friendlyErrorHelper from '../../utility/friendlyErrorHelper';

describe('FriendlyErrorHelper', () => {
  it('should return friendly error for network fails', () => {
    const error = {
      code: 'auth/network-request-failed'
    };
    const errorMessage = friendlyErrorHelper(error);
    expect(errorMessage).toEqual('Please check your internet and try again');
  });

  it('should return friendly error for emails already in use', () => {
    const error = {
      code: 'auth/email-already-in-use'
    };
    const errorMessage = friendlyErrorHelper(error);
    expect(errorMessage)
      .toEqual('Email already in use, please choose another email address');
  });

  it('should return friendly error message for default case', () => {
    const error = {
      code: 'the default case'
    };
    const errorMessage = friendlyErrorHelper(error);
    expect(errorMessage).toEqual('Something went wrong, please try again');
  });


  it('should return friendly error message for wrong password', () => {
    const error = {
      code: 'auth/wrong-password'
    };
    const errorMessage = friendlyErrorHelper(error);
    expect(errorMessage)
      .toEqual('Email or Password is incorrect, please try again');
  });


  it('should return friendly error message for wrong password', () => {
    const error = {
      code: 'auth/user-not-found'
    };
    const errorMessage = friendlyErrorHelper(error);
    expect(errorMessage)
      .toEqual('Email or Password is incorrect, please try again');
  });
});
