import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import DefaultView from './components/default'
import Create from './components/create'

class App extends Component {
  navPage = (page) => {
    switch(page) {
      case 'create':
        return <Create />
      default:
        return <DefaultView />
    }
  }

  render() {
    return (
      <div>
        { this.navPage(this.props.page) }
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    page: state.navigation.page
  }
}

export default connect(mapStateToProps)(App);
