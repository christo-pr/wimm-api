"use strict"

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model")

class Expense extends Model {
  // Append the custom date field
  static get dates() {
    return super.dates.concat(["due_date"])
  }

  // Format the date before store in it in the database
  static formatDates(field, value) {
    if (field === "due_date") {
      return value.format("YYYY-MM-DD")
    }
    return super.formatDates(field, value)
  }
}

module.exports = Expense
