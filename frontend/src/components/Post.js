import React from 'react'
import { Toast } from 'react-bootstrap';
import Moment from 'react-moment';

const Post = ({ post }) => (

  <Toast>
    <Toast.Header>
      <strong className="mr-auto">{post.title}</strong>
      <small><Moment fromNow><Moment unix>{post.createdAt}</Moment></Moment></small>
    </Toast.Header>
    <Toast.Body>{post.content}</Toast.Body>
  </Toast>
)

export default Post