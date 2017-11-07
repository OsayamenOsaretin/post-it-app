import React, { Component } from 'react';
import FaClose from 'react-icons/lib/fa/caret-left';
import FaBars from 'react-icons/lib/fa/bars';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import WelcomeView from './WelcomeView.jsx';
import GroupList from './GroupList.jsx';
import GroupItem from './GroupItem.jsx';

/**
 * Group list navigation and body
 * @class GroupListview
 * @extends {Component}
 */
class GroupListView extends Component {
  /**
   * @param {Object} props
   * 
   * @returns {void}
   */
  constructor(props) {
    super(props);
    this.state = {
      toggleMode: 'toggle-out'
    };
    this.handleToggleClick = this.handleToggleClick.bind(this);
  }

  /**
   * @return {void}
   * @memberof GroupListView
   */
  handleToggleClick() {
    this.setState({
      toggleMode: this.state.toggleMode === 'toggle-in' ?
        'toggle-out' : 'toggle-in'
    });
  }
  /**
 * @returns {void}
 * @memberof GroupListView
 */
  render() {
    return (
      <BrowserRouter >
        <div className="main-view">
          <button
            onClick={this.handleToggleClick}
            className={`toggle-button-${this.state.toggleMode
            } visible-sm visible-xs`}
          >
            {this.state.toggleMode !== 'toggle-in' ? <FaBars /> : <FaClose />}
          </button>
          <div className={`group-list-nav ${this.state.toggleMode}`}>
            <GroupList groups={this.props.groups} loading={this.props.loading}/>
          </div>
          <div className="group-details">
            <Switch>
              <Route exact path='/groupBody/:groupId/:groupName'
                component={groupProps => (
                  <GroupItem {...groupProps} />
                )} />
              <Route path='/' component={WelcomeView} />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}
export default GroupListView;
