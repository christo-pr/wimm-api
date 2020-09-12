"use strict"

const { test, trait, before, after } = use("Test/Suite")("Authentication")
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
})

test("[unauthenticated] * - API Routes should return an error", async ({
  client,
}) => {
  const response = await client.get(`${apiUrl}/expenses`).accept("json").end()

  response.assertStatus(401)
  response.assertJSON([
    {
      field: null,
      message: "Basic auth header is missing",
    },
  ])
})

test("[authenticated] * - API Routes should be accesible", async ({
  client,
}) => {
  const [email, password] = credentials.split(":")

  const response = await client
    .get(`${apiUrl}/expenses`)
    .loginVia(email, password, "basic")
    .accept("json")
    .end()

  response.assertStatus(200)
  response.assertJSON([])
})
