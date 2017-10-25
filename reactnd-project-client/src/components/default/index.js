import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';

//My goal in default view is to list titles of articles.
class DefaultView extends Component {
  constructor() {
    super()
    this.state = { posts : [], sort: { key: 'date', direction: 'Inc' }}
  }

  sortFuncs = {
    Inc: (prev, current) => {
      return prev < current
    },
    Desc: (prev, current) => {
      return prev > current
    }
  }

  sortBy = (key) => {
    const sortFuncs = this.sortFuncs;
    return () => {
      let direction = (this.state.sort.direction === 'Inc') ? 'Desc' : 'Inc'
      let posts = this.state.posts.sort((prev, current) => {
        switch(key) {
          case 'title':
            return sortFuncs[direction](prev.title, current.title)  
          case 'votescore':
            return sortFuncs[direction](prev.voteScore, current.voteScore)  
          case 'category':
            return sortFuncs[direction](prev.category, current.category)  
          case 'date':
            return sortFuncs[direction](prev.date, current.date)  
          default:
            return sortFuncs[direction](prev.date, current.date)  
        }
      })
      this.setState(
        {
          posts,
          sort: {
            key: key,
            direction: direction
          }
        }
      ) 
    }
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
            category: post.category,
            date: new Date(post.timestamp)
          }
        ));
        const { key, direction } = this.state.sort
        posts = posts.sort((prev, current) => this.sortFuncs[direction](prev[key], current[key]))

        this.setState({ posts });
    })
  }

  render() {
    return (
      <div className='container' style={{margin: '20px 50px'}}>
        <h1>List Posts</h1>
         <Button
            bsStyle="primary"
            type="submit"
            name="addPost"
            onClick={this.props.navToCreatePage}>
            Add Post
        </Button>
        <div className='row articleRow' style={{ marginTop: "20px" }}>
          <div className='col-md-6 well cell header' onClick={this.sortBy('title')}>Title</div>
          <div className='col-md-2 well cell header' onClick={this.sortBy('votescore')}>Vote</div>
          <div className='col-md-2 well cell header' onClick={this.sortBy('date')}>Date</div>
          <div className='col-md-2 well cell header' onClick={this.sortBy('category')}>Category</div>
        </div>
        <div>
        {
            this.state.posts.map((post, idx) => (
              <div key={idx} className='row articleRow'>
                <div className='col-md-6 well cell'>{post.title}</div>
                <div className='col-md-2 well cell'>{post.voteScore}</div>
                <div className='col-md-2 well cell'>{post.date.getFullYear() + '/' + post.date.getMonth() + '/' + post.date.getDay()}</div>
                <div className='col-md-2 well cell'>{post.category}</div>
              </div>
            )) 
        }  
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
