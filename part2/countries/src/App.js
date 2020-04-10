import React, { useState, useEffect } from 'react';
import axios from 'axios'
import Filter from './components/Filter'
import FilteredCountries from './components/FilteredCountries';

function App() {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  return (
    <div>
      <Filter filter={filter} setFilter={setFilter} /><br />
      <FilteredCountries countries={countries} filter={filter} />
    </div>
  );
}

export default App;
