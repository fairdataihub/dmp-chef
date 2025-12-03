<script setup lang="ts">
useSeoMeta({
  title: "Home",
});

const links = ref([
  {
    label: "Get started",
    to: "/app/dmp",
    icon: "i-lucide-square-play",
  },
  {
    label: "Learn more",
    to: "https://fairdataihub.org/dmp-chef",
    variant: "subtle" as const,
    trailingIcon: "i-lucide-arrow-right",
  },
]);

const features = ref([
  {
    title: 'AI-Assisted Drafting',
    description: 'Generate funder-compliant Data Management Plans (DMPs) automatically using AI models trained on real funder templates and FAIR data principles.',
    icon: 'i-lucide-brain',
    to: ''
  },
  {
    title: 'Multi-Funder Support',
    description: 'Create DMPs tailored to specific agencies including NIH, NSF, and other national and international funding bodies.',
    icon: 'i-lucide-globe',
    to: ''
  },
  {
    title: 'Export Options',
    description: 'Easily export finalized DMPs in DOCX, PDF, or machine-actionable JSON formats for seamless submission and archiving.',
    icon: 'i-lucide-file-text',
    to: ''
  }
])

const snapshots = ref([
  {
    title: '12,000+ DMPs',
    description: 'Generated automatically through DMP Chef, helping researchers create funder-compliant plans efficiently.',
    to: ''
  },
  {
    title: '30 Institutions',
    description: 'Universities, research centers, and data offices actively collaborating and using DMP Chef worldwide.',
    to: ''
  },
  {
    title: '25 Funders',
    description: 'Supported templates for agencies including NIH, NSF, DOE, and Horizon Europe.',
    to: ''
  },
  {
    title: '4 AI Models',
    description: 'Fine-tuned and optimized for research data policies and FAIR data principles.',
    to: ''
  },
  {
    title: '10+ Contributors',
    description: 'Researchers, developers, and data stewards improving the open-source DMP Chef platform.',
    to: ''
  }
])

const technologies = ref([
  {
    title: 'Prompt Engineering',
    description: 'Custom-designed prompts ensure precise, context-aware responses that align with funder requirements and research domains.',
    icon: 'tabler:app-window', 
    to: ''
  },
  {
    title: 'Retrieval-Augmented Generation (RAG)',
    description: 'Combines AI generation with real-time access to structured knowledge bases for accurate, up-to-date content.',
    icon: 'mdi:database-search',
    to: ''
  },
  {
    title: 'Fine-Tuned Language Models',
    description: 'Models optimized on research data policy language and DMP examples to improve factuality and style consistency.',
    icon: 'mdi:chip',
    to: ''
  },
  {
    title: 'Vector Databases',
    description: 'High-performance semantic search supports retrieval of relevant policy documents and prior DMPs.',
    icon: 'mdi:vector-arrange-above',
    to: ''
  },
  {
    title: 'Open-Source Infrastructure',
    description: 'Built with transparency and extensibility in mind, enabling community-driven development and easy institutional adoption.',
    icon: 'mdi:earth',
    to: ''
  }
])

const communitylinks = ref([
  {
    label: 'Contribute via GitHub',
    icon: 'i-lucide-star',
    to: 'https://github.com/fairdataihub/dmp-chef'
  },
  {
    label: 'Provide feedback',
    icon: 'i-lucide-file-pen',
    to: '/app/tallyembed'
  }
])
</script>

<template>
  <div>
    <div class="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-blue-300 to-white dark:from-blue-800 dark:to-transparent -z-10"></div>
    <UPageHero
      class="mb-40"
      title="DMP Chef"
      description="Crafting Funder-Compliant Data Management Plans"
      orientation="vertical"
      :links="links"
    >
      <SkyBg />
    </UPageHero>

<UContainer class="mb-24">
  <div class="relative overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-xl">
    
    <div class="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-blue-100 dark:bg-blue-900/20 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
    <div class="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-indigo-100 dark:bg-indigo-900/20 rounded-full blur-3xl opacity-50 pointer-events-none"></div>

    <div class="relative p-10 md:p-14 text-center z-10">
      <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-8 tracking-tight">
        Overview
      </h2>
      
      <div class="mx-auto space-y-6 text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
        <p>
          <span class="font-semibold text-blue-400 dark:text-white">DMP Chef</span>  is a free and open-source platform for drafting funder-compliant Data Management Plans (DMPs) by leveraging Artificial Intelligence (AI)-based pipelines.
        </p>
        <p>
          The platform aims to address challenges faced by researchers when preparing DMPs due to lack of knowledge, expertise, or support.
        </p>
      </div>

      <div class="my-10 border-t border-gray-100 dark:border-gray-800 w-24 mx-auto"></div>

      <div class="mx-auto bg-gray-50 dark:bg-white/5 rounded-xl p-6 border border-gray-100 dark:border-white/10">
        <p class="text-base text-gray-700 dark:text-gray-200">
          DMP Chef is developed in collaboration with the 
          <a href="https://cdlib.org" class="font-bold underline text-blue-400 dark:text-white">California Digital Library</a>, 
          through a grant from the 
          <a href="https://www.ucop.edu" class="font-bold underline text-blue-400 dark:text-white">University of California Office of The President (UCOP)</a> 
          and the 
          <a href="https://chanzuckerberg.com" class="font-bold underline text-blue-400 dark:text-white">Chan Zuckerberg Initiative (CZI)</a>.
        </p>
      </div>
      
    </div>
  </div>
