<script setup lang="ts">
// definePageMeta({
//   middleware: ["auth"],
// });

const projectSummary = ref('')

</script>

<template>
<div class="relative">
  <!-- Background -->
  <div class="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-blue-300 to-white dark:from-blue-800 dark:to-transparent -z-10"></div>

  <div class="mx-auto flex w-full max-w-screen-xl flex-col gap-6 px-6 pt-6">
    <!-- Header with PDF button -->
    <div class="flex items-start justify-between">
      <UPageHeader>
        <template #title>
          <h1 class="text-3xl font-bold text-blue-500 dark:text-blue-300">
            Element 1: Data Type
          </h1>
        </template>
      </UPageHeader>

      <!-- PDF Button -->
      <UButton
        color="neutral"
        variant="outline"
        icon="i-lucide-file-text"
        class="flex items-center justify-center gap-3 border-2 border-blue-500 text-blue-600 dark:text-blue-400 dark:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/30 px-6 py-3 text-xl font-semibold rounded-xl shadow-base transition-all hover:scale-105"
      >
        <a
          href="/app/download"
          target="_blank"
          rel="noopener noreferrer"
          class="flex items-center gap-2"
        >
          <span>Download DMP</span>
        </a>
      </UButton>
    </div>

    <!-- 1a Section -->
    <div class="space-y-2">
      <h1 class="text-xl font-semibold text-gray-800 dark:text-gray-100">
        1a. Types and Amount of Scientific Data Expected to Be Generated
      </h1>
      <p class="text-base text-gray-600 dark:text-gray-400">
        Summarize the types and estimated amount of scientific data that will be generated during the project
      </p>
      <UTextarea :rows="8" class="w-300" v-model="projectSummary" autoresize />
    </div>

    <!-- 1b Section -->
    <div class="space-y-2">
      <h1 class="text-xl font-semibold text-gray-800 dark:text-gray-100">
        1b. Scientific data that will be preserved and shared, and the rationale for doing so
      </h1>
      <p class="text-base text-gray-600 dark:text-gray-400">
        Describe which scientific data from the project will be preserved and shared and provide the rationale for this decision
      </p>
      <UTextarea :rows="8" class="w-300" v-model="projectSummary" autoresize />
    </div>

    <!-- 1c Section -->
    <div class="space-y-2">
      <h1 class="text-xl font-semibold text-gray-800 dark:text-gray-100">
        1c. Metadata, other relevant data, and associated documentation
      </h1>
      <p class="text-base text-gray-600 dark:text-gray-400">
        Briefly list the metadata, other relevant data, and any associated documentation (e.g., study protocols and data collection instruments) that will be made accessible to facilitate interpretation of the scientific data
      </p>
      <UTextarea :rows="8" class="w-300" v-model="projectSummary" autoresize />
    </div>

    <!-- Navigation Buttons -->
    <div class="flex justify-between pt-4">
      <UButton 
        color="primary"
        size="xl"
        class="w-25"
        icon="ooui:arrow-next-rtl"
      >
        Back
      </UButton>

      <UButton 
        color="primary"
        size="xl"
        class="w-25"
        trailing-icon="ooui:arrow-next-ltr"
        to="/app/dmp6"
      >
        Next
      </UButton>
    </div>
    <SkyBg />
  </div>
</div>

</template>
