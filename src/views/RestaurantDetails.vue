<script setup>
import { inject, onMounted, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import TheCarrousel from '../components/TheCarrousel.vue';
import RestaurantHours  from'@/components/RestaurantHours.vue';

let restaurant = ref(null);
const axios = inject('axios')
const HOTEL_LONGITUDE = -73.9893949;
const HOTEL_LATITUDE = 40.7523822;

const route = useRoute()
const router = useRouter()

function getDistanceFromLocation(lat1, long1, lat2, long2) {
    const earthRadius = 6371; // Radius of the earth in km
    const dLat = convertDegreesToRadiants(lat2 - lat1);
    const dLon = convertDegreesToRadiants(long2 - long1);
    const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(convertDegreesToRadiants(lat1)) * Math.cos(convertDegreesToRadiants(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = earthRadius * c; // Distance in km
    return Math.round(d * 100) / 100;
}

function convertDegreesToRadiants(deg) {
    return deg * (Math.PI / 180);
}


async function getRestaurantById(id) {
    try {
        const { data } = await axios({
            url: `/businesses/${id.toString()}`,
            method: 'GET'
        })
        restaurant.value = data
    } catch(error) {
        console.error(error)
    }
}


onMounted(() => {
    getRestaurantById(route.params.restaurantalias)
})
</script>

<template>
    <div v-if="restaurant && (restaurant instanceof Object)">
        <div class="text-lg max-w-prose mx-auto">
            <div class="relative flex flex-col py-16 px-4 bg-white">
                <img :src="`${restaurant.image_url}`" :alt="`image of the ${restaurant.name}`" class="flex h-20 sm:h-40 w-full object-cover object-center rounded-lg shadow-md">
                <h1 class="w-full rounded-lg flex relative justify-center">
                    <span class="w-auto relative bg-white -mt-8 rounded-lg shadow-md p-2 block text-3xl text-center leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">{{ restaurant?.name }}</span>
                </h1>
                <a :href="restaurant.url" target="_blank" class="rounded-lg bg-teal-600 p-2 text-white font-semibold mx-auto m-4 shadow-lg animate-pulse">Order now</a>
                <div class="text-s text-gray-900 leading-8 flex-col">
                    <div class="mt-4v text-center">
                        <span class="text-teal-600 text-md font-semibold"> Rated {{restaurant.rating}} /5 </span>
                        <span class="text-sm text-gray-600">(based on {{ restaurant.review_count }} ratings)</span>
                    </div>
                    <a class="text-s text-gray-900 leading-8" :href="`tel:${restaurant.phone}`">Call: {{ restaurant.display_phone }}</a>
                    <div class="flex">
                        Address:&nbsp;
                        <address class="text-s text-gray-900 leading-8" v-for="line in restaurant?.location?.display_address" :item="line">
                            {{ line }} &nbsp;
                        </address>
                    </div>
                    <p>
                        This restaurant is {{ getDistanceFromLocation(HOTEL_LATITUDE, HOTEL_LONGITUDE, restaurant.coordinates.latitude, restaurant.coordinates.longitude) }}km away from you.
                    </p>

                    <div>
                        Categories:
                        <ul v-for="item in restaurant?.categories" :key="item.alias" class="inline-flex mb-auto list-inside text-gray-900 leading-8">
                            <li class="text-s">
                                #{{ item.title }} &nbsp;
                            </li>
                        </ul>
                    </div>
                    <div>
                        Transactions:
                        <ul v-for="item in restaurant?.transactions" :key="item.alias" class="inline-flex mb-auto list-inside list-disc text-gray-900 leading-8">
                            <li class="text-s">
                                {{ item }}
                            </li>
                        </ul>
                    </div>

                </div>
                <RestaurantHours :hours="restaurant?.hours"/>
                <TheCarrousel :images="restaurant?.photos"/>
            </div>
        </div>
    </div>
</template>