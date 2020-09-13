"use strict"

const User = use("App/Models/User")
const Expense = use("App/Models/Expense")

const defaultUser = {
  email: "test@test.com",
  username: "testing",
  password: "testing123",
}

module.exports.baseApiUrl = "/api/v1"
module.exports.credentials = `${defaultUser.email}:${defaultUser.password}`

module.exports.setupDatabase = async () => {
  // Create a default user
  const user = await User.create(defaultUser)
}

module.exports.resetDatabase = async () => {
  // Delete all User
  await User.truncate()

  // Delete all expenses
  await Expense.truncate()
}
