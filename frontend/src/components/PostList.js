import React from 'react'
import Post from './Post'

const postsToRender = [
  {
    id: '1',
    description: 'Prisma turns your database into a GraphQL API 😎',
    url: 'https://www.prismagraphql.com',
  },
  {
    id: '2',
    description: 'The best GraphQL client',
    url: 'https://formidable.com/open-source/urql/',
  },
]

const PostList = () => (
  <div>
    {postsToRender.map(post => <Post key={post.id} post={post} />)}
  </div>
)

export default PostList