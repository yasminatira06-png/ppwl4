import { Elysia, t } from "elysia"
import { openapi } from "@elysiajs/openapi"

const app = new Elysia()
  .use(openapi())

  // Praktikum 6 - Global afterHandle
  .onAfterHandle(({ response }) => {
    return {
      success: true,
      message: "data tersedia",
      data: response
    }
  })

  // Praktikum 5
  .get(
    "/admin",
    () => {
      return {
        stats: 99
      }
    },
    {
      beforeHandle({ headers, set }) {
        if (headers.authorization !== "Bearer 123") {
          set.status = 401
          return {
            success: false,
            message: "Unauthorized"
          }
        }
      }
    }
  )

  // Endpoint product
  .get("/product", () => {
    return {
      id: 1,
      name: "Laptop"
    }
  })

 // praktikum 7
// Custom Validation Error
  .onError(({ code, set }) => {
    if (code === "VALIDATION") {
      set.status = 400
      return {
        success: false,
        error: "Validation Error"
      }
    }
  })

  // Endpoint login
  .post(
    "/login",
    ({ body }) => {
      return {
        message: "Login berhasil",
        email: body.email
      }
    },
    {
      body: t.Object({
        email: t.String({
          format: "email"
        }),
        password: t.String({
          minLength: 8
        })
      })
    }
  )


  .listen(3000)

console.log("Server running at http://localhost:3000")