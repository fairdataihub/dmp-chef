<script setup lang="ts">
// definePageMeta({
//   middleware: ["auth"],
// });
import { DotLottieVue } from '@lottiefiles/dotlottie-vue'

// --- State Variables for Form and Loader ---
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
const dataType = ref<string | null>(null)

const dataTypeItems = ref<string[]>([
  'Imaging',
  'Surveys',
  'Genomic data',
  'Clinical records'
])

function onCreateDataType(value: string) {
  dataTypeItems.value.push(value)
  dataType.value = value
}

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

// --- Loader State ---
const isGenerating = ref(false)

async function generateDMP() {
  // 1. Set the loading state to true (This opens the UModal)
  isGenerating.value = true;
  
  const payload = {
    agency: agency.value,
    projectSummary: projectSummary.value,
    dataType: dataType.value,
    dataSource: dataSource.value,
    humanSubjects: humanSubjects.value,
    dataSharing: dataSharing.value,
    dataVolume: dataVolume.value,
  };

  try {
    // ======== REAL API CALL ========
    const res = await $fetch('/api/query', {
      method: 'POST',
      body: payload,
    });

    // Expecting backend response shape:
    // {
    //   data: { llama3: {...} },
    //   message: "..."
    // }

    const modelKey = 'llama3:8b';

    if (!res?.data?.[modelKey]) {
      throw new Error(`DMP generator response missing key: ${modelKey}`);
    }

    // Store generated DMP
    dmpStore.value = res.data[modelKey];
    // ======= Hardcoded response for frontend testing =======
    // Simulate API delay
    // await new Promise(resolve => setTimeout(resolve, 3000)); // 3 second delay

    // const mockRes = {
    //   data: {
    //     llama3: {
    //       "Element 1: Data Type": {
    //         "1": {
    //           title: "Types and amount of scientific data expected to be generated in the project",
    //           description: "The project expects to generate approximately 500 GB of genomic data, including FASTQ, BAM, and CSV files."
    //         },
    //         "2": {
    //           title: "Scientific data that will be preserved and shared, and the rationale for doing so",
    //           description: "All generated genomic data will be preserved and shared in a publicly accessible repository, as de-identified data can provide valuable insights into immune responses to viral antigens."
    //         },
    //         "3": {
    //           title: "Metadata, other relevant data, and associated documentation",
    //           description: "Study protocols, data collection instruments, and metadata describing the experimental design and sample characteristics will be made accessible to facilitate interpretation of the scientific data."
    //         }
    //       },
    //       "Element 2: Related Tools, Software and/or Code": {
    //         description: "The FASTQ, BAM, and CSV files can be accessed using standard bioinformatics tools and software. Additional tools may be needed for specific analysis steps."
    //       },
    //       "Element 3: Standards": {
    //         description: "The project will adhere to the following data standards: Fastq-XML, SAM/BAM, and CSV. These standards enable interoperability of datasets and resources."
    //       },
    //       "Element 4: Data Preservation, Access, and Associated Timelines": {
    //         "1": {
    //           title: "Repository where scientific data and metadata will be archived",
    //           description: "The scientific data and metadata will be archived in the National Institute of Allergy and Infectious Diseases (NIAID) Biodefense Research Database."
    //         },
    //         "2": {
    //           title: "How scientific data will be findable and identifiable",
    //           description: "Scientific data will be made findable through a persistent unique identifier, such as a DOI or accession number."
    //         },
    //         "3": {
    //           title: "When and how long the scientific data will be made available",
    //           description: "The scientific data will be made publicly available within 6 months of project completion. Data will remain accessible for at least 5 years from the date of initial release."
    //         }
    //       },
    //       "Element 5: Access, Distribution, or Reuse Considerations": {
    //         "1": {
    //           title: "Factors affecting subsequent access, distribution, or reuse of scientific data",
    //           description: "The project will ensure that all generated data are de-identified and publicly accessible, with no restrictions on subsequent access, distribution, or reuse."
    //         },
    //         "2": {
    //           title: "Whether access to scientific data will be controlled",
    //           description: "Access to the scientific data will not be controlled; it will be made available through a public repository."
    //         },
    //         "3": {
    //           title: "Protections for privacy, rights, and confidentiality of human research participants",
    //           description: "As de-identified genomic data are being shared, protections for privacy, rights, and confidentiality of human research participants are ensured through broad consent obtained."
    //         }
    //       },
    //       "Element 6: Oversight of Data Management and Sharing": {
    //         description: "The Principal Investigator will be responsible for ensuring compliance with this Plan. Quarterly progress reports will be submitted to the NIAID Program Official, and a final report detailing data management and sharing efforts will be submitted within 90 days of project completion."
    //       }
    //     }
    //   },
    //   message: "DMSP generated successfully for Immune Response Study"
    // };

    // // Use mock response
    // dmpStore.value = mockRes.data.llama3;
    // console.log(mockRes.data.llama3);

    // 3. Hide the loader
    isGenerating.value = false;

    // 4. Navigate to the next page
    navigateTo('/app/dmp1');

  } catch (err) {
    console.error(err);
    // Ensure loader is hidden on error
    isGenerating.value = false; 
  }
}
</script>

