import React from 'react';
import { shallow } from 'enzyme';
import GroupList from '../../views/GroupContainer/GroupList.jsx';
import groupListMap from '../../flux/models/groupList';

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

  const groups = new groupListMap([['firstkey', new Map()],
    ['second', new Map()]]);

  beforeEach(() => {
    props = {
      groups
    };
    mountedComponent = undefined;
  });

  it('should successfully mount component', () => {
    const component = groupList();
    expect(component).toBeDefined();
  });

  it('should mount with the right props', () => {
    const component = groupList();
    const groupProp = component.instance().props.groups;
    expect(groupProp).toBe(groups);
  });

  it('should render add group view', () => {
    expect(groupList().find('AddGroupView')).toBeDefined();
  });
});
