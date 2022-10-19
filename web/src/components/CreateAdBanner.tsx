import { MagnifyingGlassPlus } from "phosphor-react"
import * as Dialog from "@radix-ui/react-dialog"

export default function CreateAdBanner() {
  return (
    <div className="pt-2 mt-8 lg:max-w-[80%] max-w-[90%] bg-nlw-gradient self-stretch rounded-lg overflow-hidden mx-auto">
      <div className="bg-[#2A2634] lg:min-w-[1000px] px-8 py-6 self-stretch flex flex-col lg:gap-0 gap-4 lg:flex-row justify-between items-center">
        <div>
          <strong className="text-2xl text-white font-black block">Não encontrou seu duo?</strong>
          <span className="text-zinc-400 block">
            Publique um anúncio para encontrar novos players!
          </span>
        </div>

        <Dialog.Trigger className="py-3 px-4 bg-violet-500 text-white rounded hover:bg-violet-700 flex items-center gap-3">
          <MagnifyingGlassPlus size={24} />
          Publicar anúncio
        </Dialog.Trigger>
      </div>
    </div>
  )
}
