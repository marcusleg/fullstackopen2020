import React from 'react'
import phonebookService from '../services/phonebook'

const AddContactForm = ({contacts, setContacts, newName, setNewName, newNumber, setNewNumber}) => {
  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const addContact = (event) => {
    event.preventDefault()
    const newContact = {
      name: newName,
      number: newNumber
    }

    if (contacts.map(contact => contact.name).indexOf(newName) >= 0) {
      if (window.confirm(`${newContact.name} is already in the phonebook. Replace the old number with the new one?`)) {
        updateContact(newContact)
      }
      return
    }
    if (newName.length === 0) {
      alert(`please enter a name`)
      return
    }

    phonebookService.create(newContact)
      .then(response => setContacts(contacts.concat(response)))
      .catch(error => alert(`unable to add contact ${newContact.name} to the phonebook`))
    setNewName('')
    setNewNumber('')
  }

  const updateContact = (updatedContact) => {
    const id = contacts.find(contact => contact.name === updatedContact.name)['id']
    phonebookService.update(id, updatedContact).then(response => {
      setContacts(contacts.map(contact => contact.id !== id ? contact : response))
      setNewName('')
      setNewNumber('')
    })
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
