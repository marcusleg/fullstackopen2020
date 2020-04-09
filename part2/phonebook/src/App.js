import React, { useState } from 'react'
import Contacts from './components/Contacts'

const App = () => {
  const [ contacts, setContacts] = useState([
    { name: 'Arto Hellas' }
  ])
  const [ newName, setNewName ] = useState('')

  const handleNameChange = (event) => setNewName(event.target.value)
  const addContact = (event) => {
    event.preventDefault()
    const newContact = {name: newName}
    setContacts(contacts.concat(newContact))
    setNewName('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addContact}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
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
