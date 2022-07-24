const { ApolloServer } = require('apollo-server')
const userSchema = require('./user/schema/user.graphql')

const typeDefs = [userSchema]
const resolvers = {}

const server = new ApolloServer({ typeDefs, resolvers })

server.listen().then(({ url }) => {
  console.log(`Servidor rodando em ${url}`)
})
