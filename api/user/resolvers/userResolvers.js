const users = [
  {
    nome: 'John',
    ativo: true
  },
  {
    nome: 'Jane',
    ativo: true
  }
]

const userResolvers = {
  Query: {
    users: () => users,
    primeiroUser: () => users[0]
  }
}

module.exports = userResolvers

