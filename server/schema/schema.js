
const graphql = require('graphql')
const _ = require('lodash')
const Article = require("../models/Article")
const Comment = require("../models/Comment")

const { 
    GraphQLID,
    GraphQLList,
    GraphQLObjectType, 
    GraphQLSchema, 
    GraphQLString 
} = graphql

//mongo "mongodb+srv://cluster0-q3cpb.mongodb.net/<dbname>" --username molemaster

//dummy data
// const articles = [
//     {title: 'Why Halo is Good', genre: 'Opinion', id:'1', commentIds: ['1', '2']},
//     {title: 'Why Halo is Bad and Why My Coworker is an Idiot With Bad Tastes', genre: 'Opinion', id:'2', commentIds: ['3']},
//     {title: 'Gamers Kinda Suck Sometimes', genre: 'FACTS', id:'3', commentIds: ['4']},
// ]
// const comments = [
//     {title: 'Comment 1', content: 'This guy gets it.', id:'1', articleId: '1'},
//     {title: 'Comment 2', content: 'Obvs bought off by Microsuuuck.', id:'2', articleId: '1'},
//     {title: 'Comment 3', content: 'Wow, so salty, tho.', id:'3', articleId: '2'},
//     {title: 'Comment 4', content: 'FACTS!', id:'4', articleId: '3'},
// ]

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
                // return _.filter(comments, { articleId: parent.id})
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
                // return _.find(articles, { id: parent.articleId})
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
                //code to grb data from db
                // return _.find(articles, { id: args.id })
            }
        },
        comment: {
            type:CommentType,
            args: {id: { type: GraphQLID }},
            resolve(parent, args){
                //code to grb data from db
                // return _.find(comments, { id: args.id })
            }
        },
        articles: {
            type: new GraphQLList(ArticleType),
            resolve(parent, arg){
                // return articles
            }
        },
        comments: {
            type: new GraphQLList(CommentType),
            resolve(parent, args) {
                // return comments
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
                title: { type: GraphQLString },
                link:  { type: GraphQLString },
                source:  { type: GraphQLString },
                sourceREF:  { type: GraphQLString },
                logo: { type: GraphQLString },
                summary:  { type: GraphQLString },
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
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})