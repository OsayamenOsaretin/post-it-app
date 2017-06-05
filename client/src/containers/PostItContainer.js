import { Container } from 'flux/utils';
import LogInView from '../views/LoginComponent';
//import PostItUserStore from '../data/PostItStore';

function getStores(){
  return [
    PostItStore,
  ];
};

function getState(){
  return {
    loginDetails: PostItStore.getState(),
  }
}

export default Container.createFunctional(LoginView, getStores, getState);n