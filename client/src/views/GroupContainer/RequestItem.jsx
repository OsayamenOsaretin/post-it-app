import React from 'react';
import FaClose from 'react-icons/lib/fa/close';
import FaCheck from 'react-icons/lib/fa/check';
import AcceptRejectAction from
  '../../data/postItActions/acceptRejectGroupRequestAction';

export default (props) => {
  const handleClick = (event) => {
    event.preventDefault();
    const selectedStatus = event.target.value;
    const id = props.groupId;

    // call accept reject action
    AcceptRejectAction({
      status: selectedStatus,
      groupId: id
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
          onClick={handleClick}>
          <FaCheck />
        </button>
        <button
          className="reject-button"
          value="false"
          onClick={handleClick}>
          <FaClose />
        </button>
      </div>
    </div>
  );
};
