export function convertHourStringToMinutes(hourString: string) {
  const [hour, minute] = hourString.split(":").map(Number)

  const minutesAmout = hour * 60 + minute

  return minutesAmout
}

export function convertMinutesToHourString(minutes: number) {
  const remainingMinutes = minutes % 60
  const hour = (minutes - remainingMinutes) / 60

  return `${addLeftZeroToNumber(hour)}:${addLeftZeroToNumber(remainingMinutes)}`
}

function addLeftZeroToNumber(number: number) {
  return String(number).length === 1 ? `0${number}` : number
}
