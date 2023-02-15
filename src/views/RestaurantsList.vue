<script setup>
import RestaurantsListCard from '../components/RestaurantsListCard.vue';
import FiltersNavbar from '../components/FiltersNavbar.vue';
import { inject, onMounted, ref, reactive } from 'vue';

const axios = inject('axios')
const HOTEL_ADDRESS = '485 7th Ave, New York, NY 10018'
let restaurantsList = ref(null);
let loading = ref(false);
let params = reactive({
    location: HOTEL_ADDRESS,
    open_now: null,
    limit: 50,
    term: null,
    radius: 40000,
    categories: null,
    price: null,
    open_at: null,
    offset: null,
})

let sortKey = ref(null)

async function getRestaurants(dynamicParams=null, loadMore=false) {
    console.log(dynamicParams);
    loading.value = true
    let reqParams = params
    if(dynamicParams && dynamicParams instanceof Object ) {
        reqParams = Object.assign(reqParams, dynamicParams);
    }
    if (reqParams.categories && Array.isArray(reqParams.categories)) {
        reqParams.categories = reqParams.categories.map(cat => cat.alias).toString()
    }
    try {
        const { data } = await axios({
            url: '/businesses/search',
            method: 'GET',
            params: reqParams
        })
        if(loadMore) {
            restaurantsList.value = data.businesses.reduce((acc, value) => {
                return [...acc, value]
            }, restaurantsList.value)
            console.log(restaurantsList.value)
        }
        else restaurantsList.value = data.businesses
    } catch(error) {
        console.error(error?.response?.status)
    }
    loading.value = false
}

function sortRestaurantsList(list, key) {
    sortKey.value = key;
    return list.sort((a, b) => {
        console.log(a.price, b.price);
        if (key === "price") {
            if (!a[key] && !b[key]) {
                return 0;
            }
            if (!a[key]) {
                return -1;
            }
            if (!b[key]) {
                return 1;
            }
            if (a[key]?.length < b[key]?.length) {
                return -1;
            }
            if (a[key]?.length > b[key]?.length) {
                return 1;
            }
            return 0;
        } else {
            if (a[key] < b[key]) {
                return -1;
            }
            if (a[key] > b[key]) {
                return 1;
            }
            return 0;
        }
    });
}


onMounted(() => {
    getRestaurants();
})
</script>

<template>
    <section class="flex flex-col justify-center">
        <div class="col-span-full m-6">
            <FiltersNavbar @searchRestaurants="getRestaurants($event)"/>
            <div>
                <span class="text-gray-700 font-semibold">Sort by: </span>
                <button class="rounded-lg bg-gray-500 hover:bg-gray-400 p-1 mr-1 text-white" :class="{'bg-teal-400' : sortKey === 'name'}" @click="sortRestaurantsList(restaurantsList, 'name')">A-Z</button>
                <button class="rounded-lg bg-gray-500 hover:bg-gray-400 p-1 mr-1 text-white" :class="{'bg-teal-400' : sortKey === 'price'}" @click="sortRestaurantsList(restaurantsList, 'price')">Prices</button>
                <button class="rounded-lg bg-gray-500 hover:bg-gray-400 p-1 mr-1 text-white" :class="{'bg-teal-400' : sortKey === 'rating'}" @click="sortRestaurantsList(restaurantsList, 'rating')">Ratings</button>
            </div>
        </div>
        
        <div v-if="loading" class="w-full text-center">
            {{ loading ? 'Chargement en cours...' : 'Erreur lors du chargement de la liste des restaurants' }}
        </div>
        <div v-if="restaurantsList && Array.isArray(restaurantsList) && restaurantsList.length > 0" class="w-full 2xl:max-w-screen-2xl grid sm:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-5 gap-4 p-4 lg:justify-center 2xl:mx-auto">
            
            <RestaurantsListCard v-for="item in restaurantsList" :key="item.id" :restaurant="item" @filter-by="getRestaurants"/>
        </div>
        <button class="rounded-lg mx-auto col-span-full bg-gray-500 p-2 text-white mt-20 mb-4" v-if="restaurantsList?.length >= 50" type="button" @click="getRestaurants({offset: restaurantsList.length}, loadMore=true)">
            Load more restaurants
        </button>
        <div class="text-gray-900 text-medium" v-else-if="restaurantsList && Array.isArray(restaurantsList) && restaurantsList.length === 0">
            No result
        </div>
    </section>
</template>