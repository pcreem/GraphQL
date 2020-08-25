import React from 'react'
import { Toast } from 'react-bootstrap';

const Post = ({ post }) => (
  <Toast>
    <Toast.Header>
      <strong className="mr-auto">{post.description}</strong>
      <small>11 mins ago</small>
    </Toast.Header>
    <Toast.Body>({post.url})</Toast.Body>
  </Toast>
)

export default Post