<template>
  <div class="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-blue-300 to-white dark:from-blue-800 dark:to-transparent -z-10"></div>
  <div class="mx-auto flex w-full max-w-screen-xl flex-col gap-6 px-6">
    <h1 class="text-4xl font-bold text-blue-500 dark:text-blue-300 mb-6 mt-6">
      Test DMP Chef
    </h1>
    <div class="p-4 rounded-lg bg-amber-50 dark:bg-amber-900 border border-amber-200 dark:border-amber-800 flex items-start space-x-3">
      <UIcon name="i-heroicons-exclamation-triangle-20-solid" class="w-5 h-5 flex-shrink-0 text-amber-500 dark:text-amber-300" />
      <div>
        <h3 class="text-sm font-medium text-amber-800 dark:text-amber-100">
          This page is meant only for testing and validating the DMP Chef Python pipeline. 
      Ultimately, the DMP Chef pipeline will be integrated in DMPTool.org to provide researchers with a 
      familiar and convenient user interface that does not require any coding knowledge.
      </h3>
      </div>
    </div>
    

    <UTimeline orientation="horizontal" :default-value="0.5" :items="items" size="sm" class="w-full mb-6 ml-30" />
    <div class="bg-gray-50 border border-gray-200 rounded-lg p-6 dark:bg-gray-800 dark:border-gray-700">
      <span class="inline-block bg-indigo-600 text-white text-xs font-bold px-2 py-1 rounded mb-3 uppercase tracking-wide dark:bg-indigo-500">
        Action Required
      </span>
      <p class="text-lg text-gray-800 font-medium dark:text-gray-100">
        Provide essential information about your research project so DMP Chef can generate a Data Management Plan that meets your funder’s requirements.
      </p>
    </div>
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
        <USelectMenu
  class="w-180 text-base"
  v-model="dataType"
  :items="dataTypeItems"
  placeholder="Specify the kinds of data your project will generate (e.g., imaging, surveys, genomic data)."
  searchable
  :create-item="{ when: 'empty', position: 'bottom' }"
  @create="onCreateDataType"
/>

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
      <UModal v-model="isGenerating" prevent-close :ui="{ width: 'sm:max-w-md' }">
        
        <UButton
          :loading="isGenerating"
          @click="generateDMP"
          color="primary"
          size="xl"
          class="w-45"
          icon="i-lucide-sparkles"
        >
          Generate DMP
        </UButton>

        <template #content>
          <div class="p-4 flex flex-col items-center justify-center">
            <DotLottieVue 
              style="height: 200px; width: 200px" 
              autoplay 
              loop 
              src="https://lottie.host/5cf19f5c-069f-4fe3-b34d-d339768dab6e/yqwsIi0a0D.lottie" 
            />
            <p class="text-lg font-medium text-gray-700 dark:text-gray-200 mt-4">Cooking your DMP...</p>
            <p class="text-sm text-gray-500 dark:text-gray-400">This may take a moment.</p>
          </div>
        </template>
      </UModal>
    </div>

    <SkyBg />
  </div>
</template>