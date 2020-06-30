import React, { useEffect } from 'react'
import { Switch, Route, useRouteMatch } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import AddBlogForm from './AddBlogForm'
import Blog from './Blog'
import BlogView from './BlogView'
import Toggable from './Toggable'
import { initializeBlogs } from '../reducers/blogReducer'

const Blogs = ({ setNotificationMessage }) => {
  const dispatch = useDispatch()

  const addBlogFormRef = React.createRef()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])
  const sortedBlogs = useSelector(state => state.blogs.sort((a, b) => a.likes < b.likes))

  const match = useRouteMatch('/blogs/:id')
  const matchedBlog = match
    ? sortedBlogs.find(blog => blog.id === match.params.id)
    : null

  return (
    <Switch>
      <Route path="/blogs/:id">
        <BlogView blog={matchedBlog} />
      </Route>
      <Route path="/">
        <Toggable buttonLabel="new blog" ref={addBlogFormRef}>
          <AddBlogForm setNotificationMessage={setNotificationMessage} />
        </Toggable>
        <h2>blogs</h2>
        {sortedBlogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )
        }
      </Route>
    </Switch>
  )
}

export default Blogs
