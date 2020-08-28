import React from 'react'
import PostList from './PostList'
import CreatePost from './CreatePost'
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <div>
      <CreatePost />
      <PostList />
    </div>
  )
}

export default App