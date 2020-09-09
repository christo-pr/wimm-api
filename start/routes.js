"use strict"

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use("Route")

Route.get("/", () => {
  return { ok: new Date().toISOString() }
})
/**
 * Auth Routes
 */
Route.group(() => {
  Route.post("register", "AuthController.register").validator("User")
}).prefix("auth/")

/**
 * API Routes
 */
Route.group(() => {
  Route.resource("users", "UserController").validator(
    new Map([[["users.store"], ["User"]]])
  )
  Route.resource("expenses", "ExpensesController")
})
  .prefix("api/v1")
  .middleware(["auth:basic"])

/**
 * 404 Route
 */
Route.any("*", ({ response }) =>
  response.status(404).json({ message: "Not found" })
)
