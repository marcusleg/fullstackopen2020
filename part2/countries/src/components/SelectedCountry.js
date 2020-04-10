import React from 'react'
import Country from './Country'

const SelectedCountry = ({countries, selected}) => {
  if (selected === '') return <></>

  const selectedCountry = countries.find(country => country.name === selected)
  return <Country country={selectedCountry} />
}

export default SelectedCountry
