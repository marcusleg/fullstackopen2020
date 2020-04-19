const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

morgan.token('body', function (req, res) {
  if (req.method === 'POST') {
    return JSON.stringify(req.body)
  }
  return ''
})

const app = express()

app.use(cors())
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

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

app.post('/api/contacts', (req, res) => {
  if (!req.body || !req.body.name || !req.body.number) {
    return res.status(400).json({
      error: 'name or number missing'
    })
  }

  if (contacts.find(contact => contact.name === req.body.name)) {
    return res.status(400).json({
      error: 'name already exists in the phonebook'
    })
  }

  const id = Math.floor(Math.random() * 2147483648)
  const contact = { ...req.body, id}
  contacts = contacts.concat(contact)
  res.json(contact)
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

app.post('/api/persons', (req, res) => {
  res.redirect(308, '/api/contacts')
})

app.delete('/api/persons/:id', (req, res) => {
  res.redirect(308, `/api/contacts/${req.params.id}`)
})

app.get('/api/persons/:id', (req, res) => {
  res.redirect(301, `/api/contacts/${req.params.id}`)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
