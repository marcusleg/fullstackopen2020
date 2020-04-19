const express = require('express')
const app = express()

let contacts = [
  {
    "name": "Arto Hellas",
    "number": "040-123456",
    "id": 1
  },
  {
    "name": "Ada Lovelace",
    "number": "39-44-5323523",
    "id": 2
  },
  {
    "name": "Dan Abramov",
    "number": "12-43-234345",
    "id": 3
  },
  {
    "name": "Mary Poppendieck",
    "number": "39-23-6423122",
    "id": 4
  }
]

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.get('/api/contacts', (req, res) => {
  res.json(contacts)
})

app.delete('/api/contacts/:id', (req, res) => {
  const id = Number(req.params.id)
  contacts = contacts.filter(contact => contact.id !== id)

  res.status(204).end()
})

app.get('/api/contacts/:id', (req, res) => {
  const id = Number(req.params.id)
  const contact = contacts.find(contact => contact.id === id)

  if (contact) {
    res.json(contact)
  } else {
    res.status(404).end()
  }
})

app.get('/info', (req, res) => {
  const date = new Date()
  res.send(`<p>Phonebook has info for ${contacts.length} people<p><p>${date}</p>`)
})

// redirects for specification compatibility
app.get('/api/persons', (req, res) => {
  res.redirect(301, '/api/contacts')
})

app.get('/api/persons/:id', (req, res) => {
  res.redirect(301, `/api/contacts/${req.params.id}`)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
