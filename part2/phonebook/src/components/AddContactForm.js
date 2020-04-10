import React from 'react'
import phonebookService from '../services/phonebook'

const AddContactForm = ({contacts, setContacts, newName, setNewName, newNumber, setNewNumber}) => {
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
    phonebookService.create(newContact)
      .then(response => setContacts(contacts.concat(response)))
      .catch(error => alert(`unable to add contact ${newContact.name} to the phonebook`))
    setNewName('')
    setNewNumber('')
  }

  return (
    <form onSubmit={addContact}>
      <div>
        name: <input value={newName} onChange={handleNameChange} /><br />
        number: <input value={newNumber} onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default AddContactForm
