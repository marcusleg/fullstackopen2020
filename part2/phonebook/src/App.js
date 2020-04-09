import React, { useState } from 'react'
import Contacts from './components/Contacts'

const App = () => {
  const [ filter, setFilter] = useState('')
  const [ contacts, setContacts] = useState([
    {
      name: 'Arto Hellas',
      number: '040-1234567'
    }
  ])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')

  const handleFilterChange = (event) => setFilter(event.target.value)
  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const addContact = (event) => {
    if (contacts.map(contact => contact.name).indexOf(newName) >= 0) {
      alert(`${newName} is already added to phonebook`)
      return
    }
    if (newName.length === 0) {
      alert(`please enter a name`)
      return
    }

    event.preventDefault()
    const newContact = {
      name: newName,
      number: newNumber
    }
    setContacts(contacts.concat(newContact))
    setNewName('')
    setNewNumber('')
  }

  const filteredContacts = contacts.filter(contact => contact.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      search contacts <input value={filter} onChange={handleFilterChange} /> (leave empty to show all contacts)
      <h2>Add new contact</h2>
      <form onSubmit={addContact}>
        <div>
          name: <input value={newName} onChange={handleNameChange} /><br />
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Contacts contacts={filteredContacts} />
    </div>
  )
}

export default App
