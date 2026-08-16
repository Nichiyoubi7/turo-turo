<script setup lang="ts">
import { menuK12 } from '~/data/menuK12'
import { menuCollege } from '~/data/menuCollege'

const store = useOrderStore()
const draft = useOrderDraft()

const form = reactive({
  customer_name: '',
  facebook_link: '',
  contact_number: '',
  segment: draft.value.service ? draft.value.segment : 'elementary',
  service: draft.value.service || '',
  subject: '',
  coverage: '',
  notes: ''
})

const errors = reactive({
  customer_name: '',
  contact_number: '',
  service: '',
  template: ''
})

const templateFile = ref<File | null>(null)
const fileInput = ref<HTMLInputElement | null>(null)

const ALLOWED_EXTENSIONS = ['pdf', 'doc', 'docx', 'ppt', 'pptx', 'jpg', 'jpeg', 'png']
const MAX_FILE_MB = 10

function handleFileChange(e: Event) {
  const file = (e.target as HTMLInputElement).files?.[0] ?? null
  errors.template = ''

  if (!file) {
    templateFile.value = null
    return
  }

  const ext = file.name.split('.').pop()?.toLowerCase() ?? ''
  if (!ALLOWED_EXTENSIONS.includes(ext)) {
    errors.template = 'PDF, Word, PPT, o larawan lang ang tinatanggap.'
    templateFile.value = null
    if (fileInput.value) fileInput.value.value = ''
    return
  }

  if (file.size > MAX_FILE_MB * 1024 * 1024) {
    errors.template = `Masyadong malaki ang file — max ${MAX_FILE_MB}MB lang.`
    templateFile.value = null
    if (fileInput.value) fileInput.value.value = ''
    return
  }

  templateFile.value = file
}

function removeFile() {
  templateFile.value = null
  errors.template = ''
  if (fileInput.value) fileInput.value.value = ''
}

watch(draft, (val) => {
  if (val.service) {
    form.segment = val.segment
    form.service = val.service
    errors.service = ''
  }
}, { deep: true })

const serviceOptions = computed(() =>
  form.segment === 'college' ? menuCollege : menuK12
)

const segments = [
  { value: 'elementary', label: 'Elementary' },
  { value: 'junior_high', label: 'Junior High' },
  { value: 'senior_high', label: 'Senior High' },
  { value: 'college', label: 'College' }
]

watch(() => form.segment, () => {
  form.service = ''
})

function validate(): boolean {
  errors.customer_name = form.customer_name.trim() ? '' : 'Kailangan ang pangalan mo.'
  errors.contact_number = form.contact_number.trim() ? '' : 'Kailangan ang contact number mo.'
  errors.service = form.service ? '' : 'Piliin ang service na gusto mo.'

  return !errors.customer_name && !errors.contact_number && !errors.service && !errors.template
}

async function handleSubmit() {
  if (!validate()) return
  await store.submitOrder({ ...form }, templateFile.value)
}

function startOver() {
  store.reset()
  form.customer_name = ''
  form.facebook_link = ''
  form.contact_number = ''
  form.subject = ''
  form.coverage = ''
  form.notes = ''
  errors.customer_name = ''
  errors.contact_number = ''
  errors.service = ''
  removeFile()
}
</script>

