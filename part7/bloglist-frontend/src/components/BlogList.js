import React from 'react'
import { Link } from 'react-router-dom'
import { List, ListItem, ListItemIcon, ListItemText, Typography } from '@material-ui/core'
import ChromeReaderModeIcon from '@material-ui/icons/ChromeReaderMode';

const BlogList = ({ blogs }) => {
  return (
    <>
      <Typography variant="h3">blogs</Typography>
      <List dense>
      {blogs.map(blog =>
        <ListItem button component={Link} to={`/blogs/${blog.id}`}>
          <ListItemIcon>
            <ChromeReaderModeIcon />
          </ListItemIcon>
          <ListItemText primary={`${blog.title} by ${blog.author}`} />
        </ListItem>
        )}
      </List>
    </>
  )
}

export default BlogList
