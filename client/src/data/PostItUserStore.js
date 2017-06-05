import Immutable from 'immutable';
import { ReduceStore } from 'flux/utils';

import PostItActionTypes from './PostItActionTypes';
import PostItActions from './PostItActions';

import PostItDispatcher from './PostItDispatcher';

class PostItUserStore extends ReduceStore {
  constructor(){
    super(PostItDispatcher);
  }

  getInitialState(){

  }

  reduce(state, action){
    switch(action.type){
      case PostItActionTypes.LOGIN_USER:
        return state;
      
      case PostItActionTypes.REGISTER_USER:
        return state;

      case PostItActionTypes.SIGN_OUT: 
        return state;

      default:
        return state;
    }
  }


}