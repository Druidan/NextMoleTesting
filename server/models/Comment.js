const mongoose = require('mongoose')
const Schema = mongoose.Schema

const commentSchema = new Schema({
    commentor: String,
    content: String,
    articleId: String
})

module.exports = mongoose.model('Comment', commentSchema)