import React from 'react'

const Contacts = ({persons}) => (
  <ul>
    {persons.map((contact) =>
      <li key={contact.name}>{contact.name}</li>
    )}
  </ul>
)

export default Contacts
