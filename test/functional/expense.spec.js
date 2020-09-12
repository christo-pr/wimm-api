"use strict"

const { test, trait, before, after } = use("Test/Suite")("Expense CRUD")
const Expense = use("App/Models/Expense")
const User = use("App/Models/User")

trait("Test/ApiClient")
trait("Auth/Client")

const apiUrl = "/api/v1"
const credentials = "test@test.com:testing123"

before(async () => {
  const [email, password] = credentials.split(":")
  await User.create({ email, password, username: "Test user" })
})

after(async () => {
  await User.truncate()
  await Expense.truncate()
})

test("GET - Should return a list of all expenses ", async ({ client }) => {
  const [email, password] = credentials.split(":")

  const response = await client
    .get(`${apiUrl}/expenses`)
    .loginVia(email, password, "basic")
    .accept("json")
    .end()

  response.assertStatus(200)
  response.assertJSON([])
})

test("POST - Should create a new expense ", async ({ client }) => {
  const [email, password] = credentials.split(":")

  const response = await client
    .post(`${apiUrl}/expenses`)
    .send({
      user_id: 1,
      due_date: new Date(),
      amount: 200,
      description: "tienda",
      category: "tarjeta",
    })
    .loginVia(email, password, "basic")
    .accept("json")
    .end()

  response.assertStatus(201)
  response.assertJSONSubset({
    id: 1,
    description: "tienda",
  })
})
