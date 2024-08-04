<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { GenerateRandomNumber, BALLS } from '../utils/number'
import { ShootConfettis } from '@/utils/confetti'
import { speak } from '@/utils/SpeechSynthesisUtterance'
import { isMobile, isTablet } from '@/utils/userAgent'

const gameStarted = ref(false)
const gameFinished = ref(false)
const randomNumber = ref(0)
const language = ref(localStorage.getItem('language') || 'en')
let intervalId: any = null
const usedNumbers = new Set<number>()

function startGame() {
  gameStarted.value = true
  if (intervalId) {
    clearInterval(intervalId)
  }
  nextNumber()
}

function nextNumber() {
  if(usedNumbers.size >= BALLS) return
  let newNumber: number
  do {
    newNumber = GenerateRandomNumber()
  } while (usedNumbers.has(newNumber))
  randomNumber.value = newNumber
  usedNumbers.add(newNumber)
  const speakLanguage = language.value === 'en' ? 'en-US' : 'fr-FR'
  speak(String(randomNumber.value), speakLanguage, () => {
    if (gameStarted.value && !gameFinished.value) {
      intervalId = setTimeout(nextNumber, 1000)
    }
  })
}

function QuitGame() {
  gameStarted.value = false
  gameFinished.value = false
  randomNumber.value = 0
  usedNumbers.clear()
  if (intervalId) {
    clearInterval(intervalId)
    intervalId = null
  }
}

function RestartGame() {
  gameFinished.value = false
  usedNumbers.clear()
  startGame()
}

function handleKeyPress(event: KeyboardEvent) {
  if(event.code === 'Space' && !gameFinished.value && gameStarted.value) {
    gameFinished.value = true
    ShootConfettis()
    if (intervalId) {
      clearInterval(intervalId)
      intervalId = null
    }
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeyPress)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyPress)
  if (intervalId) {
    clearInterval(intervalId)
  }
})

watch(language, (newLanguage) => {
  localStorage.setItem('language', newLanguage)
})
</script>

<template>
  <p v-if="isMobile || isTablet" class="w-full h-screen flex justify-center items-center">This website is not available for mobiles or tablets.</p>
  <div v-else class="w-full h-screen flex justify-center items-center">
    <Button v-if="!gameStarted" @click="startGame">{{ $t('home.play') }}</Button>
    <div v-if="gameStarted && randomNumber !== 0 && !gameFinished && usedNumbers.size !== BALLS" class="flex flex-col items-center gap-5">
      <p class="text-9xl font-bold">{{ randomNumber }}</p>
      <Label>{{ $t('home.label') }}</Label>
    </div>
    <div v-if="gameFinished || usedNumbers.size >= BALLS" class="flex flex-col gap-20 w-full justify-center items-center">
      <p v-if="gameFinished" class="text-6xl font-bold uppercase">BINGO</p>
      <p v-else-if="usedNumbers.size >= BALLS" class="text-6xl font-bold uppercase">{{ $t('home.gameOverTitle') }}</p>
      <div class="flex flex-col gap-5">
        <Button @click="RestartGame" variant="default">{{ $t('home.restart') }}</Button>
        <Button @click="QuitGame" variant="secondary">{{ $t('home.quit') }}</Button>
      </div>
    </div>
  </div>
</template>
