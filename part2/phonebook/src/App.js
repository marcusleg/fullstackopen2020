import React, { useState, useEffect } from 'react'
import axios from 'axios'
import AddContactForm from './components/AddContactForm'
import Contacts from './components/Contacts'
import Filter from './components/Filter'

const App = () => {
  const [ filter, setFilter] = useState('')
  const [ contacts, setContacts] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/contacts')
      .then(response => {
        setContacts(response.data)
      })
  }, [])

  const filteredContacts = contacts.filter(contact => contact.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} setFilter={setFilter} />
      <h2>Add new contact</h2>
      <AddContactForm contacts={contacts} setContacts={setContacts} newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber} />
      <h2>Numbers</h2>
      <Contacts contacts={filteredContacts} />
    </div>
  )
}

export default App
