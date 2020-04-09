import React, { useState } from 'react'
import Contacts from './components/Contacts'
import Filter from './components/Filter'

const App = () => {
  const [ filter, setFilter] = useState('')
  const [ contacts, setContacts] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')

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
      <Filter filter={filter} setFilter={setFilter} />
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
