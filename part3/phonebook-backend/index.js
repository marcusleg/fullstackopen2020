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
  Contact.find({}).then(result => res.json(result))
})

app.post('/api/contacts', (req, res, next) => {
  const contact = new Contact({...req.body})
  contact.save()
    .then(savedContact => savedContact.toJSON())
    .then(savedAndFormattedContact => res.json(savedAndFormattedContact))
    .catch(error => next(error))
})

app.delete('/api/contacts/:id', (req, res, next) => {
  Contact.findByIdAndRemove(req.params.id)
    .then(result => res.status(204).end())
    .catch(error => next(error))
})

app.get('/api/contacts/:id', (req, res, next) => {
  Contact.findById(req.params.id)
  .then(contact => res.json(contact))
  .catch(error => next(error))
})

app.put('/api/contacts/:id', (req, res, next) => {
  const contact = {
    name: req.body.name,
    number: req.body.number
  }

  Contact.findByIdAndUpdate(req.params.id, contact, {new: true})
    .then(updatedContact => updatedContact.toJSON())
    .then(updatedAndFormattedContact => res.json(updatedAndFormattedContact))
    .catch(error => next(error))
})

app.get('/info', (req, res) => {
  const date = new Date()
  Contact.count({}).then(count => {
    res.send(`<p>Phonebook has info for ${count} people<p><p>${date}</p>`)
  })
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

// error handler
const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
