"use strict"

class User {
  get rules() {
    return {
      // validation rules
      email: "required|email|unique:users",
      password: "required",
    }
  }
}

module.exports = User
