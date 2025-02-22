const { GraphQLScalarType } = require('graphql')

const userResolvers = {
  RoleType: {
    COORDENACAO: "COORDENACAO",
    DOCENTE: "DOCENTE",
    ESTUDANTE: "ESTUDANTE",
  },
  DateTime: new GraphQLScalarType({
    name: 'DateTime',
    description: 'string de data e hora no formato ISO-8601',
    serialize: (date) => date.toISOString(),
    parseValue: (dateString) => new Date(dateString),
    parseLiteral: (abstractSyntaxTree) => new Date(abstractSyntaxTree.value)
  }),
  Query: {
    // root is the parent node, context contains the {dataSources} and info 
    // contains everything the resolver needs to work
    users: (root, args, context, info) => {
      // The name of the fields 'nome', 'ativo' etc match the result, so there's
      // no reason to add resolvers to the downstream fields.
      return context.dataSources.usersAPI.getUsers()
    },
    user: (root, { id }, { dataSources }) =>
      dataSources.usersAPI.getUserById(id)
  },
  Mutation: {
    adicionaUser: async (root, { user }, { dataSources }) => {
      return dataSources.usersAPI.adicionaUser(user)
    },
    atualizaUser: async (root, updatedData, { dataSources }) => {
      const id = updatedData.id
      return dataSources.usersAPI.atualizaUser({ id, ...updatedData.user })
    },
    apagaUser: async (root, { id }, { dataSources }) => {
      return dataSources.usersAPI.apagaUser(id)
    }
  }
}

module.exports = userResolvers

