import React from 'react';
import ReactDOM from 'react-dom';
import LandingPageContainer from './views/LandingPageContainer.jsx';
import SendMessageView from './views/SendMessageView.jsx';
import AddGroupView from './views/AddGroupView.jsx';
import GroupItem from './views/GroupItem.jsx';
import MessageBodyHeader from './views/MessageBodyHeader.jsx';
import App from './views/App.jsx';
import './index.css';

ReactDOM.render(<LandingPageContainer />, document.getElementById('app'));
