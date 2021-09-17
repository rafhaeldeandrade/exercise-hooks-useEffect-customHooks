import React from 'react';
import { render } from 'react-dom';
import App from './App';
import RedditContextProvider from './context/RedditContextProvider';


render(
  <RedditContextProvider>
    <App />
  </RedditContextProvider>,
  document.getElementById('root'),
);