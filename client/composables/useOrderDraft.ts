export interface OrderDraft {
  segment: 'elementary' | 'junior_high' | 'senior_high' | 'college'
  service: string
}

export function useOrderDraft() {
  return useState<OrderDraft>('order-draft', () => ({ segment: 'elementary', service: '' }))
}