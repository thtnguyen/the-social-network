import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import * as actions from '../actions/actionCreators';
import {ModalFooter,Modal, ModalHeader, ModalBody, Button, Input} from 'reactstrap';

class PostModal extends Component{ 
  constructor(props){
    super(props);
    this.state = {
      content: '',
      author: localStorage.getItem('id'),
      post_comments: []
    }
    this.handleChange = this.handleChange.bind(this);
    this.handlePublish = this.handlePublish.bind(this);
  }

  handleChange(event){
    this.setState({
      [event.target.name]: event.target.value
    })
  }

 handlePublish(){
     axios.post('http://127.0.0.1:8000/api/createposts/', this.state).then(res => {
      if(res.status === 201){
        window.location.reload()
      }
    }).catch(error => {
      console.log(error);
    }) 
  }

  render(){
    return(
      <Modal isOpen={this.props.modalOpen} toggle={this.props.toggle}>
          <ModalHeader toggle={this.props.toggle}>Create New Post</ModalHeader>
                { this.props.auth ?
                <ModalBody>
                  <Input name='content' 
                         type='textarea' 
                         placeholder='Write your post here!'
                         onChange={this.handleChange}/>
                </ModalBody>
                  :
                  <ModalBody>
                  You need to be logged in to create a new post.
                  </ModalBody>
                }
                {
                  this.props.auth ? 
                  <ModalFooter>
                  <Button color="primary" onClick={this.handlePublish}>Publish Post</Button>{' '}
                  <Button color="secondary" onClick={this.props.toggle}>Cancel</Button>
                  </ModalFooter>

                  :
                  <ModalFooter>
                  <Button color="primary" onClick={this.props.toggle}>OK</Button>{' '}
                  </ModalFooter>
                }
      </Modal>
    );
  }
}

const mapStateToProps = state => {
  return{
    modalOpen: state.modalOpen,
    auth: state.token != null
  }
}

const mapDispatchToProps = dispatch => {
  return{
    toggle: () => dispatch(actions.createPost())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(PostModal);