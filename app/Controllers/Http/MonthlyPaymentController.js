"use strict"

const MonthlyPayment = use("App/Models/Expense")

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with monthlypayments
 */
class MonthlyPaymentController {
  /**
   * Show a list of all monthlypayments.
   * GET monthlypayments
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ response, auth }) {
    const payments = await auth.user.monthlyPayments().fetch()
    return response.json(payments)
  }

  /**
   * Create/save a new monthlypayment.
   * POST monthlypayments
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response, auth }) {
    const payment = await auth.user.monthlyPayments().create(request.post())
    return response.status(201).json(payment)
  }

  /**
   * Display a single monthlypayment.
   * GET monthlypayments/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {}

  /**
   * Update monthlypayment details.
   * PUT or PATCH monthlypayments/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
    const payment = await MonthlyPayment.find(params.id)

    payment.merge(request.post())
    await payment.save()

    return response.status(200).json(payment)
  }

  /**
   * Delete a monthlypayment with id.
   * DELETE monthlypayments/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, response }) {
    await MonthlyPayment.query().where("id", params.id).delete()

    return response.status(202).json({ ok: "success" })
  }
}

module.exports = MonthlyPaymentController
