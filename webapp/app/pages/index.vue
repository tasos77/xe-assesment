<template>
  <div>
      <UApp :toaster="{ position: 'bottom-center' }">
          <UMain class="flex flex-col justify-center items-center gap-14">
              <div class="w-4/5 md:w-3/4 lg:w-1/2 xl:w-2/5 self-center">
                  <Form />
              </div>
              <div>
                  <UButton icon="i-lucide-database" size="md" color="primary" variant="solid" label="Show Database Entries" to="/entries"/>
              </div>
          </UMain>
      </UApp>
  </div>
</template>
