import React, { Component } from 'react';
import RequestStore from '../../data/postItStores/PostItGroupRequestStore';
import RequestView from '../../views/GroupContainer/RequestItem.jsx';

/**
 * component for the list of group requests
 */
class RequestList extends Component {
  /**
   * react component constructor
   * @param {*} props
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
          {this.state.requests.map((requestItem, key) => (
            <div className='group-list-item'>
              <div className='invite'>
                Invited to join
              </div>
              <p>
                <RequestView
                  request = {requestItem}
                  groupId={key}
                />
              </p>
            </div>
          ))}
        </div> : <div></div>
    );
  }
}

export default RequestList;
