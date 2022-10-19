import { useState, useEffect } from "react"
import * as Dialog from "@radix-ui/react-dialog"

import GameBanner from "./components/GameBanner"
import "./styles/main.css"
import logoImg from "./assets/logo-nlw-esports.png"
import CreateAdBanner from "./components/CreateAdBanner"
import CreateAdModal from "./components/CreateAdModal"

export interface GameProps {
  id: string
  title: string
  bannerUrl: string
  _count: {
    ads: number
  }
}

function App() {
  const [open, setOpen] = useState<boolean>(false)
  const [games, setGames] = useState<GameProps[]>([])

  useEffect(() => {
    fetch("http://localhost:3333/games")
      .then((r) => r.json())
      .then((res) => setGames(res))
  }, [])

  return (
    <div className="max-w-[1344px] mx-auto flex flex-col items-center my-20">
      <img src={logoImg} alt="logo" />

      <h1 className="text-6xl text-white font-black mt-20">
        Seu <span className="text-transparent bg-nlw-gradient bg-clip-text">duo</span> está aqui.
      </h1>

      <div className="grid grid-cols-6 gap-6 mt-16">
        {games.map((game) => (
          <GameBanner
            key={game.id}
            title={game.title}
            bannerUrl={game.bannerUrl}
            adsCount={game._count.ads}
          />
        ))}
      </div>

      <Dialog.Root open={open} onOpenChange={setOpen}>
        <CreateAdBanner />

        <CreateAdModal setOpen={setOpen} />
      </Dialog.Root>
    </div>
  )
}

export default App
