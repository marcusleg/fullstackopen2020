import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    user: 'Henry Ford',
    likes: 13,
    author: 'Bob Ross',
    title: 'The Joy of Painting',
    url: 'http://example.org',
  }

  const component = render(
    <Blog blog={blog} />
  )

  expect(component.container).toHaveTextContent(
    'The Joy of Painting by Bob Ross'
  )
  expect(component.container).not.toHaveTextContent(
    'likes 13'
  )
  expect(component.container).not.toHaveTextContent(
    'http://example.org'
  )
  expect(component.container).not.toHaveTextContent(
    'user Henry Ford'
  )
})
