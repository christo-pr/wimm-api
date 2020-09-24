"use strict"

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema")

class MonthlyPaymentSchema extends Schema {
  up() {
    this.create("monthly_payments", (table) => {
      table.increments()
      table.integer("user_id").unsigned().references("id").inTable("users")
      table.decimal("amount").notNullable()
      table.string("description", 255)
      table.timestamps()
    })
  }

  down() {
    this.drop("monthly_payments")
  }
}

module.exports = MonthlyPaymentSchema
