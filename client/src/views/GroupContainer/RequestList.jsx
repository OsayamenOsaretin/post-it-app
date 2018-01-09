import React, { Component } from 'react';
import RequestStore from '../../stores/GroupRequestStore';
import RequestItem from '../../views/GroupContainer/RequestItem.jsx';

/**
 * component for the list of group requests
 * @class RequestList
 * @extends Component
 */
class RequestList extends Component {
  /**
   * react component constructor
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    this.state = {
      requests: RequestStore.getRequests()
    };

    this.onChange = this.onChange.bind(this);
  }

  /**
   * lifecycle event to attach request store listener
   * @return {void}
   */
  componentDidMount() {
    RequestStore.addChangeListener(this.onChange);
  }

  /**
   * lifecycle event to remove request store listener
   * @return {void}
   */
  componentWillUnmount() {
    RequestStore.removeChangeListener(this.onChange);
  }

  /**
   * on change listener to update request list on new request
   * @return {void}
   */
  onChange() {
    const theRequests = RequestStore.getRequests();
    this.setState({
      requests: theRequests
    });
  }

  /**
   * render the view for the requestList
   * @return {void}
   */
  render() {
    return (
      this.state.requests.size > 0 ?
        <div>
          {this.state.requests.entrySeq().map(([key, requestItem]) => (
            <div key={key} className='group-list-item'>
              <div className='invite'>
                Invited to join
              </div>
              <div>
                <RequestItem
                  request = {requestItem}
                  groupId={key}
                />
              </div>
            </div>
          ))}
        </div> : <div className='no-requests'></div>
    );
  }
}

export default RequestList;
