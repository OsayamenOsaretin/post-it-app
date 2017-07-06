import React from 'react';
import { shallow } from 'enzyme';
import GroupList from '../views/GroupContainer/GroupList.jsx';

describe('GroupList', () => {
  let mountedComponent;
  let props;
  const groupList = () => {
    if (!mountedComponent) {
      mountedComponent = shallow(
        <GroupList {...props} />
      );
    }
    return mountedComponent;
  };

  beforeEach(() => {
    props = {
      groups: []
    };
    mountedComponent = undefined;
  });

  it('should render', () => {
    const component = groupList();
    expect(component).toBeDefined();
  });

  it('should take props', () => {
    const component = groupList();
    expect(Object.keys(component.props()).length).toBeGreaterThan(0);
  });

  it('should render add group view', () => {
    expect(groupList().find('AddGroupView')).toBeDefined();
  });

  it('should render a group item', () => {
    expect(groupList().find('GroupItem')).toBeDefined();
  });
});
