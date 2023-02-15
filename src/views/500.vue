<script setup>
</script>

<template>
    <section class="flex flex-col text-center py-12">
        <h1 class="text-3xl font-bold text-dark-blue-800">500 Error</h1>
        <p class="text-dark-blue-800">Sorry, there is an internal servor error, please retry in a few minutes.</p>
        <router-link class="text-gray-600 underline hover:text-gray-800 font-medium" :to="{name: 'restaurants'}">Back to restaurants list</router-link>
    </section>
</template>