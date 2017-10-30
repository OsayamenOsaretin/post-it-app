import React from 'react';
import { shallow } from 'enzyme';
import GroupItem from '../../views/GroupContainer/GroupItem.jsx';

describe('GroupItem', () => {
  let mountedComponent;
  let props;
  const groupItem = () => {
    if (!mountedComponent) {
      mountedComponent = shallow(
        <GroupItem {...props}/>
      );
    }
    return mountedComponent;
  };

  beforeEach(() => {
    props = {
      groupName: undefined,
      match: {
        params: {
          groupId: undefined,
        }
      }
    };
    mountedComponent = undefined;
  });

  it('should render', () => {
    const component = groupItem();
    expect(component).toBeDefined();
  });

  it('should have props', () => {
    const component = groupItem();
    expect(Object.keys(component.props()).length).toBeGreaterThan(0);
  });

  it('changes add user state on button click', () => {
    const button = groupItem().find('.add-user-button');
    const addUserState = groupItem().state().addUser;
    button.simulate('click');
    expect(groupItem().state().addUser).toBe(!addUserState);
  });

  it('should render message body component', () => {
    const component = groupItem();
    const messageBody = component.find('MessageBody');
    expect(messageBody).toBeDefined();
  });
});
