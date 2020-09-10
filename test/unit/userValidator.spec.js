"use strict"

const { test } = use("Test/Suite")("UserValidator")
const { validate } = use("Validator")
const UserValidator = use("App/Validators/User")

test("validate user details", async ({ assert }) => {
  const validator = new UserValidator()
  const validation = await validate(
    {
      email: "wrong email",
    },
    validator.rules,
    validator.messages
  )

  assert.isTrue(validation.fails())
  assert.deepEqual(validation.messages(), [
    {
      field: "email",
      message: "invalid user email address",
      validation: "email",
    },
  ])
})
