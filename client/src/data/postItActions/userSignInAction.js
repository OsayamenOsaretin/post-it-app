import axios from 'axios';
import PostItActionTypes from '../PostItActionTypes';


export default (userDetails) => {
  return (dispatch) => {
    axios.get('user/signin', {
      body: userDetails
    })
    .then(() => {
      dispatch({
        type: PostItActionTypes.GET_GROUPS,
      });
    })
    .catch((err) => {
      dispatch({
        type: PostItActionTypes.FAILED_SIGNIN,
        err: err.message,
        status: 'failed'
      });
    });
  };
};
