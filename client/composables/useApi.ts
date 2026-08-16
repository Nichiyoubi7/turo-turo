/**
 * Shared API fetch wrapper — same pattern as OBRA's client `useApi`
 * composable: reads the base URL from runtime config so it's easy to
 * point at localhost during development and the real API once deployed.
 */
export function useApi() {
  const config = useRuntimeConfig()
  const baseURL = config.public.apiBase
  // SSR-safe cookie storage for the Sanctum token
  const token = useCookie<string | null>('turo_admin_token', { default: () => null })

  function authHeaders() {
    return token.value ? { Authorization: `Bearer ${token.value}` } : {}
  }

  function get<T>(path: string, params?: Record<string, string | number | undefined>) {
    return $fetch<T>(path, { baseURL, method: 'GET', params, headers: authHeaders() })
  }

  function post<T>(path: string, body?: unknown) {
    return $fetch<T>(path, { baseURL, method: 'POST', body, headers: authHeaders() })
  }

  function put<T>(path: string, body?: unknown) {
    return $fetch<T>(path, { baseURL, method: 'PUT', body, headers: authHeaders() })
  }

  return { get, post, put, baseURL, token }
}