<script setup>
import { RouterView } from 'vue-router'
import TheFooter from '@/components/TheFooter.vue';
import TheHeader from '@/components/TheHeader.vue';
</script>

<template>
  <div class="h-screen flex flex-col">
    <TheHeader class="fixed w-full z-10"/>
    <main class="pt-10">
      <RouterView />
    </main>
    <TheFooter/>
  </div>
</template>

