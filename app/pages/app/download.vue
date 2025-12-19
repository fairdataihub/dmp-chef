<script setup lang="ts">
import { saveAs } from 'file-saver'
import { Document, Packer, Paragraph, TextRun } from 'docx'
import { jsPDF } from 'jspdf'

// DMP state
const dmpStore = useState('dmp-data')
const dmp = computed(() => dmpStore.value)

// Redirect if no DMP
if (!dmp.value) {
  navigateTo('/app/dmp')
}

// Download format options
const downloadItems = ref([
  { label: 'DOCX', value: 'docx', description: 'Word document' },
  { label: 'PDF', value: 'pdf', description: 'PDF file' },
  { label: 'JSON', value: 'json', description: 'Structured JSON' }
])
const selectedFormat = ref('json')

const isFeedbackModalOpen = ref(false)
const feedbackStep = ref(1) // 1 = Faces, 2 = Comment box
const userRating = ref<'yes' | 'no' | null>(null)
const userComment = ref('')

// Update the handleDownload function to open the modal
async function handleDownload() {
  if (!dmp.value) return

  // 1. Perform the actual download
  switch (selectedFormat.value) {
    case 'json':
      downloadJSON()
      break
    case 'docx':
      await downloadDOCX()
      break
    case 'pdf':
      downloadPDF()
      break
  }

  // 2. Open the feedback modal (Reset state first)
  feedbackStep.value = 1
  userRating.value = null
  userComment.value = ''
  isFeedbackModalOpen.value = true
}

// Handle the user clicking a Face button
function handleRating(rating: 'yes' | 'no') {
  userRating.value = rating
  feedbackStep.value = 2 // Move to next step
}

// Final Submit
function submitFeedback() {
  // Logic to send data to backend would go here later
  console.log('Feedback:', { rating: userRating.value, comment: userComment.value })
  
  // Close modal
  isFeedbackModalOpen.value = false
}

// JSON
function downloadJSON() {
  const blob = new Blob([JSON.stringify(dmp.value, null, 2)], { type: 'application/json' })
  saveAs(blob, 'DMP.json')
}

// DOCX
async function downloadDOCX() {
  const doc = new Document({
    sections: [
      {
        properties: {},
        children: Object.entries(dmp.value).map(([key, value]: any) =>
          new Paragraph({
            children: [
              new TextRun({ text: key, bold: true, size: 28 }),
              new TextRun({ text: '\n' + JSON.stringify(value, null, 2), size: 24 }),
            ],
            spacing: { after: 200 }
          })
        ),
      },
    ],
  })

  const blob = await Packer.toBlob(doc)
  saveAs(blob, 'DMP.docx')
}

// PDF
function downloadPDF() {
  const doc = new jsPDF()
  let y = 10

  for (const [key, value] of Object.entries(dmp.value)) {
    doc.setFontSize(14)
    doc.text(key, 10, y)
    y += 8
    doc.setFontSize(12)

    const lines = doc.splitTextToSize(JSON.stringify(value, null, 2), 180)
    doc.text(lines, 10, y)
    y += lines.length * 6 + 10

    // New page if too long
    if (y > 280) y = 10, doc.addPage()
  }

  doc.save('DMP.pdf')
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
    description: 'Completed',
    icon: 'line-md:confirm-circle',
    ui: {
      description: 'text-blue-400',
    },
  },
  {
    date: 'Step 3',
    title: 'Download',
    description: 'In Progress',
    icon: 'line-md:confirm-circle-twotone-to-circle-twotone-transition',
    ui: {
      description: 'text-blue-400',
    },
  }
])
</script>

<template>
  <div class="relative">
    <!-- Background -->
    <div class="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-blue-300 to-white dark:from-blue-800 dark:to-transparent -z-10"></div>

    <div class="mx-auto flex w-full max-w-screen-xl flex-col gap-6 px-6 pt-6">
      <!-- Header -->
      <h1 class="text-4xl font-bold text-blue-500 dark:text-blue-300 mb-6 mt-6">
        Test DMP Chef 
      </h1>
      <UTimeline orientation="horizontal" :default-value="2" :items="items" size="sm" class="w-full mb-6 ml-30" />
      <div class="bg-gray-50 border border-gray-200 rounded-lg p-6 dark:bg-gray-800 dark:border-gray-700">
        <span class="inline-block bg-indigo-600 text-white text-xs font-bold px-2 py-1 rounded mb-3 uppercase tracking-wide dark:bg-indigo-500">
          Action Required
        </span>
        <p class="text-lg text-gray-800 font-medium dark:text-gray-100">
          Export the final DMP in your preferred format (JSON, DOCX, or PDF).
        </p>
      </div>

      <!-- Format selection -->
      <div class="space-y-2">
        <p class="text-base text-gray-600 dark:text-gray-400">Select format:</p>
        <URadioGroup
          v-model="selectedFormat"
          color="primary"
          variant="card"
          :items="downloadItems"
        />
      </div>

      
<div class="flex items-center justify-between mt-8">
              <UButton 
        color="primary"
        size="xl"
        class="w-25"
        icon="ooui:arrow-next-rtl"
        to="/app/dmp1"
      >
        Back
      </UButton>

        <UModal title="Feedback">
          <UButton
            color="primary"
            size="xl"
            class="w-40"
            icon="material-symbols:download-rounded"
            @click="handleDownload" 
          >
            Download
          </UButton>

          <template #body>
            <div class="p-6 sm:p-8">
              
              <div v-if="feedbackStep === 1" class="flex flex-col items-center space-y-6">
                <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                  Was this page helpful?
                </h3>
                
                <div class="flex gap-8">
                  <button 
                    @click="handleRating('yes')"
                    class="group flex flex-col items-center gap-2 p-4 rounded-xl hover:bg-green-50 dark:hover:bg-green-900/20 transition-all border-2 border-transparent hover:border-green-200"
                  >
                    <UIcon name="i-heroicons-face-smile" class="w-16 h-16 text-gray-400 group-hover:text-green-500 transition-colors" />
                    <span class="font-medium text-gray-600 dark:text-gray-300 group-hover:text-green-600">Yes</span>
                  </button>

                  <button 
                    @click="handleRating('no')"
                    class="group flex flex-col items-center gap-2 p-4 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 transition-all border-2 border-transparent hover:border-red-200"
                  >
                    <UIcon name="i-heroicons-face-frown" class="w-16 h-16 text-gray-400 group-hover:text-red-500 transition-colors" />
                    <span class="font-medium text-gray-600 dark:text-gray-300 group-hover:text-red-600">No</span>
                  </button>
                </div>
              </div>

              <div v-else class="space-y-4">
                <div class="text-center">
                  <h3 class="text-xl font-bold text-gray-900 dark:text-white">
                    Thank you for your feedback!
                  </h3>
                  <p class="text-sm text-gray-500 mt-1">
                    Would you like to leave any additional comments?
                  </p>
                </div>

                <UTextarea 
                  v-model="userComment"
                  :rows="4" 
                  autoresize 
                  placeholder="Any additional comments?" 
                  class="w-full" 
                />

                <div class="flex justify-end pt-2">
                  <UButton
                    color="primary"
                    size="lg"
                    block
                    @click="submitFeedback"
                  >
                    Send Feedback
                  </UButton>
                </div>
              </div>

            </div>
          </template>
        </UModal>
      </div>
      <SkyBg />
    </div>
  </div>
</template>
