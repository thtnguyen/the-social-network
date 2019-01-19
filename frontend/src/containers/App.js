import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Col, Row, Container, } from 'reactstrap';
import Post from '../components/post';
import Header from '../components/header';
import PostModal from '../components/postmodal';
import axios from 'axios';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      posts: [],
      createPost: false
    }
  }
  componentDidMount(){
    axios.get('http://127.0.0.1:8000/api/posts').then(res => {
      this.setState({posts: res.data})
    })
  }

  render() {
    return (
      <Container>
        <Header auth = {this.props.auth}/>
        {this.state.posts.map((post)=>{
          return <Post id = {post.id} details={false} text={post.content} date={post.date_created} user={post.author}/>
        })}
      <PostModal/>
     </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.token != null
  }
}

export default (connect(mapStateToProps, null))(App);
