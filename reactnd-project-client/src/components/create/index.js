import React, { Component } from 'react';
import { connect } from 'react-redux';
import uuidv1 from 'uuid/v1';

class Create extends Component {
  constructor() {
    super()
    this.state = { categories : [] }
  }

  componentDidMount(){
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
      this.setState({categories: json.categories})
    })
  }

  submit = (e) => {
    e.preventDefault()
    let uuid = uuidv1();
    console.log("Post Data", 
      {
        id: uuid,
        timestamp: Date.now(),
        title: this.title.value,
        body: this.body.value,
        author: this.author.value,
        category: this.category.value 
      }
    )
    fetch(`${this.props.url}/posts`,
      { headers: {
          'Authorization': 'insikcho',
          'Content-Type': 'application/json'
        },
        method: 'post',
        body: JSON.stringify({
          id: uuid,
          timestamp: Date.now(),
          title: this.title.value,
          body: this.body.value,
          author: this.author.value,
          category: this.category.value            
        })
      }
    )
    .then(response => {
      return response.json()
    })
    .then(json => {
      console.log(json)
    })
  }

  render() {
    return (
      <div>
        <form>
        <select name="category" ref={input => { this.category = input }}>
        {
          this.state.categories.map(category => (
            <option key={category.name} value={category.name}>{category.name}</option>
          ))
        }  
        </select>
        <input type="input" name="author" placeholder="Author" ref={input => {this.author = input}}/>
        <input type="input" name="title" placeholder="Title" ref={input => {this.title = input}}/>
        <input type="submit" name="create" onClick={this.submit}/>
        <br />
        <textarea cols="60" rows="5" name="body" placeholder="Your Text" ref={input => {this.body = input}}/>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state, props) => {
  return {
    url: state.create.serviceUrl
  }  
}
 
export default connect(mapStateToProps)(Create);
