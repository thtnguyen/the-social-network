import React, {Component} from 'react';
import {Container, Input, Button} from 'reactstrap';
import axios from 'axios';

class ReplyForm extends Component{
  constructor(props){
    super(props);

    this.state = {
      reply: ''
    }
    this.handleReply = this.handleReply.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event){
    this.setState({[event.target.name]: event.target.value})
    console.log(this.props.post_id);
  }

  async handleReply(){
    await axios.post('http://127.0.0.1:8000/api/createcomments/', {
      content: this.state.reply,
      author: localStorage.getItem('id'),
      post: this.props.post_id
    }).then(res => {
      if(res.status === 201){
        window.location.reload();
      }
    }).catch(error => {
      console.log(error)
    })
  }

  render(){
    return(
      <Container>
        <Input name='reply' 
               type='textarea' 
               placeholder='Enter your comment here.'
               onChange ={this.handleChange}/>
        <Button onClick={this.handleReply}>Submit Reply</Button>
      </Container>
    )
  }
}

export default ReplyForm;