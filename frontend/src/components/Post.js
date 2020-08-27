import React from 'react'
import { Toast } from 'react-bootstrap';
import gql from 'graphql-tag';
import { useMutation } from 'urql';

const POST_MUTATION = gql`
  mutation deletePost($postId:ID!) {
    deletePost(postId: $postId) {
      id
    }
  }
`

const Post = ({ post }) => {
  const [showA, setShowA] = React.useState(true);
  const toggleShowA = () => setShowA(!showA);

  const [state, executeMutation] = useMutation(POST_MUTATION)
  const postId = post.id
  console.log(postId)
  const del = React.useCallback(() => {
    executeMutation({ postId })
  }, [executeMutation, postId])


  return (
    <Toast show={showA} onClose={toggleShowA} disabled={state.fetching} onClick={del} value={postId}>
      <Toast.Header>
        <strong className="mr-auto">{post.title}</strong>
      </Toast.Header>
      <Toast.Body>{post.content}</Toast.Body>
    </Toast>
  )
}

export default Post