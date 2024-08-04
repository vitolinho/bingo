export function speak(text: string, lang: string, onEnd: () => void) {
  let utterance = new SpeechSynthesisUtterance(text)
  utterance.lang = lang
  utterance.onend = onEnd
  speechSynthesis.speak(utterance)
}
