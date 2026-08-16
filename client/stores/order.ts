import { defineStore } from 'pinia'

export interface OrderPayload {
  customer_name: string
  facebook_link?: string
  contact_number?: string
  segment: 'elementary' | 'junior_high' | 'senior_high' | 'college'
  service: string
  subject?: string
  coverage?: string
  notes?: string
}

interface OrderResponse {
  message: string
  order: Record<string, unknown>
}

export const useOrderStore = defineStore('order', {
  state: () => ({
    submitting: false,
    submitted: false,
    error: null as string | null
  }),

  actions: {
    async submitOrder(payload: OrderPayload, templateFile?: File | null) {
      const { post } = useApi()
      this.submitting = true
      this.error = null

      try {
        const formData = new FormData()
        Object.entries(payload).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== '') {
            formData.append(key, value as string)
          }
        })
        if (templateFile) {
          formData.append('template', templateFile)
        }

        await post<OrderResponse>('/orders', formData)
        this.submitted = true
      } catch (err: any) {
        this.error = err?.data?.message || 'Something went wrong. Please try again or message us on Facebook instead.'
      } finally {
        this.submitting = false
      }
    },

    reset() {
      this.submitting = false
      this.submitted = false
      this.error = null
    }
  }
})