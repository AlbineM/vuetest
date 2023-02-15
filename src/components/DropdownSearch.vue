<script setup>
import { ref, inject, toRef } from 'vue';

const axios = inject('axios')

let loading = ref(false)

let isOpen = ref(false)
let options = ref([]);
let searchInput = ref(null)

const props = defineProps({
    dropdownTitle: String,
    categories: Array,
})


const categoriesRef = toRef(props, 'categories')

const emits = defineEmits([
'update:categories'
])


function updateDropdownState(state) {
    setTimeout(() => {
        isOpen.value = state;
    }, 300);
}

async function lookup(input){
    console.log(props)
    if(input && input.length > 0) {
        try {
            const { data } = await axios({
                url: '/autocomplete',
                method: 'GET',
                params: {
                    text : input
                }
            })
            if (data) {
                options.value = data.categories.filter(category => !categoriesRef.value.some(option => option.alias === category.alias));
            }
        } catch(error) {
            console.error(error)
        }
    }
}

function getoptions(input) {
    loading.value = true
    setTimeout(() => {
        lookup(input)
    }, 30);
    loading.value = false
}

function addToSelectedOptions(addedOption) {
    options.value = options.value.filter(option => option.alias !== addedOption.alias);
    emits("update:categories", [...categoriesRef.value, addedOption])

}

function removeFromSelectedOptions(removedOption) {
    emits("update:categories", categoriesRef.value.filter(option => option.alias !== removedOption.alias));
    options.value.push(removedOption);
}

</script>

<template>
    <div class="relative">
        <button id="dropdownSearchButton" class="text-white bg-teal-700 hover:bg-teal-800 focus:ring-4 focus:outline-none focus:ring-teal-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-teal-600 dark:hover:bg-teal-700 dark:focus:ring-teal-800" type="button" @click="updateDropdownState(!isOpen)">
            {{ dropdownTitle }}
            <svg class="w-4 h-4 ml-2" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
        </button>

        <div id="dropdownSearch" :class="{'hidden' : !isOpen }" class="z-2 bg-white rounded-lg flex flex-col shadow w-60 dark:bg-teal-500 absolute">
            <div class="p-3">
                <label for="input-group-search" class="sr-only">Search</label>
                <div class="relative">
                    <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg class="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
                    </div>
                    <input type="text" id="input-group-search" v-model="searchInput" @input="getoptions(searchInput)" class="block w-full p-2 pl-10 text-sm text-gray-900 border border-teal-300 rounded-lg bg-teal-50 focus:ring-teal-500 focus:border-teal-500 dark:bg-teal-600 dark:border-teal-500 dark:placeholder-teal-400 dark:text-white dark:focus:ring-teal-500 dark:focus:border-teal-500" placeholder="Search category" >
                </div>
            </div>
            <ul v-if="options && Array.isArray(options)" v-for="option in options" :key="option" class="h-10 px-3 overflow-y-auto text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownSearchButton" aria-describedby="Categories list">
                <li>
                    <div class="flex items-center pl-2 rounded hover:bg-teal-100 dark:hover:bg-teal-600">
                        <input type="checkbox" class="w-4 h-4 text-teal-600 bg-teal-100 border-teal-300 rounded focus:ring-teal-500 dark:focus:ring-teal-600 dark:ring-offset-teal-700 dark:focus:ring-offset-teal-700 focus:ring-2 dark:bg-teal-600 dark:border-teal-500" @click="addToSelectedOptions(option)">
                        <label class="w-full py-2 ml-2 text-sm font-medium text-teal-900 dark:text-white">{{ option.title }}</label>
                    </div>
                </li>
                <li v-if="options.length === 0">No result</li>
            </ul>
            <ul v-if="categoriesRef && Array.isArray(categoriesRef)" v-for="option in categoriesRef" :key="option" class="h-10 px-3  overflow-y-auto text-sm text-gray-700 dark:text-gray-200" aria-describedby="Selected categories">
                <li>
                    <div class="flex items-center pl-2 rounded hover:bg-teal-100 dark:hover:bg-teal-600">
                        <input type="checkbox" :checked="true" class="w-4 h-4 text-teal-600 bg-teal-100 border-teal-300 rounded focus:ring-teal-500 dark:focus:ring-teal-600 dark:ring-offset-teal-700 dark:focus:ring-offset-teal-700 focus:ring-2 dark:bg-teal-600 dark:border-teal-500" @click="removeFromSelectedOptions(option)">
                        <label class="w-full py-2 ml-2 text-sm font-medium text-teal-900 dark:text-white">{{ option.title }}</label>
                    </div>
                </li>
                <li v-if="options.length === 0">No result</li>
            </ul>
            <button class="bg-teal-200 text-teal-900 font-semibold  rounded-lg py-1 border-none box-border m-2" type="button" @click="updateDropdownState(false)">Validate</button>
        </div>
    </div>

</template>