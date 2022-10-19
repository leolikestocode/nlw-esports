import * as Checkbox from '@radix-ui/react-checkbox'
import { Check } from 'phosphor-react'

interface StyledCheckboxProps {
  useVoiceChannel: boolean
  setUseVoiceChannel: React.Dispatch<React.SetStateAction<boolean>>
}

export function StyledCheckbox ({ useVoiceChannel, setUseVoiceChannel }: StyledCheckboxProps) {
  return (
    <label className='lg:mt-2 mt-0 flex items-center gap-2 text-sm'>
      <Checkbox.Root
        className='w-6 h-6 p-1 rounded bg-zinc-900'
        onCheckedChange={(checked) => {
          if (checked === true) {
            setUseVoiceChannel(true)
          } else {
            setUseVoiceChannel(false)
          }
        }}
        checked={useVoiceChannel}
      >
        <Checkbox.Indicator>
          <Check className='w-4 h-4 text-emerald-400' />
        </Checkbox.Indicator>
      </Checkbox.Root>
      Uso chat de voz
    </label>
  )
}
