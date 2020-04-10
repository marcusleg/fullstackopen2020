import React from 'react'
import Country from './Country'

const FilteredCountries = ({countries, filter, setSelected}) => {
  const filteredCountries = countries.filter(country => country.name.toLowerCase().includes(filter.toLowerCase()))

  if (filter === "") return <></>
  else if (filteredCountries.length === 0) return <>No matches</>
  else if (filteredCountries.length === 1) return <Country country={filteredCountries[0]} />
  else if (filteredCountries.length > 10) return <>Too many matches. Please narrow down your search.</>

  console.log(filteredCountries)
  return (
    <>
      {filteredCountries.map(country =>
        <p>{country.name} <button type="button" onClick={() => setSelected(country.name)}>show</button></p>
      )}
    </>
  )
}

export default FilteredCountries
