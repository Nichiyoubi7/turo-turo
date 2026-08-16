import { defineStore } from 'pinia'

interface AdminUser {
  id: number
  name: string
  email: string
}

interface LoginResponse {
  token: string
  user: AdminUser
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as AdminUser | null,
    loading: false,
    error: null as string | null
  }),

  actions: {
    async login(email: string, password: string): Promise<boolean> {
      const { post, token } = useApi()
      this.loading = true
      this.error = null

      try {
        const res = await post<LoginResponse>('/login', { email, password })
        token.value = res.token
        this.user = res.user
        return true
      } catch (err: any) {
        this.error = err?.data?.message || 'Incorrect email or password.'
        return false
      } finally {
        this.loading = false
      }
    },

    logout() {
      const { token } = useApi()
      token.value = null
      this.user = null
      navigateTo('/admin/login')
    }
  }
})