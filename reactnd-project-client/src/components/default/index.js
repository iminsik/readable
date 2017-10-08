import React, { Component } from 'react';
import { connect } from 'react-redux';

class DefaultView extends Component {
  render() {
    return (
      <div>
        <h1>Default View</h1>
      </div>
    )
  }
}

export default connect()(DefaultView)
