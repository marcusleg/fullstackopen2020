import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import AddBlogForm from './AddBlogForm'

test.skip('adding new blog triggers the event handler', () => {
  const createBlog = jest.fn()

  const component = render(
    <AddBlogForm createBlog={createBlog} />
  )

  const titleInput = component.container.querySelector('input[name=Title]')
  fireEvent.change(titleInput, { target: { value: 'My Title' } })

  const authorInput = component.container.querySelector('input[name=Author]')
  fireEvent.change(authorInput, { target: { value: 'This Author' } })

  const urlInput = component.container.querySelector('input[name=URL]')
  fireEvent.change(urlInput, { target: { value: 'http://www,example.com' } })

  const form = component.container.querySelector('form')
  fireEvent.submit(form)

  expect(createBlog.mock.calls).toHaveLength(1)
})
