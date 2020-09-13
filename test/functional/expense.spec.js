"use strict"

const { test, trait, before, after } = use("Test/Suite")("Expense CRUD")
const {
  setupDatabase,
  resetDatabase,
  credentials,
  baseApiUrl,
} = require("../testSetup")

trait("Test/ApiClient")
trait("Auth/Client")

before(async () => {
  await setupDatabase()
})

after(async () => {
  await resetDatabase()
})

test("GET - Should return a list of all expenses ", async ({ client }) => {
  const [email, password] = credentials.split(":")

  const response = await client
    .get(`${baseApiUrl}/expenses`)
    .loginVia(email, password, "basic")
    .accept("json")
    .end()

  response.assertStatus(200)
  response.assertJSON([])
})

test("POST - Should create a new expense ", async ({ client }) => {
  const [email, password] = credentials.split(":")

  const response = await client
    .post(`${baseApiUrl}/expenses`)
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
