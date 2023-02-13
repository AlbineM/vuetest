<script setup>
import { onMounted } from 'vue';

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

const props = defineProps({
    hours: Array
})

function formatHours(time){
    return time.slice(0, 2) + ':' + time.slice(2);
}

onMounted(() => {
    console.log(props.hours)
})

</script>

<template>
    <div v-if="props.hours && Array.isArray(props.hours)">
        <div v-for="information, index in props.hours" :key="index">
            <div class="flex flex-col">
                <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                        <div class="overflow-hidden">
                            <table class="min-w-full text-center">
                                <caption>
                                    Opening times on {{ information?.hours_type }} days
                                </caption>
                                <thead class="border-b bg-white">
                                    <tr>
                                        <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-2 text-left">
                                            Day
                                        </th>
                                        <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-2">
                                            Opens at
                                        </th>
                                        <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-2">
                                            Closes at
                                        </th>
                                        <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-2">
                                            Works Overnight
                                        </th>
                                    </tr>
                                </thead>
                                <tbody v-for="details, index in information?.open" :key="index">
                                    <tr class="bg-white border-b">
                                        <td class="px-6 py-2 whitespace-nowrap text-left text-sm font-medium text-gray-900">{{ DAYS[details?.day] }}</td>
                                        <td class="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">{{ formatHours(details?.start) }}</td>
                                        <td class="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">{{ formatHours(details?.end) }}</td>
                                        <td class="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">{{ details?.is_overnight ? 'Yes' : 'No' }}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>