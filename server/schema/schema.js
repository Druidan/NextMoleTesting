const graphql = require('graphql')
const _ = require('lodash')

const { 
    GraphQLID,
    GraphQLList,
    GraphQLObjectType, 
    GraphQLSchema, 
    GraphQLString 
} = graphql

//dummy data
const articles = [
    {title: 'Why Halo is Good', genre: 'Opinion', id:'1', commentIds: ['1', '2']},
    {title: 'Why Halo is Bad and Why My Coworker is an Idiot With Bad Tastes', genre: 'Opinion', id:'2', commentIds: ['3']},
    {title: 'Gamers Kinda Suck Sometimes', genre: 'FACTS', id:'3', commentIds: ['4']},
]
const comments = [
    {title: 'Comment 1', content: 'This guy gets it.', id:'1', articleId: '1'},
    {title: 'Comment 2', content: 'Obvs bought off by Microsuuuck.', id:'2', articleId: '1'},
    {title: 'Comment 3', content: 'Wow, so salty, tho.', id:'3', articleId: '2'},
    {title: 'Comment 4', content: 'FACTS!', id:'4', articleId: '3'},
]

const ArticleType = new GraphQLObjectType({
    name: 'Article',
    fields: () => ({
        id: { type: graphql.GraphQLID },
        title: { type: GraphQLString },
        genre: { type: GraphQLString },
        comments: {
            type: new GraphQLList(CommentType),
            resolve(parent, args){
                return _.filter(comments, { articleId: parent.id})
            }
        }
    })
})

const CommentType = new GraphQLObjectType({
    name: 'Comment',
    fields: () => ({
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        content: { type: GraphQLString },
        article: {
            type: ArticleType,
            resolve(parent, args){
                return _.find(articles, { id: parent.articleId})
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