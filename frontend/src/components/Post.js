import React from 'react'
import { Toast, Modal, Form, Button } from 'react-bootstrap';
import gql from 'graphql-tag';
import { useQuery, useMutation } from 'urql';

const FEED_QUERY = gql`
  {
    info(authorId:"1"){
        id
        title
        content
        createdAt
      }
  }
`

const UPSERT_POST = gql`
  mutation upsertPost($authorId: ID!, $postId:ID!, $title: String!, $content: String) {
    upsertPost(authorId:$authorId, postId: $postId, title: $title, content: $content) {
      id
      content
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

function refreshPage() {
  window.location.reload(false);
}

function PostForm() {
  //Upsert Section
  let postId = 0
  const authorId = "1"
  const [content, setContent] = React.useState('')
  const [title, setTitle] = React.useState('')

  const [upsertState, executeUpsert] = useMutation(UPSERT_POST)
  const upsert = React.useCallback(() => {
    executeUpsert({ authorId, postId, title, content })
  }, [executeUpsert, authorId, postId, title, content])


  return (
    <Form >
      <Form.Group>
        <Form.Control type="text" placeholder={'title...'} value={title}
          onChange={e => setTitle(e.target.value)} />
      </Form.Group>
      <Form.Group controlId="exampleForm.ControlTextarea1">
        <Form.Control as="textarea" placeholder={'content...'} rows="3" value={content}
          onChange={e => setContent(e.target.value)} />
      </Form.Group>
      <Button variant="outline-dark" disabled={upsertState.fetching} onClick={() => { upsert(); refreshPage(); }} >Finish</Button>
    </Form>
  )
}

const Post = ({ post }) => {
  //Delete Section
  const postId = post.id
  const authorId = "1"

  const [showA, setShowA] = React.useState(true);
  const toggleShowA = () => setShowA(!showA);
  const [showB, setShowB] = React.useState(false);
  const toggleShowB = () => setShowB(!showB);

  const [deleteState, executeDelete] = useMutation(DELETE_POST)
  const del = React.useCallback(() => {
    executeDelete({ postId })
  }, [executeDelete, postId])

  //Upsert Section
  const [content, setContent] = React.useState('')
  const [title, setTitle] = React.useState('')

  const [upsertState, executeUpsert] = useMutation(UPSERT_POST)
  const upsert = React.useCallback(() => {
    executeUpsert({ authorId, postId, title, content })
  }, [executeUpsert, authorId, postId, title, content])

  return (
    <>
      <Modal show={showB}>
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
            <Button variant="outline-dark" disabled={upsertState.fetching} onClick={() => { upsert(); toggleShowB(); }} >Finish</Button>
          </Form>
        </Modal.Body>
      </Modal>


      <Toast show={showA} disabled={deleteState.fetching} onClose={() => { del(); toggleShowA(); }}>
        <Toast.Header >
          <strong onClick={toggleShowB} className="mr-auto">{post.title}</strong>
        </Toast.Header>
        <Toast.Body onClick={toggleShowB}>{post.content}</Toast.Body>
      </Toast>
    </>
  )
}

const PostList = () => {
  const [result] = useQuery({ query: FEED_QUERY })
  const { data, fetching, error } = result

  if (fetching) return <div>Fetching</div>
  if (error) return <div>Error</div>

  const postsToRender = data.info

  return (
    <div>
      {postsToRender.map(post => <Post key={post.id} post={post} />)}
    </div>
  );
};

const Combine = () => {
  return (
    <>
      <PostForm />
      <hr></hr>
      <PostList />
    </>
  )

}



export default Combine