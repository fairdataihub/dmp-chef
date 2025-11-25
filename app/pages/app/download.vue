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

// Download handler
async function handleDownload() {
  if (!dmp.value) return

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
        Draft DMP 
      </h1>
      <UTimeline orientation="horizontal" :default-value="2" :items="items" size="sm" class="w-full mb-6 ml-30" />
      <p class="text-lg">Export the final DMP in your preferred format (JSON, DOCX, or PDF).</p>
      <USeparator class="mb-6" />

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

      
  <UModal title="Feedback">
    <!-- Download button -->
      <div class="flex justify-center pt-4">
        <UButton
          color="primary"
          size="xl"
          class="w-40"
          icon="material-symbols:download-rounded"
          @click="handleDownload"
        >
          Download
        </UButton>
      </div>

    <template #body>
      <div class="space-y-2">
      <p class="text-xl text-center">
        The file has been downloaded successfully! We welcome any feedback you may have.
      </p>
      <UTextarea :rows="8" autoresize placeholder="Give feedback" class="w-full" v-model="value" />
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
    </template>
  </UModal>
      <SkyBg />
    </div>
  </div>
</template>
