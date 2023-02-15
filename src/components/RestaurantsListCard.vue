<script setup>

const props = defineProps({
    restaurant: Object
})

const emits = defineEmits([
'filterBy'
])

</script>

<template>
    <div class="grid">
        <div class="antialiased text-gray-900 w-full xl:w-80" >
            <img :src="`${restaurant.image_url}`" :alt="`image of the ${restaurant.name}`" class="flex h-40 sm:h-80 xl:w-80 w-full object-cover object-center rounded-lg shadow-md">
            <div class="px-3 -mt-16 flex">
                <div class="bg-white p-4 rounded-lg shadow-lg relative w-full">
                    <span class=" text-xs px-2 inline-block rounded-full uppercase font-semibold tracking-wide" :class="!restaurant.is_closed ? 'bg-teal-200 text-teal-800' : 'text-red-800 bg-red-200'">
                        {{ restaurant.is_closed ? 'Closed' : 'Opened' }}
                    </span>
                    <h4 class="mt-1 text-xl font-semibold uppercase leading-tight">{{ restaurant.name }}</h4>
                    <ul v-for="item in restaurant.categories" :key="item.alias" class="inline-flex mb-auto list-inside">
                        <li class="text-s">
                            <button @click="$emit('filterBy', {categories : item.alias})">#{{ item.title }}</button> &nbsp;
                        </li>
                    </ul>
                    <div class="mt-1">
                        Standing : <strong>{{ restaurant.price }}</strong>
                    </div>
                    <div class="mt-4">
                        <span class="text-teal-600 text-md font-semibold"> Rated {{restaurant.rating}} /5 </span>
                        <span class="text-sm text-gray-600">(based on {{ restaurant.review_count }} ratings)</span>
                    </div>
                    <router-link class="sm:hidden flex w-auto absolute right-8 top-1/2 text-s text-teal-700 font-semibold" :to="{name: 'restaurant-details', params:{restaurantalias:restaurant?.alias}}">
                        See details
                        <svg xmlns="http://www.w3.org/2000/svg" class="ml-2" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <circle cx="12" cy="12" r="11" fill="teal" />
                            <path d="M14.1 12.7H9.7V11.3h4.4l-2.7-2.7 1.4-1.4 4.7 4.7-4.7 4.7-1.4-1.4 2.7-2.7z" fill="white" />
                        </svg>
                    </router-link>

                    <div class="text-center hidden sm:block">
                        <router-link class="text-s text-teal-700 font-semibold" :to="{name : 'restaurant-details', params:{restaurantalias: restaurant?.alias}}">See details</router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>