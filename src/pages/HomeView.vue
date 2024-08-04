<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { Button } from '@/components/ui/button'
import { GenerateRandomNumber } from '../utils/number'
import { ShootConfettis } from '@/utils/confetti'
import { speak } from '@/utils/SpeechSynthesisUtterance'
import { isMobile, isTablet } from '@/utils/userAgent'

const gameStarted = ref(false)
const gameFinished = ref(false)
const randomNumber = ref(0)
const language = ref(localStorage.getItem('language') || 'english')
let intervalId: any = null

function startGame() {
  gameStarted.value = true
  if (intervalId) {
    clearInterval(intervalId)
  }
  nextNumber()
}

function nextNumber() {
  randomNumber.value = GenerateRandomNumber()
  const speakLanguage = language.value === 'english' ? 'en-US' : 'fr-FR'
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
  if (intervalId) {
    clearInterval(intervalId)
    intervalId = null
  }
}

function RestartGame() {
  gameFinished.value = false
  startGame()
}

function handleKeyPress(event: KeyboardEvent) {
  if(event.code === 'Space' && !gameFinished.value) {
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
    <Button v-if="!gameStarted" @click="startGame">Play !</Button>
    <p v-if="gameStarted && randomNumber !== 0 && !gameFinished" class="text-9xl font-bold">{{ randomNumber }}</p>
    <div v-if="gameFinished" class="flex flex-col gap-20 w-full justify-center items-center">
      <p class="text-6xl font-bold uppercase">BINGO</p>
      <div class="flex flex-col gap-5">
        <Button @click="RestartGame" variant="default">Restart Game</Button>
        <Button @click="QuitGame" variant="secondary">Quit Game</Button>
      </div>
    </div>
  </div>
</template>
