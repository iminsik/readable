import React, { Component } from 'react';
import { connect } from 'react-redux';
import uuidv1 from 'uuid/v1';
import { Button, MenuItem, SplitButton } from 'react-bootstrap';

class Create extends Component {
  constructor() {
    super()
    this.state = { categories : [], selectedCategory : "react" }
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
        category: this.state.selectedCategory
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
          category: this.state.selectedCategory            
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
      <div style={{margin: '20px 50px'}}>
        <form>
          <input className="form-control" type="input" name="author" placeholder="Author" ref={input => {this.author = input}}/>
          <input className="form-control" type="input" name="title" placeholder="Title" ref={input => {this.title = input}}/>
          <Button bsStyle="primary" type="submit" name="create" onClick={this.submit}>Submit</Button>
          <SplitButton ref={input => { this.splitbutton = input }} bsStyle="primary" title={this.state.selectedCategory} id="SplitButton">
            {
              this.state.categories.map((category, idx) => (
                <MenuItem key={category.name} eventKey={idx} value={category.name} onClick={(e) => { this.setState({selectedCategory: e.target.text })} }>{category.name}</MenuItem>
              ))
            }  
          </SplitButton>
          <br />
          <textarea style={{width: '100%'}}rows="5" name="body" placeholder="Your Text" ref={input => {this.body = input}}/>
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
