<script setup>
import { ref } from 'vue';

let isOpen = ref(false)
let options = ref([1,2,3,4])

const props = defineProps({
    dropdownTitle: String,
    price: Number,
    isOpen: Boolean
})

const emits = defineEmits([
    'update:price'
])

function updateDropdownState(state) {
    setTimeout(() => {
        isOpen.value = state;
    }, 300);
}

</script>

<template>
    <div class="relative">
        <button class="text-white bg-teal-700 hover:bg-teal-800 focus:ring-4 focus:outline-none focus:ring-teal-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-teal-600 dark:hover:bg-teal-700 dark:focus:ring-teal-800" type="button" @click="updateDropdownState(!isOpenRef)">
            {{ dropdownTitle }}
            <svg class="w-4 h-4 ml-2" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
        </button>
        
        <!-- Dropdown menu -->
        <div id="dropdown" :class="{'hidden' : !isOpen }" class="z-10 bg-white rounded-lg shadow flex flex-col w-24 dark:bg-teal-500 absolute">
            <ul v-if="options && Array.isArray(options)" v-for="option in options" :key="option" class="h-10 px-3 pb-3 overflow-y-auto text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownButton" aria-describedby="Price list">
                <li>
                    <div class="flex items-center pl-2 rounded hover:bg-teal-100 dark:hover:bg-teal-600">
                        <input type="radio" :checked="price === option" class="w-4 h-4 text-teal-600 bg-teal-100 border-teal-300 rounded focus:ring-teal-500 dark:focus:ring-teal-600 dark:ring-offset-teal-700 dark:focus:ring-offset-teal-700 focus:ring-2 dark:bg-teal-600 dark:border-teal-500" @click="emits('update:price', option)">
                        <label class="w-full py-2 ml-2 text-sm font-medium text-white"> {{'$'.repeat(option)}} </label>
                    </div>
                </li>
                <li v-if="options.length === 0">No result</li>
            </ul>
            <button class="bg-teal-200 text-teal-900 font-semibold  rounded-lg py-1 border-none box-border m-2" type="button" @click="updateDropdownState(false)">Validate</button>
        </div>
    </div>
    
</template>