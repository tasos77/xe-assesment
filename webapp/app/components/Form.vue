<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui'
import * as z from 'zod'
import type { SearchResponse } from '~/composables/useApi'
import { useApi } from '~/composables/useApi'

// define validation schema for form submission
const schema = z.object({
  title: z.string('Title is required').min(3, 'Must be at least 3 characters').max(155, 'Must be at most 155 characters'),
  type: z.enum(['Rent', 'Buy', 'Exchange', 'Donation']),
  area: z.string('Area is required').min(3, 'Must be at least 3 characters'),
  amount: z.number('Amount is required').min(0),
  description: z.string().optional(),
})

// generate type
type Schema = z.output<typeof schema>

// init state
const state = reactive<Partial<Schema>>({
  title: undefined,
  type: undefined,
  area: undefined,
  amount: undefined,
  description: undefined,
})

// additional vars
const availableTypes = ref(['Rent', 'Buy', 'Exchange', 'Donation'])
const searchLocked= ref(false)
const searchLoading = ref(false)
const areas = ref([])
const placeId = ref('')
const submitLoading = ref(false)
const form = useTemplateRef('form')

// init composables
const toast = useToast()
const { search,store } = useApi()

// watch for input changes
watch(()=>state.area, async(value) => {
  if(!searchLocked.value && value && value?.length >= 3){
    searchLoading.value = true
    const results =  await search(value)
    searchLoading.value = false
    areas.value = results
  }
})

// select area from results
const selectArea = (area: SearchResponse) =>{
  state.area = area.mainText
  placeId.value = area.placeId
  areas.value = []
}

// submit form logic
async function onSubmit(event: FormSubmitEvent<Schema>) {
  submitLoading.value = true
  // try to store values
  const result = await store({
    title: state.title.trim(),
    type: state.type.trim(),
    description: state.description ? state.description.trim() : '',
    area: state.area.trim(),
    amount: state.amount,
    placeId: placeId.value
  })
  // handle erros and show toast
  if (result instanceof Error) {
    toast.add({ title: 'Error', description: 'Failed to submit the form.', color: 'danger' })
  } else {
    toast.add({ title: 'Success', description: 'The form has been submitted.', color: 'success' })
    form.value?.clear()
  }
  submitLoading.value = false
}

</script>

<template>
  <UForm  ref="form" :schema="schema" :state="state" class="space-y-4 p-4 w-full border-t-gray-200 border-1 rounded-lg" @submit="onSubmit">
    <UFormField label="Title" name="title">
      <UInput v-model="state.title" placeholder="Classified title up to 155 chars" class="w-full"/>
    </UFormField>

    <UFormField label="Type" name="type">
      <UInputMenu v-model="state.type" placeholder="Select Type" :items="availableTypes" class="w-full"/>
    </UFormField>

    <UFormField label="Area" name="area">
      <UInput v-model="state.area" placeholder="Type in the property's area" class="w-full" :loading="searchLoading" @click="searchLocked = false" />
    </UFormField>

        <UPageList divide v-if="areas">
         <UPageCard
         @click="[selectArea(area), searchLocked = true]"
           class="cursor-pointer mb-2 backdrop-blur-xs  dark:bg-black/20 border  dark:border-white/10 transition-all duration-200 ease-in-out"
           v-for="(area, index) in areas"
           :key="index"
         >
           <template #body>
             <UUser :name="area.mainText" :description="area.secondaryText" size="md" />
           </template>
         </UPageCard>
       </UPageList>

    <UFormField label="Price in Euros" name="amount">
      <UInputNumber v-model="state.amount" placeholder="Amount" class="w-full" :min="0"/>
    </UFormField>

    <UFormField label="Description" name="description">
      <UTextarea v-model="state.description" placeholder="Describe the property" class="w-full"/>
    </UFormField>

    <UButton type="submit" :loading="submitLoading">
      Submit
    </UButton>
  </UForm>
</template>
