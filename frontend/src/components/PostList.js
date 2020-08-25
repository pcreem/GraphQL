import React from 'react'
import Post from './Post'
import { useQuery } from 'urql'
import gql from 'graphql-tag'

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

export default PostList