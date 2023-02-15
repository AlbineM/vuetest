<script setup>
import { RouterView } from 'vue-router'
import TheFooter from '@/components/TheFooter.vue';
import TheHeader from '@/components/TheHeader.vue';
import BackToTop from './components/BackToTop.vue';
</script>

<template>
  <div class="h-screen flex flex-col">
    <div id="top"></div>
    <TheHeader class="fixed w-full z-10"/>
    <main class="pt-10">
      <RouterView />
      <BackToTop/>
    </main>
    <TheFooter/>
  </div>
</template>