"use strict"

class User {
  get rules() {
    return {
      // validation rules
      email: "required|email|unique:users",
      password: "required",
    }
  }

  get messages() {
    return {
      required: "Make sure to enter the field value",
      email: "invalid user email address",
    }
  }
}

module.exports = User
