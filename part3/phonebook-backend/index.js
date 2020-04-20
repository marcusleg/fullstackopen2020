require('dotenv').config()
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
app.use(express.static('build'))
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

const Contact = require('./models/contact')

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.get('/api/contacts', (req, res) => {
  Contact.find({}).then(result => {
    res.json(result)
  })
})

app.post('/api/contacts', (req, res) => {
  if (!req.body || !req.body.name || !req.body.number) {
    return res.status(400).json({
      error: 'name or number missing'
    })
  }

  const contact = new Contact({...req.body})
  contact.save().then(savedContact => {
    res.json(savedContact.toJSON())
  })
})

app.delete('/api/contacts/:id', (req, res) => {
  Contact.deleteOne({ _id: req.params.id}).then(result => {
    res.status(204).end()
  })
})

app.get('/api/contacts/:id', (req, res) => {
  Contact.findById(req.params.id)
  .then(contact => {
    res.json(contact)
  })
  .catch(error => {
    res.status(404).end()
  })
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
