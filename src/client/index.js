// @flow

// Root client file, shouldn't need to be edited

import React from 'react';
import ReactDOM from 'react-dom';
import MainPage from './components/MainPage.react';

const root = document.getElementById('root');
ReactDOM.render(<MainPage />, root);
