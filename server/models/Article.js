const mongoose = require('mongoose')
const Schema = mongoose.Schema

const articleSchema = new Schema({
    title: String,
    link: String,
    source: String,
    sourceREF: String,
    logo: String,
    summary: String,
    comments: Array
})

module.exports = mongoose.model('Article', articleSchema)