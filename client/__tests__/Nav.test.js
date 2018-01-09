import React from 'react';
import { shallow } from 'enzyme';
import Nav from '../src/views/LoginRegisterContainer/Nav.jsx';

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

  it('should mount component successfully', () => {
    const component = nav();
    expect(component).toBeDefined();
  });
});
