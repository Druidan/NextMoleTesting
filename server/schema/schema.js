
const graphql = require('graphql')
const _ = require('lodash')
const Article = require("../models/Article")
const Comment = require("../models/Comment")

const { 
    GraphQLID,
    GraphQLList,
    GraphQLNonNull,
    GraphQLObjectType, 
    GraphQLSchema, 
    GraphQLString 
} = graphql

const ArticleType = new GraphQLObjectType({
    name: 'Article',
    fields: () => ({
        id: { type: graphql.GraphQLID },
        title: { type: GraphQLString },
        link:  { type: GraphQLString },
        source:  { type: GraphQLString },
        logo: { type: GraphQLString },
        summary:  { type: GraphQLString },
        comments: {
            type: new GraphQLList(CommentType),
            resolve(parent, args){
                return Comment.find({articleId: parent.id})
            }
        }
    })
})

const CommentType = new GraphQLObjectType({
    name: 'Comment',
    fields: () => ({
        id: { type: GraphQLID },
        commentor: { type: GraphQLString },
        content: { type: GraphQLString },
        article: {
            type: ArticleType,
            resolve(parent, args){
                return Article.findById(parent.authorId)
            }
        }
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        article: {
            type: ArticleType,
            args: {id: { type: GraphQLID }},
            resolve(parent, args){
                // return _.find(articles, { id: args.id })
                return Article.findById(args.id)
            }
        },
        comment: {
            type:CommentType,
            args: {id: { type: GraphQLID }},
            resolve(parent, args){
                // return _.find(comments, { id: args.id })
                return Comment.findById(args.id)
            }
        },
        articles: {
            type: new GraphQLList(ArticleType),
            resolve(parent, arg){
                // return articles
                return Article.find({})
            }
        },
        comments: {
            type: new GraphQLList(CommentType),
            resolve(parent, args) {
                // return comments
                return Comment.find({})
            }
        }
    }
})

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addArticle:{
            type: ArticleType,
            args: {
                title: { type: new GraphQLNonNull(GraphQLString) },
                link:  { type: new GraphQLNonNull(GraphQLString) },
                source:  { type: new GraphQLNonNull(GraphQLString) },
                sourceREF:  { type: new GraphQLNonNull(GraphQLString) },
                logo: { type: new GraphQLNonNull(GraphQLString) },
                summary:  { type: new GraphQLNonNull(GraphQLString) },
            },
            resolve(parent, args){
                let article = new Article({
                    title: args.title,
                    link: args.link,
                    source: args.source,
                    sourceREF: args.sourceREF,
                    logo: args.logo,
                    summary: args.summary,
                })
                return article.save()
            }
        },
        addComment: {
            type: CommentType,
            args: {
                commentor: {type: new GraphQLNonNull(GraphQLString)},
                content: {type: new GraphQLNonNull(GraphQLString)},
                articleId: {type: new GraphQLNonNull(GraphQLID)}
            },
            resolve(parent, args) {
                let comment = new Comment({
                    commentor: args.commentor,
                    content: args.content,
                    articleId: args.articleId
                })
                return comment.save()
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})