</UContainer>
    <h2 class="text-2xl font-bold text-center mb-10">
      Key <span class="text-blue-400">Features</span> 
    </h2>
    <UContainer class="mb-20">
      <UPageCard
        orientation="horizontal"
        spotlight
        spotlight-color="primary"
      >
        <template #title>
          <h1 class="text-xl font-bold">
            AI-Assisted Drafting
          </h1>
        </template>

        <template #description>
          <p class="text-lg text-gray-600">
            Generate funder-compliant Data Management Plans (DMPs) automatically using AI models trained on real funder templates and FAIR data principles.
          </p>
        </template>
        <img src="/ai.jpg" alt="Tailwind CSS" class="w-full rounded-lg shadow-2xl ring ring-default" />
      </UPageCard>
    </UContainer>
    <UContainer class="mb-20">
      <UPageCard
        orientation="horizontal"
        reverse
        spotlight
        spotlight-color="primary"
      >
        <template #title>
          <h1 class="text-xl font-bold">
            Multi-Funder Support
          </h1>
        </template>

        <template #description>
          <p class="text-lg text-gray-600">
            Create DMPs tailored to specific agencies including NIH, NSF, and other national and international funding bodies.
          </p>
        </template>
        <img src="/team.jpg" alt="Tailwind CSS" class="w-full rounded-lg shadow-2xl ring ring-default" />
      </UPageCard>
    </UContainer>
    <UContainer class="mb-20">
      <UPageCard
        orientation="horizontal"
        spotlight
        spotlight-color="primary"
      >
        <template #title>
          <h1 class="text-xl font-bold">
            Export Options
          </h1>
        </template>

        <template #description>
          <p class="text-lg text-gray-600">
            Easily export finalized DMPs in DOCX, PDF, or machine-actionable JSON formats for seamless submission and archiving.
          </p>
        </template>
        <img src="/printer.jpg" alt="Tailwind CSS" class="w-full rounded-lg shadow-2xl ring ring-default" />
      </UPageCard>
    </UContainer>

    <h2 class="text-2xl font-bold text-center">
      Snapshots 
    </h2>
    <UContainer class="my-20">
      <UPageGrid>
        <UPageCard
          v-for="(snapshot, index) in snapshots"
          :key="index"
          v-bind="snapshot"
          spotlight
          spotlight-color="primary"
          variant="soft"
        />
      </UPageGrid>
      <SkyBg />
    </UContainer>

    <section class="relative py-20 bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:from-[#1a1a1a] dark:via-gray-900 dark:to-gray-800 border border-blue-100 dark:border-gray-700">
      <UContainer>
        <h2 class="text-2xl font-bold mb-2">
          Core <span class="text-blue-400">Technologies</span>
        </h2>
        <p class="text-gray-600 dark:text-gray-400 mb-10">
          Powering DMP Chef with advanced AI, retrieval, and data optimization.
        </p>

        <div class="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <UPageCard
            v-for="(tech, index) in technologies"
            :key="index"
            target="_blank"
            variant="soft"
            class="p-6 bg-white/70 dark:bg-gray-900/50 border border-transparent rounded-2xl shadow-sm hover:shadow-md transition-all duration-200"
          >
            <!-- Flex row: Icon on left, text on right -->
            <div class="flex items-start gap-4">
              <!-- Bigger Icon with border -->
              <div class="flex items-center justify-center w-18 h-18 rounded-xl">
                <UIcon :name="tech.icon" class="w-10 h-10 text-blue-400" />
              </div>

              <!-- Text content: title + description -->
              <div class="flex flex-col">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1">
                  {{ tech.title }}
                </h3>
                <p class="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  {{ tech.description }}
                </p>
              </div>
            </div>
          </UPageCard>
        </div>
      </UContainer>
    </section>

    <UContainer>
      <UPageHero
        orientation="vertical"
        :links="links"
      >
        <template #title>
          <h1 class="text-3xl font-bold">
            Ready to revolutionize your Data Management Plans?
          </h1>
        </template>

        <template #description>
          <p class="text-lg text-gray-600">
            Draft, refine, and share funder-compliant DMPs with ease.
          </p>
        </template>

        <SkyBg />
      </UPageHero>
    </UContainer>
    <USeparator icon="i-simple-icons-nuxtdotjs" />
    <UContainer class="my-10">
      <UPageLinks title="Community" :links="communitylinks" />
    </UContainer>
  </div>
</template>
