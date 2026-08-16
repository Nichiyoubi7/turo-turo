export default defineNuxtRouteMiddleware(() => {
  const token = useCookie<string | null>('turo_admin_token', { default: () => null })

  if (!token.value) {
    return navigateTo('/admin/login')
  }
})