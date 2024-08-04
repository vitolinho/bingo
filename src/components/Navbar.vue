<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { isMobile, isTablet } from '@/utils/userAgent'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
const language = ref(localStorage.getItem('language') || 'en')

watch(language, (newLanguage) => {
  localStorage.setItem('language', newLanguage)
  window.location.reload()
})

onMounted(() => {
  const storedLanguage = localStorage.getItem('language')
  if (storedLanguage) {
    language.value = storedLanguage
  }
})

</script>

<template>
  <nav v-if="!isMobile && !isTablet" class="absolute top-0 w-full flex justify-between items-center px-5 py-10 backdrop-blur-md border-b border-neutral-300 md:px-20">
    <img src="../assets/logo.png" alt="logo" class="w-12">
    <div class="flex gap-5 items-center">
      <Select v-model="language">
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="fr">
              Français
            </SelectItem>
            <SelectItem value="en">
              English
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <RouterLink to="/" v-if="$route.fullPath === '/'" class="font-bold">{{ $t('navigation.home') }}</RouterLink>
      <RouterLink to="/" v-else>{{ $t('navigation.home') }}</RouterLink>
      <RouterLink to="/" v-if="$route.fullPath === '/generate-bingo-tray'" class="font-bold">{{ $t('navigation.generate') }}</RouterLink>
      <RouterLink v-else to="/generate-bingo-tray">{{ $t('navigation.generate') }}</RouterLink>
    </div>
  </nav>
</template>
