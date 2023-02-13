<script setup>
import RestaurantsListCard from '../components/RestaurantsListCard.vue';
import { inject, onMounted, ref, reactive } from 'vue';

const axios = inject('axios')
const HOTEL_ADDRESS = '485 7th Ave, New York, NY 10018'
let restaurantsList = ref(null);
let loading = ref(false);
let params = reactive({
    location: HOTEL_ADDRESS,
    open_now: false,
    limit: 50,
    term: null,
    radius: null,
    categories: null,
    price: null,
    open_at: null,
})
let search = null

async function getRestaurants(dynamicParams=null) {
    loading.value = true
    let reqParams = params
    if(dynamicParams && dynamicParams instanceof Object ) {
        reqParams = Object.assign(reqParams, dynamicParams);
    }
    try {
        const { data } = await axios({
            url: '/businesses/search',
            method: 'GET',
            params: reqParams
        })
        restaurantsList.value = data.businesses
        console.log(restaurantsList)
    } catch(error) {
        console.error(error)
    }
    loading.value = false
}

async function autocomplete(e) {
    // si search = ''
    try {
        const { data } = await axios({
            url: '/autocomplete',
            method: 'GET',
            params: {
                text: e
            }
        })
        restaurantsList.value = data.businesses
    } catch(error) {
        console.error(error)
    }

}



onMounted(() => {
    getRestaurants();
})


</script>

<template>
    <section class="flex justify-center p-6">

        <div v-if="loading">
            {{ loading ? 'Chargement en cours...' : 'Erreur lors du chargement de la liste des restaurants' }}
        </div>
        <div v-else-if="restaurantsList && Array.isArray(restaurantsList)" class="lg grid grid-cols-5 gap-4 p-4 justify-center">

            <form class=" col-span-full">
                <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                <div class="relative">
                    <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                    </div>
                    <input type="search" id="default-search" class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search restaurants ..." v-model="search" @input="autocomplete(search)" required>
                    <button type="submit" class="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
                </div>
            </form>
            <div class="filters w-full col-span-full">
                <button type="button" class="inline-block px-6 py-2.5 bg-green-600 text-white font-medium text-xs leading-tight rounded-lg shadow-md hover:bg-green-700 hover:shadow-lg focus:bg-green-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-800 active:shadow-lg transition duration-150 ease-in-out" @click="getRestaurants({open_now: !params.open_now})">
                    {{ params.open_now ? 'All' : 'Currently opened' }}
                </button>
            </div>
            <RestaurantsListCard v-for="item in restaurantsList" :key="item.id" :restaurant="item" @filter-by="getRestaurants"/>
            <button type="button" class="  " @click="getRestaurants({offset: 50})">
                Load more restaurants
            </button>
        </div>
        <div v-else-if="restaurantsList && Array.isArray(restaurantsList) && restaurantsList.length === 0">
            Pas de résultat
        </div>
    </section>
</template>