<script setup lang="ts">
// definePageMeta({
//   middleware: ["auth"],
// });

const items = ref([
  {
    label: 'DOCX',
    value: 'docx',
    description: 'Download your Data Management Plan as a Word document.'
  },
  {
    label: 'PDF',
    value: 'pdf',
    description: 'Download your Data Management Plan as a PDF file.'
  },
  {
    label: 'JSON',
    value: 'json',
    description: 'Export your Data Management Plan in structured JSON format.'
  }
])

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
          <h1 class="text-3xl font-bold">
            Select the type of file you want to download:
          </h1>
        </template>
      </UPageHeader>
    </div>

    <!-- 1a Section -->
    <div class="space-y-2">
      <p class="text-base text-gray-600 dark:text-gray-400">
        Format
      </p>
      <URadioGroup color="primary" variant="table" default-value="pro" :items="items" />
    </div>

    <div class="flex justify-center pt-4">
      <UButton
        to="/app/feedback"
        color="primary"
        size="xl"
        class="w-40"
        icon="material-symbols:download-rounded"
      >
        Download
      </UButton>
    </div>
    <SkyBg />
  </div>
</div>

</template>
