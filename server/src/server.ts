import express from "express"
import cors from "cors"
import { PrismaClient } from "@prisma/client"

import { convertHourStringToMinutes, convertMinutesToHourString } from "./utils"

const app = express()

app.use(express.json())
app.use(cors())

const prisma = new PrismaClient({
  log: ["query"],
})

app.get("/games", async (request, response) => {
  const games = await prisma.game.findMany({
    include: {
      _count: {
        select: {
          ads: true,
        },
      },
    },
  })

  return response.json(games)
})

app.post("/games/:gameId/ads", async (request, response) => {
  const gameId = request.params.gameId
  const body = request.body

  // validação
  // zod javascript

  const ad = await prisma.ad.create({
    data: {
      ...body,
      weekDays: body.weekDays.join(","),
      hourStart: convertHourStringToMinutes(body.hourStart),
      hourEnd: convertHourStringToMinutes(body.hourEnd),
      gameId,
    },
  })

  return response.json(ad)
})

app.get("/games/:id/ads", async (request, response) => {
  const gameId = request.params.id

  const ads = await prisma.ad.findMany({
    select: {
      id: true,
      gameId: true,
      name: true,
      yearsPlaying: true,
      weekDays: true,
      hourStart: true,
      hourEnd: true,
      useVoiceChannel: true,
    },
    where: {
      gameId,
    },
    orderBy: {
      createdAt: "desc",
    },
  })

  return response.json(
    ads.map((ad) => ({
      ...ad,
      hourStart: convertMinutesToHourString(ad.hourStart),
      hourEnd: convertMinutesToHourString(ad.hourEnd),
      weekDays: ad.weekDays.split(","),
    }))
  )
})

app.get("/ads/:id/discord", async (request, response) => {
  const adId = request.params.id

  const ad = await prisma.ad.findUnique({
    select: {
      discord: true,
    },
    where: {
      id: adId,
    },
  })

  return response.json({
    discord: ad?.discord,
  })
})

app.listen(3333)
