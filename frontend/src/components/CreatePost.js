import React from 'react'
import { Form, Button } from 'react-bootstrap'
import gql from 'graphql-tag';
import { useMutation } from 'urql';

const POST_MUTATION = gql`
  mutation createPost($authorId: ID!,$content: String!, $title: String!) {
    createPost(authorId:$authorId, content: $content, title: $title) {
      id
      createdAt
      title
      content
    }
  }
`

const CreatePost = props => {
  const [content, setContent] = React.useState('')
  const [title, setTitle] = React.useState('')

  const [state, executeMutation] = useMutation(POST_MUTATION)
  const authorId = "1"
  const finish = React.useCallback(() => {
    executeMutation({ authorId, title, content })
    console.log(title, content)
  }, [executeMutation, authorId, title, content])

  return (
    <Form>
      <Form.Group>
        <Form.Control type="text" placeholder="title..." value={title}
          onChange={e => setTitle(e.target.value)} />
      </Form.Group>
      <Form.Group controlId="exampleForm.ControlTextarea1">
        <Form.Control as="textarea" placeholder="content..." rows="10" value={content}
          onChange={e => setContent(e.target.value)} />
      </Form.Group>
      <Button variant="outline-dark" disabled={state.fetching} onClick={finish}>Finish</Button>
    </Form>
  )
}

export default CreatePost