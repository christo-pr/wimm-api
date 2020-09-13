"use strict"

const User = use("App/Models/User")

class AuthController {
  /**
   * Register a new user.
   * POST auth/register
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async register({ request, response }) {
    const body = request.post()
    const user = await User.create(body)
    return response.status(201).json(user)
  }
}

module.exports = AuthController
