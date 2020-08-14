const graphql = require('graphql')
const _ = require('lodash')

const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql

//dummy data
const articles = [
    {title: 'Why Halo is Good', genre: 'Opinion', id:'1'},
    {title: 'Why Halo is Bad and Why My Coworker is an Idiot With Bad Tastes', genre: 'Opinion', id:'2'},
    {title: 'Gamers Kinda Suck Sometimes', genre: 'FACTS', id:'3'},
]

const ArticleType = new GraphQLObjectType({
    name: 'Article',
    fields: () => ({
        id: { type: GraphQLString },
        title: { type: GraphQLString },
        genre: { type: GraphQLString },
    })
})

const CommentType = new GraphQLObjectType({
    name: 'Comment',
    fields: () => ({
        id: { type: GraphQLString },
        title: { type: GraphQLString },
        content: { type: GraphQLString },
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        article: {
            type: ArticleType,
            args: {id: {
                type: GraphQLString
            }},
            resolve(parent, args){
                //code to grb data from db
                return _.find(articles, { id: args.id })
            }
        },
        comment: {
            type:CommentType,
            args: {id: {
                type: GraphQLString
            }},
            resolve(parent, args){
                //code to grb data from db
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
})