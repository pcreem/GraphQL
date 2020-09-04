import React from 'react'
import { InputGroup, FormControl, Button, Col, Row, Alert, Spinner } from 'react-bootstrap';
import gql from 'graphql-tag';
import { useQuery, useMutation } from 'urql';
// import { getToken, deleteToken } from '../token'

export const FEED_QUERY = gql`
  {
    info{
        id
        title
      }
  }
`;

const UPSERT_POST = gql`
  mutation upsertPost( $postId:ID!, $title: String!) {
    upsertPost( postId: $postId, title: $title) {
      id
      title
    }
  }
`

const DELETE_POST = gql`
  mutation deletePost($postId:ID!) {
    deletePost(postId: $postId) {
      id
    }
  }
`

// function refreshPage() {
//   window.location.reload(false);
// }

const PostForm = (props) => {
  //Upsert Section
  let postId = 0
  const [title, setTitle] = React.useState('')

  const [upsertState, executeUpsert] = useMutation(UPSERT_POST)
  const upsert = React.useCallback(() => {
    if (title.length !== 0) { executeUpsert({ postId, title }); }
  }, [executeUpsert, postId, title])

  return (
    <Col sm={6}>
      <InputGroup className="mb-3">
        <FormControl
          placeholder='Add Todo...'
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <InputGroup.Append>
          <Button
            variant="outline-secondary"
            disabled={upsertState.fetching}
            type="submit"
            onClick={() => { upsert(); }}
          >Add</Button>
        </InputGroup.Append>
      </InputGroup>
      <Button
        variant="outline-secondary"
        disabled={upsertState.fetching}
        type="submit"
        onClick={() => { props.handleLogout() }}
      >Logout</Button>
    </Col>
  )
}

function Post({ post }) {
  //Delete Section
  const postId = post.id
  const [deleteState, executeDelete] = useMutation(DELETE_POST)
  const del = React.useCallback(() => {
    executeDelete({ postId })
  }, [executeDelete, postId])

  return (
    <Col sm={6}>
      <Alert variant="light" disabled={deleteState.fetching} onClose={() => { del(); }} dismissible>
        <p>{post.title}</p>
      </Alert>
    </Col>
  )
}



const PostList = () => {
  const [result] = useQuery({ query: FEED_QUERY })
  const { data, fetching, error } = result

  if (fetching) return <><Spinner animation="border" role="status"><span className="sr-only">Loading...</span></Spinner></>

  if (error) return <div>Error</div>

  const postsToRender = data.info
  return (
    <>
      {postsToRender.map(post => <Post key={post.id} post={post} />)}
    </>
  );
};

const Combine = (props) => {
  return (
    <>
      <br></br>
      <Row className="justify-content-md-center">
        <PostForm handleLogout={props.handleLogout} />
      </Row>
      <br></br>
      <Row className="justify-content-md-center">
        <PostList />
      </Row>
    </>
  )

}

export default Combine