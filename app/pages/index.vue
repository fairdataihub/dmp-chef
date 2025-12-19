<script setup lang="ts">
useSeoMeta({
  title: "Home",
});

const links = ref([
  {
    label: "View GitHub repo",
    to: "https://github.com/fairdataihub/dmp-chef",
    icon: "i-simple-icons-github",
    target: "_blank",
  },
  {
    label: "Test it",
    to: "/app/dmp",
    variant: "subtle" as const,
    trailingIcon: "i-lucide-arrow-right",
  },
]);

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

// Added the new data for the Roadmap Timeline
const roadmapItems = ref([
  {
    date: 'Oct 2025 – Mar 2026',
    title: 'Phase 1',
    description: 'Define the user workflow, test improvement strategies, and build the Alpha prototype to draft NIH-compliant DMPs. This phase ends with internal testing and refinement.',
    icon: 'i-lucide-git-branch'
  },
  {
    date: 'Apr 2026 – Sep 2026',
    title: 'Phase 2',
    description: 'Add general-purpose and multi-funder DMP drafting capabilities (e.g., NSF) and deliver the Beta prototype. This phase ends with external user testing and refinement.',
    icon: 'i-lucide-package-open'
  },
  {
    isSpacer: true,
    date: '',
    title: '',
    description: '',
    icon: 'i-lucide-more-horizontal'
  },
  {
    date: '20XX - 20XX',
    title: 'Phase N: Integration with DMP Tools',
    description: 'Integrate the DMP Chef back-end with <a href="https://dmptool.org" target="_blank" class="text-blue-500 underline">DMPTool.org</a>',
    icon: 'i-lucide-server'
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
    <div class="flex flex-col items-center">
      <div class="flex justify-center mt-30">
        <img 
          src="/../public/logos/logo-dmpchef-transparent.svg" 
          alt="DMP Chef Logo" 
          class="h-30 w-auto" 
        />
      </div>
    </div>
    <UPageHero
      class="mb-20"
      title="DMP Chef"
      description="A Python pipeline for crafting Data Management Plans (DMPs)"
      orientation="vertical"
      :links="links"
    >
      <SkyBg />
    </UPageHero>
<UContainer class="mb-24">
  <section
    class="relative overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-xl"
  >
    <!-- Background glow effects -->
    <div class="absolute inset-0 pointer-events-none">
      <div
        class="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-blue-200 dark:bg-blue-900/30 blur-3xl opacity-50"
      />
      <div
        class="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-indigo-200 dark:bg-indigo-900/30 blur-3xl opacity-50"
      />
    </div>

    <!-- Content -->
    <div class="relative z-10 px-8 py-12 md:px-14 md:py-16 text-center">
      <h2
        class="mb-8 text-3xl font-bold tracking-tight text-gray-900 dark:text-white"
      >
        Overview
      </h2>

      <div
        class="mx-auto max-w-4xl space-y-6 text-lg leading-relaxed text-gray-600 dark:text-gray-300"
      >
        <p>
          <span class="font-semibold text-blue-500 dark:text-blue-400">
            DMP Chef
          </span> is an open-source (MIT License), Python-based pipeline that leverages AI to draft funder-compliant 
          Data Management Plans (DMPs). Researchers often struggle to write DMPs because they require advance knowledge 
          of data types, metadata standards, repositories, and funder-specific sharing requirements. 
          DMP Chef addresses this challenge by translating high-level project descriptions into funder-compliant DMP, 
          using a tailored prompt, funder templates, funder guidelines, and a large language model (LLM).  
          This project is part of a broader extension of the 
          <a
            href="https://dmptool.org"
            target="_blank"
            rel="noopener noreferrer"
            class="font-semibold underline text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
          >
            DMPTool
          </a>
           platform. 
        </p>

        <p>
          This website is meant to provide information about the DMP Chef pipeline and also provide a testing interface. 
          The ultimate goal is to integrate the DMP Chef pipeline into DMPTool.org, providing researchers with a familiar 
          and convenient user interface that does not require any coding knowledge.
        </p>
      </div>
    </div>
  </section>
</UContainer>

<UContainer class="py-16">
    <div class="text-center space-y-8">
      <h2 class="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
        Team
      </h2>

      <p class="max-w-5xl mx-auto text-lg leading-8 text-gray-700 dark:text-gray-300">
        <span class="font-bold text-blue-400 dark:text-white">DMP Chef</span> is developed by the 
        <span class="font-semibold text-gray-900 dark:text-white">FAIR Data Innovations Hub</span> 
        in collaboration with the 
        <span class="font-semibold text-gray-900 dark:text-white">California Digital Library (CDL)</span> 
        who are developing and maintaining 
        <span class="font-semibold text-gray-900 dark:text-white">DMPTool</span>
         platform.
      </p>

      
<div
  class="grid grid-cols-1 sm:grid-cols-3 gap-8 items-center justify-items-center pt-8"
>
  <a
    href="https://fairdataihub.org"
    target="_blank"
    rel="noopener noreferrer"
    class="flex h-24 w-56 items-center justify-center rounded-xl
           dark:bg-white/90
           dark:border dark:border-white/10
           dark:shadow-sm"
  >
    <img
      src="/logos/fair_logo.svg"
      alt="FAIR Data Innovations Hub"
      class="h-14 w-auto object-contain"
    />
  </a>

  <a
    href="https://cdlib.org"
    target="_blank"
    rel="noopener noreferrer"
    class="flex h-24 w-56 items-center justify-center rounded-xl
           dark:bg-white/90
           dark:border dark:border-white/10
           dark:shadow-sm"
  >
    <img
      src="/logos/logo-cdl.svg"
      alt="California Digital Library"
      class="h-14 w-auto object-contain"
    />
  </a>

  <a
    href="https://dmptool.org"
    target="_blank"
    rel="noopener noreferrer"
    class="flex h-24 w-56 items-center justify-center rounded-xl
           dark:bg-white/90
           dark:border dark:border-white/10
           dark:shadow-sm"
  >
    <img
      src="/logos/dmp_tool_logo.svg"
      alt="DMPTool"
      class="h-14 w-auto object-contain"
    />
  </a>
</div>


    </div>
  </UContainer>
    <!-- <h2 class="text-2xl font-bold text-center mb-10">
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
    </UContainer> -->
    <!-- <UContainer class="mb-20">
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
    </UContainer> -->

    <!--
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
            
            <div class="flex items-start gap-4">
              
              <div class="flex items-center justify-center w-18 h-18 rounded-xl">
                <UIcon :name="tech.icon" class="w-10 h-10 text-blue-400" />
              </div>

              
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
    -->
    <UContainer class="my-20">
      <h2 class="text-3xl font-bold text-center mb-12">
          Project <span class="text-blue-400">Roadmap</span>
      </h2>
      <div class="p-8 border border-gray-200 dark:border-gray-800 rounded-xl bg-gray-50 dark:bg-gray-900/50 shadow-lg">
         <UTimeline 
            :items="roadmapItems" 
            :ui="{
              wrapper: 'space-y-6',
              container: 'min-h-12',
              date: 'text-sm text-gray-500 dark:text-gray-400 font-medium',
              title: 'text-xl font-bold text-gray-900 dark:text-white',
              description: 'text-base text-gray-700 dark:text-gray-300',
            }" 
          >
          <template #description="{ item }">
            <div v-if="item.isSpacer" style="height: 6rem;"></div>
            <div v-else v-html="item.description"></div>
          </template>
          </UTimeline>
      </div>
    </UContainer>

      <section class="py-16">
    <UContainer>
      <div class="mx-auto max-w-5xl text-center mb-10">
        <h2 class="text-3xl font-semibold text-gray-900 dark:text-white">
          Funding
        </h2>

        <p class="mt-4 text-base leading-relaxed text-gray-800 dark:text-white">
          This project is a 
          <a href="https://new.nsf.gov/" target="_blank" rel="noopener noreferrer" class="font-semibold underline decoration-blue-400 hover:text-blue-500 transition-colors">National Science Foundation (NSF)</a> 
          and 
          <a href="https://chanzuckerberg.com" target="_blank" rel="noopener noreferrer" class="font-semibold underline decoration-blue-400 hover:text-blue-500 transition-colors">Chan Zuckerberg Initiative (CZI)</a>-funded collaboration between the 
          <a href="https://fairdataihub.org" target="_blank" rel="noopener noreferrer" class="font-semibold underline decoration-blue-400 hover:text-blue-500 transition-colors">FAIR Data Innovations Hub</a> 
          and 
          <a href="https://cdlib.org" target="_blank" rel="noopener noreferrer" class="font-semibold underline decoration-blue-400 hover:text-blue-500 transition-colors">California Digital Library</a> 
          (University of California Office of the President) as part of a broader extension of the 
          <a href="https://dmptool.org" target="_blank" rel="noopener noreferrer" class="font-semibold underline decoration-blue-400 hover:text-blue-500 transition-colors">DMPTool</a>  platform.
        </p>
      </div>
    </UContainer>
  </section>

    <!-- <UContainer>
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
    </UContainer> -->
    <USeparator icon="i-simple-icons-nuxtdotjs" />
    <UContainer class="my-10">
      <UPageLinks title="Community" :links="communitylinks" />
    </UContainer>
  </div>
</template>
