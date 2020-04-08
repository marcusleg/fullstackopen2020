import React from 'react'
import Part from './Part'

const Content = ({ course }) => (
  <ul>
    {course.parts.map(part => 
      <li key={part.id}>
        <Part name={part.name} exercises={part.exercises} />
      </li>
    )}
  </ul>
)

export default Content
