import * as ToggleGroup from "@radix-ui/react-toggle-group"

interface StyledToggleGroupProps {
  weekDays: string[]
  setWeekDays: React.Dispatch<React.SetStateAction<string[]>>
}

export function StyledToggleGroup({
  weekDays,
  setWeekDays,
}: StyledToggleGroupProps) {
  const getClassName = (weekValue: string) =>
    `h-8 rounded ${
      weekDays.includes(weekValue) ? "bg-violet-500" : "bg-zinc-900"
    }`

  return (
    <ToggleGroup.Root
      type="multiple"
      className="grid lg:grid-cols-4 grid-cols-7 lg:gap-2"
      onValueChange={setWeekDays}
      value={weekDays}
    >
      {[
        "Domingo",
        "Segunda",
        "Terça",
        "Quarta",
        "Quinta",
        "Sexta",
        "Sábado",
      ].map((item, index) => (
        <ToggleGroup.Item
          value={String(index)}
          title={item}
          className={getClassName(String(index))}
        >
          {item.substring(0, 3)}
        </ToggleGroup.Item>
      ))}
    </ToggleGroup.Root>
  )
}
