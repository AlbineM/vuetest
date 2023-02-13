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
        console.log(data)
        restaurant.value = data
    } catch(error) {
        console.error(error)
        if (error?.response?.status === 404) {
            
        }
    }
}


onMounted(() => {
    getRestaurantById(route.params.restaurantalias)
})
</script>

<template>
    <div v-if="restaurant && (restaurant instanceof Object)">
        <div class="text-lg max-w-prose mx-auto" :class="`bg-[url(${restaurant?.image_url})]`">
            <div class="relative py-16 bg-white">
                <img :src="`${restaurant.image_url}`" :alt="`image of the ${restaurant.name}`" class="flex h-40 w-full object-cover object-center rounded-lg shadow-md">
                <h1 class="w-full rounded-lg flex relative justify-center">
                    <span class="w-auto relative bg-white -mt-8 rounded-lg shadow-md p-2 block text-3xl text-center leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">{{ restaurant?.name }}</span>
                    <span class=" absolute -bottom-1/2 right-0 text-xs px-2 inline-block rounded-full uppercase font-semibold tracking-wide" :class="restaurant?.hours?.is_open_now ? 'bg-teal-200 text-teal-800' : 'text-red-800 bg-red-200'">
                        {{ !restaurant?.hours?.is_open_now ? 'Closed' : 'Opened' }}
                    </span>
                </h1>
                <div class="text-s text-gray-900 leading-8 flex-col">
                    <div class="mt-4v text-center">
                        <span class="text-teal-600 text-md font-semibold"> Rated {{restaurant.rating}} /5 </span>
                        <span class="text-sm text-gray-600">(based on {{ restaurant.review_count }} ratings)</span>
                    </div>
                    <a class="text-s text-gray-900 leading-8" :href="`tel:${restaurant.phone}`">Call : {{ restaurant.display_phone }}</a>
                    <div class="flex flex-col">
                        Address :
                        <address class="text-s text-gray-900 leading-8" v-for="line in restaurant?.location?.display_address" :item="line">
                            {{ line }} &nbsp;
                        </address>
                        This restaurant is {{ getDistanceFromLocation(HOTEL_LATITUDE, HOTEL_LONGITUDE, restaurant.coordinates.latitude, restaurant.coordinates.longitude) }}km away from you.
                    </div>
                    
                    Categories :
                    <ul v-for="item in restaurant?.categories" :key="item.alias" class="inline-flex mb-auto list-inside text-gray-900 leading-8">
                        <li class="text-s">
                            #{{ item.title }} &nbsp;
                        </li>
                    </ul>

                </div>
                <!-- <TheCarrousel :images="restaurant?.photos"/> -->
                <RestaurantHours :hours="restaurant?.hours"/>
            </div>
        </div>
    </div>
</template>