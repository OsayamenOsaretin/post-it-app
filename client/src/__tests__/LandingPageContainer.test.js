import React from 'react';
import { mount } from 'enzyme';


import LandingPageContainer from '../views/LoginRegisterContainer/LandingPageContainer.jsx';

describe('LandingPageContainer ', () => {
  let mountedLandingPage;
  const landingPageContainer = () => {
    if (!mountedLandingPage) {
      mountedLandingPage = mount(
        <LandingPageContainer />
      );
    }
    return mountedLandingPage;
  };

  beforeEach(() => {
    mountedLandingPage = undefined;
  });

  it('should mount component successfully', () => {
    const component = landingPageContainer();
    expect(component).toBeDefined();
  });
});
