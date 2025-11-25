<script setup lang="ts">
// definePageMeta({
//   middleware: ["auth"],
// });
const value = ref('')
</script>

<template>
<div class="relative">
  <!-- Background -->
  <div class="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-blue-300 to-white dark:from-blue-800 dark:to-transparent -z-10"></div>

  <div class="mx-auto flex w-full max-w-screen-xl flex-col gap-6 px-6 pt-6">
    <div class="flex items-start justify-between">
      <UPageHeader>
        <template #title>
          <h1 class="text-3xl font-bold">
            
          </h1>
        </template>
      </UPageHeader>
    </div>
    <!-- 1a Section -->
    <div class="space-y-2">
      <p class="text-xl text-center">
        The file has been downloaded successfully! We welcome any feedback you may have.
      </p>
      <UTextarea :rows="8" autoresize placeholder="Give feedback" class="w-300" v-model="value" />
    </div>

    <div class="flex justify-center pt-4">
      <UButton
        to=""
        color="primary"
        size="xl"
        class="w-20"
      >
        Submit
      </UButton>
    </div>
    <SkyBg />
  </div>
</div>

</template>
