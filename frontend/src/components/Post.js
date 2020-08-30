import React from 'react'
// import { ListGroup, Modal } from 'react-bootstrap';
import gql from 'graphql-tag';
import { useQuery, useMutation } from 'urql';

const FEED_QUERY = gql`
  {
    info(authorId:"1"){
        id
        title
      }
  }
`

const UPSERT_POST = gql`
  mutation upsertPost($authorId: ID!, $postId:ID!, $title: String!) {
    upsertPost(authorId:$authorId, postId: $postId, title: $title) {
      id
      title
    }
  }
`

// const DELETE_POST = gql`
//   mutation deletePost($postId:ID!) {
//     deletePost(postId: $postId) {
//       id
//     }
//   }
// `

// function refreshPage() {
//   window.location.reload(false);
// }

const Post = () => {
  const authorId = "1"
  const postId = "1"
  //Upsert Section
  const [title, setTitle] = React.useState('')
  const [upsertState, executeUpsert] = useMutation(UPSERT_POST)
  const upsert = React.useCallback(() => {
    if (title.length !== 0) { executeUpsert({ authorId, postId, title }) }
  }, [executeUpsert, authorId, postId, title])



  //Delete Section
  // const [postId, setPostId] = React.useState('')
  // function setPId(postid) {
  //   return setPostId(postid)
  // }

  // const [showA, setShowA] = React.useState(true);
  // const toggleShowA = () => setShowA(!showA);
  // const [showB, setShowB] = React.useState(false);
  // const toggleShowB = () => setShowB(!showB);

  // const [deleteState, executeDelete] = useMutation(DELETE_POST)
  // const del = React.useCallback(() => {
  //   executeDelete({ postId })
  // }, [executeDelete, postId])

  const [result] = useQuery({ query: FEED_QUERY })
  const { data, fetching, error } = result

  if (fetching) return <div>Fetching</div>
  if (error) return <div>Error</div>

  console.log(data.info)

  return (
    <>
      <form className="form-inline">
        <input type="text" className="form-control" placeholder="add a new todo..." value={title}
          onChange={e => setTitle(e.target.value)} />
        <button type="submit" className="btn btn-default" disabled={upsertState.fetching} onClick={() => { upsert(); }}>Add</button>
      </form>

      {/* {postsToRender.map(post =>
        <React.Fragment key={post.id}>
          <Modal show={showB}>
            <Modal.Body>
              <form className="form-inline">
                <input type="text" className="form-control" placeholder={post.title} value={title}
                  onChange={e => setTitle(e.target.value.length === 0 ? post.title : e.target.value)} />
                <button type="submit" className="btn btn-default" disabled={upsertState.fetching} onClick={() => { upsert(); setPId(post.id) }} >Update</button>
              </form>
            </Modal.Body>
          </Modal>

          <ListGroup>
            <ListGroup.Item show={showA}>
              <p onClick={toggleShowB} className="mr-auto">{post.title}</p>
              <button type="button" disabled={deleteState.fetching} onClick={() => { setPId(post.id); del(); toggleShowA(); }}>&times;</button>
            </ListGroup.Item>
          </ListGroup>
        </React.Fragment>
      )} */}
    </>
  )
}



export default Post