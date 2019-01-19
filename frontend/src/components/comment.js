import React, {Component} from 'react';
import {Container, Col, Row, Card, CardHeader, CardBody, CardText, CardFooter} from 'reactstrap';
import axios from 'axios';

class Comment extends Component{
  constructor(props){
    super(props);

    this.state = {
      comment: {},
      author: ''
    }
  }

  componentDidMount(){
    axios.get(`http://127.0.0.1:8000/api/comments/${this.props.id}`).then(res => {
      this.setState({comment: res.data})
      axios.get(`http://127.0.0.1:8000/api/users/${res.data.author}`).then((res) => {
        this.setState({author: res.data.username})
      })
    })
  }

  render(){
    const {comment, author} = this.state;
    return(
      <Container>
      <Row>
        <Col sm={{size: 6, order:2, offset:1}}>
          <Card>
              <CardHeader>{author}</CardHeader>
              <CardBody>
                <CardText>
                  {comment.content}
                </CardText>
              </CardBody>
              <CardFooter>{comment.date_created}</CardFooter>
          </Card>
        </Col>
        </Row>
      </Container>
    );
  }
}

export default Comment;