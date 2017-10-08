import React, { Component } from 'react';
import './App.css';
import DefaultView from './components/default'
import Create from './components/create'

class App extends Component {
  render() {
    return (
      <div>
        <Create />
      </div>
    );
  }
}

export default App;
