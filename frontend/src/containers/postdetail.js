import React, {Component} from 'react';
import {Container, Button} from 'reactstrap';
import axios from 'axios';
import Post from '../components/post';
import Comment from '../components/comment';
import {connect} from 'react-redux';
import Header from '../components/header';

class PostDetail extends Component {
  constructor(props){
    super(props);

    this.state = {
      post: {},
      loading: true
    }
  }

  componentDidMount(){
    const {postID} = this.props.match.params;
    axios.get(`http://127.0.0.1:8000/api/posts/${postID}`).then(res =>{
      this.setState({post: res.data, loading: false});
    })
  }
  render(){
    if(this.state.loading) 
      return <h1>loading...</h1>
    else{
      const {post} = this.state;
      const {post_comments} = post;
      return(
        <Container>
          <Header auth={this.props.auth}/>
          <Post id={post.id} user={post.author} details={true} text={post.content} date={post.date_created}/>
          <h2>Comments</h2>
          {
            post_comments.map((id) => {
              return <Comment id={id}/>
            })
          }
        </Container>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    auth: state.token !== null
  }
}

export default connect(mapStateToProps, null)(PostDetail);