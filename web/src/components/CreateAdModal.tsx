import * as Dialog from "@radix-ui/react-dialog"
import * as Select from "@radix-ui/react-select"
import { ChevronDownIcon } from "@radix-ui/react-icons"
import { GameController } from "phosphor-react"
import { Input } from "./Form/Input"
import { StyledCheckbox } from "./Form/StyledCheckbox"
import { StyledSelect } from "./Form/StyledSelect"
import { StyledToggleGroup } from "./Form/StyledToggleGroup"
import { Dispatch, FormEvent, SetStateAction, useState } from "react"
import axios from "axios"

enum keyTranslation {
  discord = "Nome no discord",
  hourStart = "Horário de início",
  hourEnd = "Horário de término",
  name = "Seu nome ou nickname",
  weekDays = "Os dias da semana que você joga",
  yearsPlaying = "Há quantos anos você joga",
}

interface CreateAdModalProps {
  setOpen: Dispatch<SetStateAction<boolean>>
}

export default function CreateAdModal({ setOpen }: CreateAdModalProps) {
  const [weekDays, setWeekDays] = useState<string[]>([])
  const [useVoiceChannel, setUseVoiceChannel] = useState<boolean>(false)

  async function handleCreateAd(event: FormEvent) {
    event.preventDefault()

    const target = event.target as HTMLFormElement
    const formData = new FormData(target)
    const data = Object.fromEntries(formData)

    const reqData = {
      discord: data.discord,
      hourStart: data.hourStart,
      hourEnd: data.hourEnd,
      name: data.name,
      weekDays,
      yearsPlaying: Number(data.yearsPlaying),
      useVoiceChannel,
    }

    const nullItems: string[] = []

    Object.keys(reqData).forEach((key) => {
      if (key !== "weekDays" && key !== "useVoiceChannel") {
        if (!reqData[key]) {
          nullItems.push(key)
        }
      }
    })

    if (weekDays.length <= 0) {
      nullItems.push("weekDays")
    }

    if (nullItems.length > 0) {
      let message: string =
        "As seguintes informações precisam ser preenchidas: "

      nullItems.forEach((item, index) => {
        message += `${keyTranslation[item]}`
        message += index + 1 === nullItems.length ? "." : ", "
      })

      alert(message)
    }

    try {
      await axios.post(`http://localhost:3333/games/${data.game}/ads`, reqData)

      alert("Anúncio criado com sucesso!")

      setOpen(false)
    } catch (err) {
      alert(err)
    }
  }

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="bg-black/60 inset-0 fixed" />
      <Dialog.Content className="bg-[#2A2634] fixed py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg lg:w-[488px] w-[344px] shadow-lg shadow-black/25">
        <Dialog.Title className="lg:text-3xl text-2xl font-black">
          Publique um anúncio
        </Dialog.Title>

        <form
          onSubmit={handleCreateAd}
          className="lg:mt-8 mt-4 flex flex-col gap-4"
        >
          <div className="flex flex-col">
            <label htmlFor="game" className="font-semibold mb-2">
              Qual o game?
            </label>
            <Select.Root name="game">
              <Select.Trigger className="flex justify-between bg-zinc-900 py-3 px-4 rounded text-sm text-zinc-500">
                <Select.Value placeholder="Selecione o game" />
                <Select.Icon>
                  <ChevronDownIcon />
                </Select.Icon>
              </Select.Trigger>

              <StyledSelect />
            </Select.Root>
          </div>

          <div className="flex flex-col">
            <label htmlFor="name" className="mb-2">
              Seu nome (ou nickname)
            </label>
            <Input
              name="name"
              id="name"
              type="text"
              placeholder="Como te chamam dentro do game?"
            />
          </div>

          <div className="grid lg:grid-cols-2 grid-cols-1 lg:gap-6 gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="yearsPlaying">Joga há quantos anos?</label>
              <Input
                name="yearsPlaying"
                id="yearsPlaying"
                type="number"
                placeholder="Tudo bem ser ZERO"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="discord">Qual o seu discord?</label>
              <Input
                name="discord"
                id="discord"
                type="text"
                placeholder="Usuário#0000"
              />
            </div>
          </div>

          <div className="flex lg:flex-row flex-col lg:gap-6 gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="weekDays">Quando costuma jogar?</label>

              <StyledToggleGroup
                weekDays={weekDays}
                setWeekDays={setWeekDays}
              />
            </div>

            <div className="flex flex-col gap-2 flex-1">
              <label htmlFor="hourStart">Qual o horário do dia?</label>
              <div className="grid grid-cols-2 gap-2">
                <Input
                  name="hourStart"
                  id="hourStart"
                  type="time"
                  placeholder="De"
                />
                <Input
                  name="hourEnd"
                  id="hourEnd"
                  type="time"
                  placeholder="Até"
                />
              </div>
            </div>
          </div>

          <StyledCheckbox
            useVoiceChannel={useVoiceChannel}
            setUseVoiceChannel={setUseVoiceChannel}
          />

          <footer className="lg:mt-4 mt-0 flex lg:flex-row flex-col justify-end gap-4">
            <Dialog.Close className="bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600">
              Cancelar
            </Dialog.Close>
            <button
              type="submit"
              className="bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center justify-center gap-3 hover:bg-violet-600"
            >
              <GameController size={24} />
              Encontrar duo
            </button>
          </footer>
        </form>
      </Dialog.Content>
    </Dialog.Portal>
  )
}
