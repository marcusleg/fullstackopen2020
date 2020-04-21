import React from 'react'

const Filter = ({filter, setFilter}) => {
  const handleFilterChange = (event) => setFilter(event.target.value)
  return (
    <>
      search contacts <input value={filter} onChange={handleFilterChange} /> (leave empty to show all contacts)<br />
    </>
  )
}

export default Filter
