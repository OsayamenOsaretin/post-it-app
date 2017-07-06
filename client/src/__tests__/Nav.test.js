import React from 'react';
import { shallow } from 'enzyme';
import Nav from '../views/LoginRegisterContainer/Nav';

describe('Nav', () => {
  let mountedNavigation;
  const nav = () => {
    if (!mountedNavigation) {
      mountedNavigation = shallow(
        <Nav />
      );
    }
    return mountedNavigation;
  };

  beforeEach(() => {
    mountedNavigation = undefined;
  });

  it('should be defined after mount', () => {
    const component = nav();
    expect(component).toBeDefined();
  });
});
