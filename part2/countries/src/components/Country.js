import React from 'react'

const Country = ({country}) => (
  <div>
    <h2>{country.name}</h2>
    capital {country.capital}<br />
    population {country.population}<br />

    <h3>languages</h3>
    <ul>
      {country.languages.map(language =>
        <li key={language.iso639_2}>{language.name}</li>
      )}
    </ul>
    <img src={country.flag} width="240" height="160" alt={country.name} />
  </div>
)

export default Country
