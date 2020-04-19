const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log(`Syntax: node mongo.js <mongodb password>`)
  console.log(`Syntax: node mongo.js <mongodb password> <name> <number>`)
  process.exit(1)
}
const password = process.argv[2]
const url = `mongodb+srv://fullstackopen:${password}@cluster0-fup7y.mongodb.net/phonebook?retryWrites=true&w=majority`
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const contactSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Contact = mongoose.model('Contact', contactSchema)

if (process.argv.length === 5) {
  const contact = new Contact({
    name: process.argv[3],
    number: process.argv[4]
  })
  contact.save().then(response => {
    console.log('contact saved')
    mongoose.connection.close()
  })
} else {
  console.log('phonebook:')
  Contact.find({}).then(result => {
    result.forEach(contact => {
      console.log(`${contact.name} ${contact.number}`)
    })
    mongoose.connection.close()
  })
}

