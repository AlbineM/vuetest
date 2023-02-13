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
        <div class="antialiased text-gray-900 w-80" >
            <img :src="`${restaurant.image_url}`" :alt="`image of the ${restaurant.name}`" class="flex h-80 w-80 object-cover object-center rounded-lg shadow-md">
            <div class="px-3 -mt-16 flex">
                <div class="bg-white p-4 rounded-lg shadow-lg relative w-full ">
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
                    <div class="text-center mt-2">
                        <router-link class="text-s text-teal-700 font-semibold" :to="{name : 'restaurant-details', params:{restaurantalias: restaurant.alias}}">See details</router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>