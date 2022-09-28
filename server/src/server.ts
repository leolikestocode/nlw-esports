import express from "express"

const app = express()

app.get("/", (request, response) =>
  response.json([
    {
      id: 1,
      name: "anuncio 1",
    },
  ])
)

app.listen(3333)
