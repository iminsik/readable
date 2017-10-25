import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';

//My goal in default view is to list titles of articles.
class DefaultView extends Component {
  constructor() {
    super()
    this.state = { posts : [] }
  }
  componentDidMount() {
    fetch('http://localhost:5001/posts',
      {
        headers: {
          'Authorization': 'insikcho',
          'Content-Type': 'application/json' 
        }
      }
    )
    .then((response) => {
      return response.json();
    })
    .then((json) => {
        let posts = json.map((post) => 
        (
          {
            title: post.title,
            voteScore: post.voteScore,
            date: new Date(post.timestamp)
          }
        ));

        this.setState({
          posts 
        });
    })
  }
  render() {
    return (
      <div className='container'>
        <h1>List Posts</h1>
        <div className='row'>
          <div className='col-md-8 well cell'>Title</div>
          <div className='col-md-2 well cell'>Vote</div>
          <div className='col-md-2 well cell'>Date</div>
        </div>
        <div>
        {
            this.state.posts.map((post, idx) => (
              <div key={idx} className='row'>
                <div className='col-md-8 well cell'>{post.title}</div>
                <div className='col-md-2 well cell'>{post.voteScore}</div>
                <div className='col-md-2 well cell'>{post.date.getFullYear() + '/' + post.date.getMonth() + '/' + post.date.getDay()}</div>
              </div>
            )) 
        }  
        </div>
        <div style={{ marginTop: "20px" }}>
           <Button
              bsStyle="primary"
              type="submit"
              name="addPost"
              onClick={this.props.navToCreatePage}>
              Add Post
          </Button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, props) => {
  return {
    page: state.navigation.page
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    navToCreatePage: () => {
      dispatch({ type: 'nav', page: 'create' })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DefaultView)
