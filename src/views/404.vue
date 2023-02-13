<script setup>
</script>

<template>
    <section class="flex flex-col text-center py-12">
        <h1 class="text-3xl font-bold text-dark-blue-800">404 Error</h1>
        <p class="text-dark-blue-800">Sorry, the page you tried to reach has not been found.</p>
        <router-link class="text-gray-600 underline hover:text-gray-800 font-medium" :to="{name: 'restaurants'}">Back to restaurants list</router-link>
    </section>
</template>