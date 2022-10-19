import * as Select from "@radix-ui/react-select"
import { ChevronDownIcon, ChevronUpIcon } from "@radix-ui/react-icons"
import { useEffect, useState } from "react"
import { GameProps } from "../../App"
import axios from "axios"

export function StyledSelect() {
  const [games, setGames] = useState<GameProps[] | []>([])

  useEffect(() => {
    axios("http://localhost:3333/games")
      .then((response) => {
        setGames(response.data)
      })
      .catch((err) => console.log(err))
  }, [])

  return (
    <Select.Portal className="flex justify-between bg-zinc-900 py-3 px-4 rounded text-sm text-zinc-200">
      <Select.Content>
        <Select.ScrollUpButton>
          <ChevronUpIcon />
        </Select.ScrollUpButton>

        <Select.Viewport>
          <Select.Group className="flex flex-col gap-3">
            {games.map((game) => (
              <Select.Item
                key={game.id}
                className="cursor-pointer"
                value={game.id}
              >
                <Select.ItemText>{game.title}</Select.ItemText>
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Viewport>

        <Select.ScrollDownButton>
          <ChevronDownIcon />
        </Select.ScrollDownButton>
      </Select.Content>
    </Select.Portal>
  )
}
