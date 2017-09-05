import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import DefaultView from './components/default'
import { Provider  } from 'react-redux'
import { createStore  } from 'redux'

class App extends Component {
  render() {
    return (
      <div>
        <DefaultView />
      </div>
    );
  }
}

export default App;
