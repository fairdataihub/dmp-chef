<script setup lang="ts">
// definePageMeta({
//   middleware: ["auth"],
// });

const selectedAgency = ref('') 
const agencyItems = ref([
  { label: 'NIH', value: 'NIH' },
  { label: 'NSF', value: 'NSF', disabled: true }, // grayed out
])
const NIHAgencyItems = [
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
const dmpStore = useState('dmp-data', () => null)
const items = ref([
  {
    date: 'Step 1',
    title: 'Project Details',
    description: 'In Progress',
    icon: 'line-md:confirm-circle-twotone-to-circle-twotone-transition',
    ui: {
      description: 'text-blue-400',
    },
  },
  {
    date: 'Step 2',
    title: 'Draft Review',
    description: 'Pending',
    icon: 'line-md:confirm-circle-twotone-to-circle-transition'
  },
  {
    date: 'Step 3',
    title: 'Download',
    description: 'Pending',
    icon: 'line-md:confirm-circle-twotone-to-circle-transition'
  }
])

async function generateDMP() {
  const payload = {
    agency: agency.value,
    projectSummary: projectSummary.value,
    dataType: dataType.value,
    dataSource: dataSource.value,
    humanSubjects: humanSubjects.value,
    dataSharing: dataSharing.value,
    dataVolume: dataVolume.value
  }

  try {
    const res = await $fetch('/api/query', {
      method: 'POST',
      body: payload
    })

    // save into global nuxt state
    dmpStore.value = res.data.llama3
    console.log(res.data.llama3)
    // navigate to page 1
    navigateTo('/app/dmp1')

  } catch (err) {
    console.error(err)
  }
}

</script>

<template>
  <div class="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-blue-300 to-white dark:from-blue-800 dark:to-transparent -z-10"></div>
  <div class="mx-auto flex w-full max-w-screen-xl flex-col gap-6 px-6">
    <h1 class="text-4xl font-bold text-blue-500 dark:text-blue-300 mb-6 mt-6">
      Draft DMP 
    </h1>
    <UTimeline orientation="horizontal" :default-value="0.5" :items="items" size="sm" class="w-full mb-6 ml-30" />
    <p class="text-lg">Provide essential information about your research project so DMP Chef can generate a Data Management Plan that meets your funder’s requirements.</p>
    <USeparator class="mb-6" />
    <div class="flex items-center justify-between gap-6 ml-60 mb-6">
      <h1 class="font-medium text-xl w-1/3">Funding Agency:</h1>
      <div class="w-2/3">
        <URadioGroup
          variant="card"
          orientation="horizontal"
          v-model="selectedAgency"
          :items="agencyItems"
        />
      </div>
    </div>

    <div v-if="selectedAgency === 'NIH'" class="flex items-center justify-between gap-6">
      <h1 class="font-medium text-xl w-1/3">Select Institute/Department:</h1>
      <div class="w-2/3">
        <USelectMenu
          class="w-180 text-base"
          v-model="agency"
          :items="NIHAgencyItems"
          placeholder="Choose department or institute"
        />
      </div>
    </div>

    <div v-if="selectedAgency === 'NIH'" class="flex items-center justify-between gap-6">
      <h1 class="font-medium text-xl w-1/3">Brief summary of the research context:</h1>
      <div class="w-2/3">
        <UTextarea size="xl" placeholder="Provide a short description of the research goals, setting, and scientific background." 
          autoresize class="w-180" v-model="projectSummary" />
      </div>
    </div>

    <div v-if="selectedAgency === 'NIH'" class="flex items-center justify-between gap-6">
      <h1 class="font-medium text-xl w-1/3">Types of data to be collected:</h1>
      <div class="w-2/3">
        <USelectMenu class="w-180 text-base" v-model="dataType" :items="dataTypeItems" placeholder="Specify the kinds of data your project will generate (e.g., imaging, surveys, genomic data)." />
      </div>
    </div>
    
    <div v-if="selectedAgency === 'NIH'" class="flex items-center justify-between gap-6">
      <h1 class="font-medium text-xl w-1/3">Source of data:</h1>
      <div class="w-2/3">
        <UTextarea size="xl" placeholder="Describe where or how the data will be obtained (e.g., participants, sensors, public datasets)." 
          autoresize class="w-180" v-model="dataSource" />
      </div>
    </div>

    <div v-if="selectedAgency === 'NIH'" class="flex items-center justify-between gap-6">
      <h1 class="font-medium text-xl w-1/3">Human subjects:</h1>
      <div class="w-2/3">
        <URadioGroup orientation="horizontal" variant="card" default-value="System" v-model="humanSubjects" :items="humanSubjectsItems" />
      </div>
    </div>

    <div v-if="selectedAgency === 'NIH'" class="flex items-center justify-between gap-6">
      <h1 class="font-medium text-xl w-1/3">Data sharing consent status (if applicable):</h1>
      <div class="w-2/3">
        <UTextarea size="xl" placeholder="Provide the consent status for sharing data collected from human subjects, if relevant." 
          autoresize class="w-180" v-model="dataSharing" />
      </div>
    </div>

    <div v-if="selectedAgency === 'NIH'" class="flex items-center justify-between gap-6">
      <h1 class="font-medium text-xl w-1/3">Estimated data volume, modality, and format:</h1>
      <div class="w-2/3">
        <UTextarea size="xl" placeholder="Enter the approximate amount of data and its expected modality (e.g., text, images) and file format (e.g., CSV, JPEG, JSON)." 
          autoresize class="w-180" v-model="dataVolume" />
      </div>
    </div>
    
    <div v-if="selectedAgency === 'NIH'" class="flex justify-center pt-4">
      <UButton
        loading-auto
        @click="generateDMP"
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
