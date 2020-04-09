import React from 'react'

const Contacts = ({contacts}) => (
  <ul>
    {contacts.map((contact) =>
      <li key={contact.name}>{contact.name}</li>
    )}
  </ul>
)

export default Contacts
