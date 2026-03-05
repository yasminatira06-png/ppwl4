import { Elysia, t } from "elysia"
import { openapi } from "@elysiajs/openapi"

const app = new Elysia()
.use(openapi())

//praktikum1
.post("/request",
({ body }) => {
  return {
    message: "Success",
    data: body
  }
},
{
  body: t.Object({
    name: t.String({ minLength: 3 }),
    email: t.String({ format: "email" }),
    age: t.Number({ minimum: 18 })
  })
})

//praktikum2
  .get(
    "/products/:id",
    ({ params, query }) => {
      return {
        id: params.id,
        sort: query.sort
      }
    },
    {
      params: t.Object({
        id: t.Number()
      }),
      query: t.Object({
        sort: t.Enum({ asc: "asc", desc: "desc" })
      })
    }
  )

.listen(3000)

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);
