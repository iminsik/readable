import React, { Component } from 'react';
import { connect } from 'react-redux';

class Create extends Component {
  componentDidMount(){
    console.log("URL", this.props.url);
    fetch(`${this.props.url}/categories`,
      { headers: {
          'Authorization': 'insikcho',
          'Content-Type': 'application/json' 
        }
      }
    )
    .then((response) => {
      return response.json(); 
    })
    .then((json) => {
      console.log(json);
    })
  }

  render() {
    return (
      <div>Let's create a new post</div>
    )
  }
}

const mapStateToProps = (state, props) => {
  return {
    url: state.serviceUrl
  }  
}
 
export default connect(mapStateToProps)(Create);
