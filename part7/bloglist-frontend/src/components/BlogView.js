import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import { Button, Paper, TextField, Typography } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import { deleteBlog, likeBlog, commentBlog } from '../reducers/blogReducer'

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: '0.5rem',
  },
}))


const BlogDetail = ({ blog }) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const [comment, setComment] = useState()

  const handleLike = async () => {
    dispatch(likeBlog(blog))
  }

  const handleRemove = async () => {
    if (!window.confirm(`Do you really want to remove ${blog.title} by ${blog.author}`)) {
      return
    }
    dispatch(deleteBlog(blog.id))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    dispatch(commentBlog(blog.id, comment))
    setComment('')
  }

  if (!blog) return null

  return (
    <>
      <Typography variant="h3">{blog.title} by {blog.author}</Typography>
      <Paper className={classes.paper}>
        <a href={blog.url}>{blog.url}</a><br />
              likes {blog.likes}<Button variant="contained" size="small" onClick={handleLike} startIcon={<ThumbUpIcon />}>like</Button><br />
              user {blog.user.name}<br />
        <Button variant="contained" size="small" onClick={handleRemove} startIcon={<DeleteIcon />}>remove</Button>
        <h4>comments</h4>
        <form onSubmit={handleSubmit}>
          <TextField type="text"
            id="comment"
            value={comment}
            onChange={({ target }) => setComment(target.value)}
          />
          <Button variant="contained" size="small" type="submit">add comment</Button>
        </form>
        <ul>
          {blog.comments.map((comment, index) => (
            <li key={index}>{comment}</li>
          ))}
        </ul>
      </Paper>
    </>
  )
}

export default BlogDetail
