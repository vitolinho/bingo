<template>
  <nav class="absolute top-0 w-full flex justify-between items-center px-5 py-10 backdrop-blur-md border-b border-neutral-300 md:px-20">
    <img src="../assets/logo.png" alt="logo" class="w-12">
    <div class="flex gap-5">
      <RouterLink to="/" v-if="$route.fullPath === '/'" class="font-bold">Home</RouterLink>
      <RouterLink to="/" v-else>Home</RouterLink>
      <RouterLink to="/" v-if="$route.fullPath === '/generate-bingo-tray'" class="font-bold">Generate</RouterLink>
      <RouterLink v-else to="/generate-bingo-tray">Generate</RouterLink>
    </div>
  </nav>
</template>
