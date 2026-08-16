<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'auth' })

interface OrderRow {
  id: number
  customer_name: string
  facebook_link: string | null
  contact_number: string | null
  segment: string
  service: string
  subject: string | null
  coverage: string | null
  notes: string | null
  template_path: string | null
  status: string
  quoted_price: string | null
  created_at: string
}

interface OrdersResponse {
  data: OrderRow[]
  current_page: number
  last_page: number
  total: number
}

const { get, put, baseURL } = useApi()

const storageRoot = computed(() => baseURL.replace(/\/api\/?$/, ''))
function templateUrl(path: string) {
  return `${storageRoot.value}/storage/${path}`
}

const orders = ref<OrderRow[]>([])
const page = ref(1)
const lastPage = ref(1)
const total = ref(0)
const search = ref('')
const statusFilter = ref('')
const loading = ref(false)
const savingId = ref<number | null>(null)

const statuses = ['pending', 'confirmed', 'in_progress', 'delivered', 'cancelled']

const draft = reactive<Record<number, { status: string; quoted_price: string }>>({})

async function fetchOrders() {
  loading.value = true
  try {
    const res = await get<OrdersResponse>('/orders', {
      page: page.value,
      search: search.value || undefined,
      status: statusFilter.value || undefined
    })
    orders.value = res.data
    lastPage.value = res.last_page
    total.value = res.total
    for (const o of res.data) {
      draft[o.id] = { status: o.status, quoted_price: o.quoted_price ?? '' }
    }
  } finally {
    loading.value = false
  }
}

async function saveOrder(order: OrderRow) {
  const d = draft[order.id]
  savingId.value = order.id
  try {
    await put(`/orders/${order.id}/status`, {
      status: d.status,
      quoted_price: d.quoted_price === '' ? null : Number(d.quoted_price)
    })
    await fetchOrders()
  } finally {
    savingId.value = null
  }
}

function handleSearch() {
  page.value = 1
  fetchOrders()
}

watch([page, statusFilter], fetchOrders)
onMounted(fetchOrders)
</script>

<template>
  <div class="max-w-5xl mx-auto">
    <div class="flex flex-wrap items-center justify-between gap-3 mb-6">
      <h1 class="font-poster text-cream text-lg">Orders ({{ total }})</h1>
      <div class="flex flex-wrap gap-2">
        <input v-model="search" type="text" placeholder="Search name/service..." class="px-3 py-2 rounded-md text-sm border border-steel/40 bg-cream focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-gold" @keyup.enter="handleSearch">
        <select v-model="statusFilter" class="px-3 py-2 rounded-md text-sm border border-steel/40 bg-cream focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-gold">
          <option value="">All statuses</option>
          <option v-for="s in statuses" :key="s" :value="s">{{ s }}</option>
        </select>
        <button class="px-3 py-2 rounded-md text-sm bg-gold text-charcoal font-semibold focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-cream" @click="handleSearch">Search</button>
      </div>
    </div>

    <div v-if="loading" class="text-cream/60 text-sm">Loading...</div>

    <div v-else class="space-y-3">
      <div v-for="order in orders" :key="order.id" class="bg-cream text-charcoal rounded-lg px-5 py-4">
        <div class="flex flex-wrap justify-between gap-3 mb-2">
          <div>
            <div class="font-bold">{{ order.customer_name }}</div>
            <div class="text-xs text-steel">{{ order.segment }} · {{ order.service }}</div>
          </div>
          <div class="text-xs text-steel text-right">
            <div v-if="order.facebook_link">{{ order.facebook_link }}</div>
            <div v-if="order.contact_number">{{ order.contact_number }}</div>
          </div>
        </div>

        <div v-if="order.subject || order.coverage" class="text-sm mb-2">
          <span v-if="order.subject">{{ order.subject }}</span>
          <span v-if="order.coverage"> · {{ order.coverage }}</span>
        </div>
        <p v-if="order.notes" class="text-sm text-steel mb-2">"{{ order.notes }}"</p>

        <a v-if="order.template_path" :href="templateUrl(order.template_path)" target="_blank" rel="noopener" class="inline-block text-red text-sm font-semibold underline mb-3">📎 View attached template →</a>

        <div class="flex flex-wrap items-center gap-2.5">
          <select v-model="draft[order.id].status" class="px-2.5 py-1.5 rounded border border-steel/40 text-sm">
            <option v-for="s in statuses" :key="s" :value="s">{{ s }}</option>
          </select>
          <input v-model="draft[order.id].quoted_price" type="number" placeholder="Quoted price" class="px-2.5 py-1.5 rounded border border-steel/40 text-sm w-32">
          <button :disabled="savingId === order.id" class="px-3 py-1.5 rounded bg-red text-cream text-sm font-semibold disabled:opacity-60" @click="saveOrder(order)">
            {{ savingId === order.id ? 'Saving...' : 'Save' }}
          </button>
        </div>
      </div>

      <div v-if="!orders.length" class="text-cream/60 text-sm text-center py-10">No orders yet.</div>
    </div>

    <div v-if="lastPage > 1" class="flex justify-center items-center gap-3 mt-6">
      <button :disabled="page <= 1" class="text-cream/70 text-sm disabled:opacity-30" @click="page--">← Prev</button>
      <span class="text-cream/70 text-sm">Page {{ page }} of {{ lastPage }}</span>
      <button :disabled="page >= lastPage" class="text-cream/70 text-sm disabled:opacity-30" @click="page++">Next →</button>
    </div>
  </div>
</template>