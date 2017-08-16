import React from 'react';
import FaClose from 'react-icons/lib/fa/close';
import FaCheck from 'react-icons/lib/fa/check';
import AcceptRejectAction from
  '../../data/postItActions/acceptRejectGroupRequestAction';
import PostItDispatcher from '../../data/PostItDispatcher';
import PostItActionTypes from '../../data/PostItActionTypes';

/* global localStorage */

export default (props) => {
  const handleClick = (selectedStatus, event) => {
    event.preventDefault();
    // const selectedStatus = event.target.value;
    console.log('i;m here ===>', props.groupId);
    const id = props.groupId;
    const user = localStorage.getItem('userId');

    PostItDispatcher.handleServerAction({
      type: PostItActionTypes.DELETE_REQUEST,
      id: props.groupId
    });

    // call accept reject action
    AcceptRejectAction({
      status: selectedStatus,
      groupId: id,
      userId: user
    });
  };

  return (
    <div className="add-group-request">
      <div className="request-body">
        {props.request.get('groupname')}
      </div>
      <div className="accept-reject-div">
        <button
          className="accept-button"
          value="true"
          onClick={event => handleClick('true', event)}>
          <FaCheck
            size={25}
            color={'#578ec9'}/>
        </button>
        <button
          className="reject-button"
          value="false"
          onClick={event => handleClick('false', event)}>
          <FaClose
            size={25}
            color={'red'}/>
        </button>
      </div>
    </div>
  );
};
