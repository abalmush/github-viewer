import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { GitHubProvider } from './context/GitHubContext';

ReactDOM.render(
  <GitHubProvider>
    <App />
  </GitHubProvider>,
  document.getElementById('root')
);