export function GenerateRandomNumber(): number {
  return Math.floor(Math.random() * 99)
}

export function GenerateRandomBingoTray(): number[][] {
  const usedNumbers = new Set<number>()
  const tray: number[][] = []
  for (let row = 0; row < 5; row++) {
    const newRow: number[] = []
    for (let col = 0; col < 5; col++) {
      let newNumber: number
      do {
        newNumber = GenerateRandomNumber()
      } while (usedNumbers.has(newNumber))
      usedNumbers.add(newNumber)
      newRow.push(newNumber)
    }
    tray.push(newRow)
  }
  return tray
}
