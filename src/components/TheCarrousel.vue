<script setup>
import { ref, onMounted } from 'vue'
const props = defineProps({
    images: Array
})
let currentIndex = ref(0)
let imagesLength = ref(0)

function previousImage() {
    currentIndex.value = currentIndex.value - 1 < 0 ? props.images.length - 1 : currentIndex.value - 1;
}
function nextImage() {
    currentIndex.value = (currentIndex.value + 1) % props.images.length;
}


onMounted(()=> {
    imagesLength.value = props?.images?.value?.length
    console.log(props?.images)
})
</script>

<template>
    <div class="relative flex justify-center align-center mx-auto my-4 h-60 sm:h-80 ">
        <button @click="previousImage" class="bg-gray-800 text-white w-8 h-8 flex rounded-full rotate-90 items-center justify-center absolute -left-12 bottom-1/2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M4.293 8.293a1 1 0 011.414 0L10 12.586l4.293-4.293a1 1 0 111.414 1.414l-5 5a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
        </button>
        <button @click="nextImage" class="bg-gray-800 rotate-90 text-white w-8 h-8 rounded-full flex items-center justify-center absolute -right-12 bottom-1/2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M15.707 11.707a1 1 0 01-1.414 0L10 7.414l-4.293 4.293a1 1 0 11-1.414-1.414l5-5a1 1 0 011.414 0l5 5a1 1 0 010 1.414z" clip-rule="evenodd" />
            </svg>
        </button>
        
        <img :src="props.images[currentIndex]" class="w-60 sm:w-3/4  object-scale-down transition-transform duration-500" alt="image from the restaurant">
    </div>
    
</template>

