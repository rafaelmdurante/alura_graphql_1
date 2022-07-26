const { RESTDataSource } = require('apollo-datasource-rest')

class UsersAPI extends RESTDataSource {
  constructor() {
    super()
    this.baseURL = 'http://localhost:3000'
  }

  async adicionaUser(user) {
    // simulate incremental ID as data is just mocked
    const users = await this.get('/users')
    user.id = users.length + 1

    const roles = await this.get(`/roles?type=${user.role}`)
    const role = roles[0]

    await this.post('users', { ...user, role: role.id })

    return { ...user, role }
  }

  async getUsers() {
    const users = await this.get('/users')

    return users.map(async user => Object.assign({
      ...user,
      role: await this._getRoleById(user.role)
    }))
  }

  async getUserById(id) {
    const user = await this.get(`/users/${id}`)

    return Object.assign({
      ...user,
      role: await this._getRoleById(user.role)
    })
  }

  async _getRoleById(id) {
    return await this.get(`/roles/${id}`)
  }
}

module.exports = UsersAPI