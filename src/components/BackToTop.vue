<template>
    <button type="button" class="fixed right-4 bottom-10 bg-teal-500 -rotate-90 rounded-full" @click="scrollToTop">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="11"/>
            <path d="M14.1 12.7H9.7V11.3h4.4l-2.7-2.7 1.4-1.4 4.7 4.7-4.7 4.7-1.4-1.4 2.7-2.7z" fill="white" />
        </svg>
    </button>
</template>

<script setup>
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
</script>