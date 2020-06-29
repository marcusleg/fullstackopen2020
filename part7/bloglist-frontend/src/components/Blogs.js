import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AddBlogForm from './AddBlogForm'
import Blog from './Blog'
import Toggable from './Toggable'
import { initializeBlogs } from '../reducers/blogReducer'

const Blogs = ({ setNotificationMessage }) => {
  const dispatch = useDispatch()

  const addBlogFormRef = React.createRef()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])
  const sortedBlogs = useSelector(state => state.blogs.sort((a, b) => a.likes < b.likes))

  return (
    <>
      <Toggable buttonLabel="new blog" ref={addBlogFormRef}>
        <AddBlogForm setNotificationMessage={setNotificationMessage} />
      </Toggable>
      <h2>blogs</h2>
      {sortedBlogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )
      }
    </>
  )
}

export default Blogs
