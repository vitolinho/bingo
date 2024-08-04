<script setup lang="ts">
import { Button } from '@/components/ui/button';

function handleClick(){
  alert('playing...')
}
</script>

<template>
  <div class="w-full h-screen flex justify-center items-center">
    <Button @click="handleClick">Play !</Button>
  </div>
</template>
