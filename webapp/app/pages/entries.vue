<script setup lang="ts">

const { getAll } = useApi()
const entries = ref<any>([])

onMounted(async()=>{
  entries.value = await getAll()


})


</script>

<template>
    <div class="flex flex-wrap gap-7 p-5">
        <div v-for="entry in entries" :key="entry.placeId" class="p-5 border-gray-600 border rounded-xl flex flex-col gap-2.5 w-2xs">
            <div class="text-2xl">
                {{entry.title}}
            </div>
            <USeparator/>
            <div>
                Type: {{ entry.type}}
            </div>
            <div>
                Area: {{ entry.area}}
            </div>
            <div>
                Amount: {{ entry.amount}}
            </div>
            <div>
                Description: {{ entry.description}}
            </div>
        </div>
    </div>
    <div class="flex justify-center mt-3">
        <UButton label="Go Back To Ad Input" size="md" color="primary" variant="solid" to="/" />

    </div>
</template>

<style lang="scss" scoped>

</style>
