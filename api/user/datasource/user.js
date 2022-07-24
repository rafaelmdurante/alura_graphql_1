const { RESTDataSource } = require('apollo-datasource-rest')

class UsersAPI extends RESTDataSource {
  constructor() {
    super()
    this.baseURL = 'http://localhost:3000'
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