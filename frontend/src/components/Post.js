import React from 'react'
import { Toast, Modal, Form, Button } from 'react-bootstrap';
import gql from 'graphql-tag';
import { useMutation } from 'urql';

const DELETE_POST = gql`
  mutation deletePost($postId:ID!) {
    deletePost(postId: $postId) {
      id
    }
  }
`

const EDIT_POST = gql`
  mutation updatePost($postId:ID!, $title: String!, $content: String) {
    updatePost(postId: $postId, title: $title, content: $content) {
      id
      content
      title
    }
  }
`

const Post = ({ post }) => {
  const [showA, setShowA] = React.useState(true);
  const toggleShowA = () => setShowA(!showA);

  const [deleteState, executeDelete] = useMutation(DELETE_POST)
  const postId = post.id
  const del = React.useCallback(() => {
    executeDelete({ postId })
  }, [executeDelete, postId])

  const [showB, setShowB] = React.useState(false);
  const toggleShowB = () => setShowB(!showB);
  const [content, setContent] = React.useState('')
  const [title, setTitle] = React.useState('')

  const [editState, executeEdit] = useMutation(EDIT_POST)
  // let [title, content] = [post.title, post.content]
  const edit = React.useCallback(() => {
    executeEdit({ postId, title, content })
    console.log(postId, title, content)
  }, [executeEdit, postId, title, content])

  return (
    <div>
      <Modal show={showB}>
        <Modal.Header closeButton>
          <Modal.Title>Login Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form >
            <Form.Group>
              <Form.Control type="text" placeholder={post.title} value={title}
                onChange={e => setTitle(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Control as="textarea" placeholder={post.content} rows="3" value={content}
                onChange={e => setContent(e.target.value)} />
            </Form.Group>
            <Button variant="outline-dark" disabled={editState.fetching} onClick={() => { edit(); toggleShowB(); }} >Finish</Button>
          </Form>
        </Modal.Body>
      </Modal>


      <Toast show={showA} disabled={deleteState.fetching} onClose={() => { del(); toggleShowA(); }}>
        <Toast.Header onClick={toggleShowB}>
          <strong className="mr-auto">{post.title}</strong>
        </Toast.Header>
        <Toast.Body onClick={toggleShowB}>{post.content}</Toast.Body>
      </Toast>
    </div>
  )
}




export default Post