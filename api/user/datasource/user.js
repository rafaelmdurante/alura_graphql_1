const { RESTDataSource } = require('apollo-datasource-rest')

class UsersAPI extends RESTDataSource {
  constructor() {
    super()
    this.baseURL = 'http://localhost:3000'
    this.customResponse = {
      code: 200,
      mensagem: 'Operação realizada com sucesso'
    }
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

  async adicionaUser(user) {
    // simulate incremental ID as data is just mocked
    const users = await this.get('/users')
    user.id = users.length + 1

    const roles = await this.get(`/roles?type=${user.role}`)
    const role = roles[0]

    await this.post('users', { ...user, role: role.id })

    return { ...user, role }
  }

  async atualizaUser(updatedUser) {
    const roles = await this.get(`/roles?type=${updatedUser.role}`)
    const role = roles[0]

    const user = await this.get(`/users/${updatedUser.id}`)
    const createdAt = user.createdAt ?? undefined

    await this.put(`users/${updatedUser.id}`,
      { ...updatedUser, role: role.id, createdAt }
    )

    return { ...this.customResponse, user: { ...updatedUser, role } }
  }

  async apagaUser(id) {
    await this.delete(`users/${id}`)

    return this.customResponse
  }
}

module.exports = UsersAPI