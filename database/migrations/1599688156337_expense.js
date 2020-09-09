'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ExpensesSchema extends Schema {
  up () {
    this.create('expenses', (table) => {
      table.increments()
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.date('due_date').notNullable()
      table.decimal('amount').notNullable()
      table.string('description', 255)
      table.string('category').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('expenses')
  }
}

module.exports = ExpensesSchema
