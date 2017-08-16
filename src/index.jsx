import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import TodoStore from './TodoStore';
import App from './App';


const todoStore = new TodoStore();

render(
  <AppContainer>
    <App store={todoStore} />
  </AppContainer>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept('./App', () => {
    const NextApp = require('./App').default;

    render(
      <AppContainer>
        <NextApp store={todoStore} />
      </AppContainer>,
      document.getElementById('root')
    );
  });
}
