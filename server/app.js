require("dotenv").config({
    path: `../.env.development`,
  })
const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const schema = require('./schema/schema')
const mongoose = require('mongoose')

const app = express()
const PORT = process.env.PORT || 2349


 
mongoose.connect(`${process.env.MONGODB_URI}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).catch()
mongoose.connection.once('open', () => {
    console.log('Connected to the database!')
})

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}))

app.listen(PORT,() => {
    console.log(`Ready to sail from port ${PORT}, captain!`)
})