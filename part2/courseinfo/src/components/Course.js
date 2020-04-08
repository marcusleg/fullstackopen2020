import React from 'react'
import Header from './Header'
import Content from './Content'

const Course = ({ course }) => {
  const total = course.parts.reduce((s, p) => s + p.exercises, 0)
  return (
    <>
      <Header name={course.name} />
      <Content course={course} />
      <b>total of {total} exercises</b>
    </>
  )
}

export default Course
