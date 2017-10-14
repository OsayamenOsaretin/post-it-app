import { mockAuth, mockDatabase } from 'firebase';
import PostItActionTypes from '../../flux/ActionTypes';
import googleSignInAction from '../../flux/actions/googleSignInAction';
import Dispatcher from '../../flux/Dispatcher';
/* global jest */

jest.mock('../../flux/Dispatcher');
jest.mock('firebase');

describe('googleSignInAction', () => {
  beforeEach(() => {
    mockAuth.autoFlush();
    mockDatabase.autoFlush();
    expect.assertions(1);
  });
  it('should dispatch payload to error store on failed database update', () => {
    const dispatcherSpy = spyOn(Dispatcher, 'handleServerAction');
    return googleSignInAction()
      .then(() => {
        expect(dispatcherSpy).toHaveBeenCalledWith({
          type: PostItActionTypes.FAILED_GOOGLE_LOGIN
        });
      });
  });

  it('should dispatch error payload when sign in fails', () => {
    const dispatcherSpy = spyOn(Dispatcher, 'handleServerAction');
    return googleSignInAction()
      .then(() => {
        expect(dispatcherSpy).toHaveBeenCalledWith({
          type: PostItActionTypes.FAILED_GOOGLE_LOGIN
        });
      });
  });
});
