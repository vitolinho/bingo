import jsPDF from 'jspdf'

export function generatePDF(randomBingoTray: number[][], filename: string) {
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'px',
    format: [600, 800]
  })
  const startX = 20
  const startY = 20
  const cellSize = 50

  for (let row = 0; row < randomBingoTray.length; row++) {
    for (let col = 0; col < randomBingoTray[row].length; col++) {
      const x = startX + col * cellSize
      const y = startY + row * cellSize
      pdf.rect(
        x,
        y,
        cellSize,
        cellSize
      )
      pdf.text(
        randomBingoTray[row][col].toString(),
        x + cellSize / 2,
        y + cellSize / 2,
        { align: 'center' }
      )
    }
  }

  pdf.save(filename)
}
