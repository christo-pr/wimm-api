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
   * @param {View} ctx.view
   */
  async register({ request, response, view }) {
    const body = request.post()
    const user = await User.create({})
  }
}

module.exports = AuthController
