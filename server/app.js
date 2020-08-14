const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const schema = require('./schema/schema')

const app = express()
const PORT = 2349

app.use('/graphql', graphqlHTTP({
    schema
}))

app.listen(PORT,() => {
    console.log(`Ready to sail from port ${PORT}, captain!`)
})