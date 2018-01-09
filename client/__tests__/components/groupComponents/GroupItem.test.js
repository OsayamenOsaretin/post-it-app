import React from 'react';
import { shallow } from 'enzyme';
import GroupItem from '../../../src/views/GroupContainer/GroupItem.jsx';

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
      groupName: 'testGroupName',
      match: {
        params: {
          groupId: 'testGroupId',
        }
      }
    };
    mountedComponent = undefined;
  });

  it('should mount successfully', () => {
    const component = groupItem();
    expect(component).toBeDefined();
  });

  it('should mount with the right props', () => {
    const component = groupItem();
    const groupNameProps = component.instance().props.groupName;
    const groupIdProps = component.instance().props.match.params.groupId;
    expect(groupNameProps).toBe('testGroupName');
    expect(groupIdProps).toBe('testGroupId');
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