<template>
  <div class="max-w-[520px] mx-auto text-left">
    <div v-if="store.submitted" class="bg-cream text-charcoal rounded-lg px-6 py-10 text-center">
      <div class="w-14 h-14 rounded-full bg-red text-cream flex items-center justify-center text-2xl font-bold mx-auto mb-4">
        ✓
      </div>
      <div class="font-poster text-xl mb-2">Order received!</div>
      <p class="text-[#5B5548] mb-6">
        Padadalhan kita ng quote sa loob ng araw. Salamat!
      </p>
      <button
        class="text-red font-semibold text-sm underline focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-gold"
        @click="startOver"
      >
        Submit another order
      </button>
    </div>

    <form v-else class="bg-cream text-charcoal rounded-lg px-6 py-7 space-y-6" novalidate @submit.prevent="handleSubmit">
      <div class="space-y-4">
        <div class="text-red text-[0.72rem] font-bold tracking-[0.08em] uppercase">Iyong impormasyon</div>

        <div>
          <label class="block text-sm font-semibold mb-1.5" for="customer_name">
            Pangalan <span class="text-red">*</span>
          </label>
          <input
            id="customer_name"
            v-model="form.customer_name"
            type="text"
            class="w-full px-3.5 py-3 rounded-md border text-base focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-gold"
            :class="errors.customer_name ? 'border-red' : 'border-steel/50'"
            @input="errors.customer_name = ''"
          >
          <p v-if="errors.customer_name" class="text-red text-xs font-medium mt-1">{{ errors.customer_name }}</p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <div>
            <label class="block text-sm font-semibold mb-1.5" for="contact_number">
              Contact number <span class="text-red">*</span>
            </label>
            <input
              id="contact_number"
              v-model="form.contact_number"
              type="text"
              placeholder="09XX XXX XXXX"
              class="w-full px-3.5 py-3 rounded-md border text-base focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-gold"
              :class="errors.contact_number ? 'border-red' : 'border-steel/50'"
              @input="errors.contact_number = ''"
            >
            <p v-if="errors.contact_number" class="text-red text-xs font-medium mt-1">{{ errors.contact_number }}</p>
          </div>
          <div>
            <label class="block text-sm font-semibold mb-1.5" for="facebook_link">
              Facebook name <span class="text-steel font-normal">(optional)</span>
            </label>
            <input
              id="facebook_link"
              v-model="form.facebook_link"
              type="text"
              placeholder="Juan Dela Cruz"
              class="w-full px-3.5 py-3 rounded-md border border-steel/50 text-base focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-gold"
            >
            <p class="text-xs text-steel mt-1">Para mas madali kang mahanap sa Messenger.</p>
          </div>
        </div>
      </div>

      <div class="space-y-4 pt-2 border-t border-steel/20">
        <div class="text-red text-[0.72rem] font-bold tracking-[0.08em] uppercase pt-4">Detalye ng order</div>

        <div>
          <label class="block text-sm font-semibold mb-1.5" for="segment">Grade level <span class="text-red">*</span></label>
          <select
            id="segment"
            v-model="form.segment"
            class="w-full px-3.5 py-3 rounded-md border border-steel/50 text-base focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-gold"
          >
            <option v-for="s in segments" :key="s.value" :value="s.value">{{ s.label }}</option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-semibold mb-1.5" for="service">Service <span class="text-red">*</span></label>
          <select
            id="service"
            v-model="form.service"
            class="w-full px-3.5 py-3 rounded-md border text-base focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-gold"
            :class="errors.service ? 'border-red' : 'border-steel/50'"
            @change="errors.service = ''"
          >
            <option value="" disabled>Piliin ang service</option>
            <option v-for="item in serviceOptions" :key="item.name" :value="item.name">{{ item.name }}</option>
          </select>
          <p v-if="errors.service" class="text-red text-xs font-medium mt-1">{{ errors.service }}</p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <div>
            <label class="block text-sm font-semibold mb-1.5" for="subject">
              Subject <span class="text-steel font-normal">(optional)</span>
            </label>
            <input
              id="subject"
              v-model="form.subject"
              type="text"
              class="w-full px-3.5 py-3 rounded-md border border-steel/50 text-base focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-gold"
            >
          </div>
          <div>
            <label class="block text-sm font-semibold mb-1.5" for="coverage">
              Coverage <span class="text-steel font-normal">(optional)</span>
            </label>
            <input
              id="coverage"
              v-model="form.coverage"
              type="text"
              placeholder="Week 3 / Quarter 2"
              class="w-full px-3.5 py-3 rounded-md border border-steel/50 text-base focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-gold"
            >
          </div>
        </div>
      </div>

      <div class="space-y-4 pt-2 border-t border-steel/20">
        <div class="text-red text-[0.72rem] font-bold tracking-[0.08em] uppercase pt-4">Karagdagang detalye</div>

        <div>
          <label class="block text-sm font-semibold mb-1.5" for="notes">
            Notes <span class="text-steel font-normal">(optional)</span>
          </label>
          <textarea
            id="notes"
            v-model="form.notes"
            rows="3"
            placeholder="May sarili kang template o format na susundin? Ilagay dito ang detalye."
            class="w-full px-3.5 py-3 rounded-md border border-steel/50 text-base focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-gold"
          />
        </div>

        <div>
          <label class="block text-sm font-semibold mb-1.5" for="template">
            Attach a template <span class="text-steel font-normal">(optional)</span>
          </label>
          <p class="text-xs text-steel mb-2">
            May sarili kang template, module format, o reference file? I-attach dito — susundin namin ito. PDF, Word, PPT, o larawan, max 10MB.
          </p>

          <div v-if="!templateFile">
            <input
              id="template"
              ref="fileInput"
              type="file"
              accept=".pdf,.doc,.docx,.ppt,.pptx,.jpg,.jpeg,.png"
              class="w-full text-sm file:mr-3 file:px-3.5 file:py-2 file:rounded-md file:border-0 file:bg-gold file:text-charcoal file:font-semibold file:text-sm text-steel focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-gold rounded"
              @change="handleFileChange"
            >
          </div>
          <div v-else class="flex items-center justify-between gap-3 px-3.5 py-2.5 rounded-md border border-steel/50 bg-gold/10">
            <span class="text-sm truncate">📎 {{ templateFile.name }}</span>
            <button
              type="button"
              class="text-red text-xs font-semibold underline shrink-0 focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-gold rounded"
              @click="removeFile"
            >
              Alisin
            </button>
          </div>
          <p v-if="errors.template" class="text-red text-xs font-medium mt-1">{{ errors.template }}</p>
        </div>
      </div>

      <p v-if="store.error" class="text-red text-sm font-medium">{{ store.error }}</p>

      <button
        type="submit"
        :disabled="store.submitting"
        class="w-full px-7 py-3.5 rounded-md font-bold text-[0.92rem] bg-red text-cream transition-transform hover:-translate-y-0.5 disabled:opacity-60 disabled:hover:translate-y-0 focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-gold focus-visible:outline-offset-2"
      >
        {{ store.submitting ? 'Sending...' : 'Send Order Request' }}
      </button>
    </form>
  </div>
</template>