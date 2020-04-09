import React, { useState } from 'react'
import Contacts from './components/Contacts'

const App = () => {
  const [ contacts, setContacts] = useState([
    {
      name: 'Arto Hellas',
      number: '040-1234567'
    }
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

  return (
    <div>
      <h2>Phonebook</h2>
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
      <Contacts contacts={contacts} />
    </div>
  )
}

export default App
