<script setup lang="ts">
// definePageMeta({
//   middleware: ["auth"],
// });

const dmpStore = useState('dmp-data')
const dmp = computed(() => dmpStore.value)

if (!dmp.value) {
  navigateTo('/app/dmp')
}
const items = ref([
  {
    date: 'Step 1',
    title: 'Project Details',
    description: 'Completed',
    icon: 'line-md:confirm-circle',
    ui: {
      description: 'text-blue-400',
    },
  },
  {
    date: 'Step 2',
    title: 'Draft Review',
    description: 'In Progress',
    icon: 'line-md:confirm-circle-twotone-to-circle-twotone-transition',
    ui: {
      description: 'text-blue-400',
    },
  },
  {
    date: 'Step 3',
    title: 'Download',
    description: 'Pending',
    icon: 'line-md:confirm-circle-twotone-to-circle-transition'
  }
])
</script>

<template>
<div class="relative">
  <div class="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-blue-300 to-white dark:from-blue-800 dark:to-transparent -z-10"></div>

  <div class="mx-auto flex w-full max-w-screen-xl flex-col gap-6 px-6 pt-6">

    <div class="flex items-center justify-between mb-6 mt-6">
  <h1 class="text-4xl font-bold text-blue-500 dark:text-blue-300">
    Draft DMP
  </h1>

  <UButton
    @click="navigateTo('/app/download')"
    color="neutral"
    variant="outline"
    icon="i-lucide-file-text"
    class="flex items-center gap-3 px-6 py-3"
  >
    Download DMP
  </UButton>
</div>

      <UTimeline orientation="horizontal" :default-value="1.5" :items="items" size="sm" class="w-full mb-6 ml-30" />
      <p class="font-semibold text-xl">Review and refine all 6 elements across two pages, and download your DMP anytime using the button in the top-right corner.</p>
      <USeparator class="mb-6" />





    <!-- Buttons -->
    <div class="flex justify-between pt-4">
      <UButton 
        color="primary"
        size="xl"
        class="w-25"
        icon="ooui:arrow-next-rtl"
        @click="navigateTo('/app/dmp1')"
      >
        Back
      </UButton>

      <UButton 
        color="primary"
        size="xl"
        class="w-35"
        trailing-icon="ooui:arrow-next-ltr"
        to="/app/download"
      >
        Download
      </UButton>
    </div>

    <SkyBg />
  </div>
</div>
</template>
