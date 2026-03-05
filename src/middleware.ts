import { Elysia } from "elysia"
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
 // Assignment Route
.get("/user", () => {
  return {
    id: 1,
    name: "Atira",
    role: "admin"
  }
})

.get("/user/:id", ({ params }) => {
  return {
    message: "detail user",
    id: params.id
  }
})

  .listen(3000)

console.log("Server running at http://localhost:3000")