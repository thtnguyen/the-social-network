import React, {Component} from 'react';
import {Redirect} from 'react-router';
import {Button, Col, Row, Card, CardText, 
        CardBody, CardFooter, CardHeader} from 'reactstrap';
import ReplyForm from './replyform';
import axios from 'axios';

class Post extends Component {
  constructor(props){
    super(props);

    this.state = {
      author: '',
      redirect: false,
      replyToggle: false
    }
    this.viewPostClick = this.viewPostClick.bind(this);
    this.toggleReplyForm = this.toggleReplyForm.bind(this);
  }

  componentDidMount(){
    axios.get(`http://127.0.0.1:8000/api/users/${this.props.user}`).then(res => {
      this.setState({
        author: res.data.username
      })
    })
  }

  //redirects to detail view
  viewPostClick(event){
    event.preventDefault();
    this.setState({redirect: true})
  }

  toggleReplyForm(){
    this.setState({replyToggle: !this.state.replyToggle});
    console.log(this.props.id)
  }

  render(){
    if(this.state.redirect) return <Redirect to={`/posts/${this.props.id}`}/>

    return(
      <Row>
        <Col>
        <Card>
          <CardHeader>{this.state.author}</CardHeader>
          <CardBody>
            <CardText>
              {this.props.text}<br/>
              {
                this.state.replyToggle ?
                <Button onClick={this.toggleReplyForm}>Cancel Reply</Button>

                :

                <Button onClick={this.toggleReplyForm}>Reply</Button>
              }
              {
                !this.props.details &&
              <Button onClick={this.viewPostClick}>View Post</Button>
              }
            </CardText>
          </CardBody>
          <CardFooter>{this.props.date}</CardFooter>
          {this.state.replyToggle && <ReplyForm post_id = {this.props.id}/>}
        </Card>
        </Col>
      </Row>
    );
  }
}

export default Post;