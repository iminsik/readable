import React, { Component } from 'react';
import { connect } from 'react-redux';

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
      <div>
        <h1>Default View</h1>
        <ul>
        {
            this.state.posts.map((post, idx) => (
              <li key={idx}>{post.title}, {post.voteScore}, {post.date.toString()}</li>
            )) 
        }  
        </ul>
      </div>
    )
  }
}

export default connect()(DefaultView)
