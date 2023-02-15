<script setup>
import { reactive, onBeforeMount, ref } from 'vue';
import DropdownSearch from '@/components/DropdownSearch.vue'
import DropdownSingleMode from '@/components/DropdownSingleMode.vue'

const INITIAL_FILTERS = {
    radius : 40000,
    open_now: null,
    price: null,
    categories: [],
    term: null,
}

let isDropdownOpen = ref(false)

let filters = reactive({})

const emits = defineEmits([
'searchRestaurants'
])

function clearFilters(){
    filters = Object.assign(filters, INITIAL_FILTERS)
}

onBeforeMount(() => {
    clearFilters();
})
</script>

<template>
    <form v-if="filters" class="bg-white p-12 mb-6 shadow-lg grid xl:grid-cols-4 gap-2 items-center rounded-lg relative" @focusin="isDropdownOpen = false">
        <div class="flex xl:border-r-2 border-y-0 border-gray-200 items-center">
            <div class="xl:w-96">
                <div class="input-group relative flex flex-wrap items-stretch w-full rounded">
                    <input type="text" class="form-control relative flex-auto min-w-0 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-teal-600 focus:outline-none" placeholder="Search restaurant name" aria-label="Search" aria-describedby="button-addon2" v-model="filters.term">
                </div>
            </div>
        </div>
        <div class="flex flex-col px-4 xl:border-r-2 border-y-0 border-gray-200 h-full w-auto">
            <label for="steps-range" class="block mb-2 text-sm font-medium text-gray-900">Distance from the Hotel : {{ `${filters.radius/1000} km` }}</label>
            <input type="range" min="0" max="40000" v-model="filters.radius" step="1000" class="w-1/8 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700">
        </div>
        
        <div class="px-4 flex gap-2 h-full xl:border-r-2 border-y-0 border-gray-200 items-center">
            <DropdownSearch v-model:categories="filters.categories" dropdown-title="Categories" :isOpen="isDropdownOpen"/>
            <DropdownSingleMode v-model:price="filters.price" dropdown-title="Price" :isOpen="isDropdownOpen"/>
            <div>
                <input id="opened" type="checkbox" v-model="filters.open_now" class="w-4 h-4 text-gray-600 bg-gray-100 border-gray-300 rounded focus:ring-teal-500 dark:focus:ring-teal-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-teal-700 dark:border-gray-600">
                <label for="opened" class="ml-2 text-sm font-medium text-gray-900">currently open</label>
            </div>
        </div>
        <div class="flex xl:justify-around">
            <button type="button" class="text-gray-500 ml-8" @click="clearFilters()">Clear filters</button>
            <button type="button" class="mx-auto rounded-lg bg-teal-600 text-white flex text-center uppercase font-bold justify-center w-60 py-4" @click="emits('searchRestaurants', filters)">Search</button>
        </div>
    </form>
</template>

