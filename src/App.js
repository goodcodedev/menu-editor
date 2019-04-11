import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import './App.css';
import MenuList from './MenuList';
import reducer from './reducers';
import MenuHeader from './MenuHeader';

let store = createStore(reducer, applyMiddleware(thunkMiddleware));

function App() {
  return (
    <div>
      <Provider store={store}>
        <MenuHeader />
        <MenuList />
      </Provider>
    </div>
  );
}

export default App;
