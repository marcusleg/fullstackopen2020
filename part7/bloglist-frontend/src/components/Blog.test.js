import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

const exampleBlog = {
  user: {
    name: 'Henry Ford',
  },
  likes: 13,
  author: 'Bob Ross',
  title: 'The Joy of Painting',
  url: 'http://example.org',
}

test('renders basic content at first', () => {
  const component = render(
    <Blog blog={exampleBlog} />
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

test('renders detailed content when "show" button is clicked', () => {
  const component = render(
    <Blog blog={exampleBlog} />
  )

  const button = component.getByText('view')
  fireEvent.click(button)

  expect(component.container).toHaveTextContent(
    'The Joy of Painting by Bob Ross'
  )
  expect(component.container).toHaveTextContent(
    'likes 13'
  )
  expect(component.container).toHaveTextContent(
    'http://example.org'
  )
  expect(component.container).toHaveTextContent(
    'user Henry Ford'
  )
})

test('clicking the like button calls like handler', () => {
  const mockUpdate = jest.fn()
  mockUpdate.mockReturnValue({
    ...exampleBlog,
    likes: exampleBlog.likes + 2,
  })

  const component = render(
    <Blog blog={exampleBlog} updateBlog={mockUpdate} />
  )

  const viewButton = component.getByText('view')
  fireEvent.click(viewButton)

  const likeButton = component.getByText('like')
  fireEvent.click(likeButton)
  fireEvent.click(likeButton)

  expect(mockUpdate.mock.calls).toHaveLength(2)
})
