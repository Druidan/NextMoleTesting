const graphql = require('graphql')
const _ = require('lodash')

const { 
    GraphQLID,
    GraphQLObjectType, 
    GraphQLSchema, 
    GraphQLString } = graphql

//dummy data
const articles = [
    {title: 'Why Halo is Good', genre: 'Opinion', id:'1'},
    {title: 'Why Halo is Bad and Why My Coworker is an Idiot With Bad Tastes', genre: 'Opinion', id:'2'},
    {title: 'Gamers Kinda Suck Sometimes', genre: 'FACTS', id:'3'},
]
const comments = [
    {title: 'Comment 1', content: 'This guy gets it.', id:'1'},
    {title: 'Comment 2', content: 'Obvs bought off by Microsuuuck.', id:'2'},
    {title: 'Comment 3', content: 'Wow, so salty, tho.', id:'3'},
    {title: 'Comment 4', content: 'FACTS!', id:'4'},
]

const ArticleType = new GraphQLObjectType({
    name: 'Article',
    fields: () => ({
        id: { type: graphql.GraphQLID },
        title: { type: GraphQLString },
        genre: { type: GraphQLString },
    })
})

const CommentType = new GraphQLObjectType({
    name: 'Comment',
    fields: () => ({
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        content: { type: GraphQLString },
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
                return _.find(articles, { id: args.id })
            }
        },
        comment: {
            type:CommentType,
            args: {id: { type: GraphQLID }},
            resolve(parent, args){
                //code to grb data from db
                return _.find(comments, { id: args.id })
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
})