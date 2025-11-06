<script setup lang="ts">
// definePageMeta({
//   middleware: ["auth"],
// });

const agencyItems = [
  "National Cancer Institute (NCI)",
  "National Eye Institute (NEI)",
  "National Heart, Lung, and Blood Institute (NHLBI)",
  "National Human Genome Research Institute (NHGRI)",
  "National Institute on Aging (NIA)",
  "National Institute on Alcohol Abuse and Alcoholism (NIAAA)",
  "National Institute of Allergy and Infectious Diseases (NIAID)",
  "National Institute of Arthritis and Musculoskeletal and Skin Diseases (NIAMS)",
  "National Institute of Biomedical Imaging and Bioengineering (NIBIB)",
  "Eunice Kennedy Shriver National Institute of Child Health and Human Development (NICHD)",
  "National Institute on Deafness and Other Communication Disorders (NIDCD)",
  "National Institute of Dental and Craniofacial Research (NIDCR)",
  "National Institute of Diabetes and Digestive and Kidney Diseases (NIDDK)",
  "National Institute on Drug Abuse (NIDA)",
  "National Institute of Environmental Health Sciences (NIEHS)",
  "National Institute of General Medical Sciences (NIGMS)",
  "National Institute of Mental Health (NIMH)",
  "National Institute on Minority Health and Health Disparities (NIMHD)",
  "National Institute of Neurological Disorders and Stroke (NINDS)",
  "National Institute of Nursing Research (NINR)",
  "National Library of Medicine (NLM)",
  "National Center for Advancing Translational Sciences (NCATS)",
  "National Center for Complementary and Integrative Health (NCCIH)",
  "Fogarty International Center (FIC)",
  "Office of the Director (NIH Office of the Director)",
  // … you can include additional NIH offices/centers as needed
];

const agency = ref('')
const projectSummary = ref('')
const dataTypeItems = ref(['Genomic data', 'Survey responses', 'Imaging', 'Clinical records'])
const dataType = ref('')
const dataSource = ref('')
const humanSubjectsItems = ref(['Yes', 'No'])
const humanSubjects = ref('No')
const dataSharing = ref('')
const dataVolume = ref('')
</script>

<template>
  <div class="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-blue-300 to-white dark:from-blue-800 dark:to-transparent -z-10"></div>
  <div class="mx-auto flex w-full max-w-screen-xl flex-col gap-6 px-6">
    <UPageHeader
      description="Provide key project details below to generate a funder-compliant Data Management Plan."
    >
      <template #title>
        <h1 class="text-4xl font-bold text-blue-500 dark:text-blue-300">
          DMP Drafting
        </h1>
      </template>
      
    </UPageHeader>

    <div class="flex items-center justify-between gap-6">
      <h1 class="font-medium text-xl w-1/3">Select Funding Agency:</h1>
      <div class="w-2/3">
        <USelectMenu class="w-180 text-base" v-model="agency" :items="agencyItems" placeholder="Choose agency" />
      </div>
    </div>

    <div class="flex items-center justify-between gap-6">
      <h1 class="font-medium text-xl w-1/3">Brief summary of the research context:</h1>
      <div class="w-2/3">
        <UTextarea size="xl" placeholder="Describe scientific goals and objectives of the study." 
          autoresize class="w-180" v-model="projectSummary" />
      </div>
    </div>

    <div class="flex items-center justify-between gap-6">
      <h1 class="font-medium text-xl w-1/3">Types of data to be collected:</h1>
      <div class="w-2/3">
        <USelectMenu class="w-180 text-base" v-model="dataType" :items="dataTypeItems" placeholder="Choose data type" />
      </div>
    </div>
    
    <div class="flex items-center justify-between gap-6">
      <h1 class="font-medium text-xl w-1/3">Source of data:</h1>
      <div class="w-2/3">
        <UTextarea size="xl" placeholder="Clearly identify whether data comes from human participants, clinical instruments, digital sensors, or other sources." 
          autoresize class="w-180" v-model="dataSource" />
      </div>
    </div>

    <div class="flex items-center justify-between gap-6">
      <h1 class="font-medium text-xl w-1/3">Human subjects:</h1>
      <div class="w-2/3">
        <URadioGroup orientation="horizontal" indicator="end" variant="card" default-value="System" v-model="humanSubjects" :items="humanSubjectsItems" />
      </div>
    </div>

    <div class="flex items-center justify-between gap-6">
      <h1 class="font-medium text-xl w-1/3">Data sharing consent status (if applicable):</h1>
      <div class="w-2/3">
        <UTextarea size="xl" placeholder="Describe whether broad sharing has been approved or if any restrictions apply." 
          autoresize class="w-180" v-model="dataSharing" />
      </div>
    </div>

    <div class="flex items-center justify-between gap-6">
      <h1 class="font-medium text-xl w-1/3">Estimated data volume, modality, and format:</h1>
      <div class="w-2/3">
        <UTextarea size="xl" placeholder="include structured vs. unstructured data and expected file formats (e.g., CSV, DICOM, JSON)" 
          autoresize class="w-180" v-model="dataVolume" />
      </div>
    </div>
    
    <div class="flex justify-center pt-4">
      <UButton
        to="/app/dmp1"
        color="primary"
        size="xl"
        class="w-45"
        icon="i-lucide-sparkles"
      >
        Generate DMP
      </UButton>
    </div>
    <SkyBg />
  </div>
</template>
