const userResolvers = {
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
    adicionaUser: async (root, user, { dataSources }) =>
      dataSources.usersAPI.adicionaUser(user)
  }
}

module.exports = userResolvers

