type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

type QueryValue = string | number | boolean | null | undefined

export interface ApiRequestOptions extends Omit<RequestInit, 'body' | 'method'> {
  method?: HttpMethod
  body?: unknown
  query?: Record<string, QueryValue>
}

export class ApiError extends Error {
  status: number
  payload: unknown

  constructor(message: string, status: number, payload: unknown) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.payload = payload
  }
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? ''

function buildUrl(endpoint: string, query?: Record<string, QueryValue>) {
  const url = new URL(endpoint, API_BASE_URL || window.location.origin)

  Object.entries(query ?? {}).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      url.searchParams.set(key, String(value))
    }
  })

  return API_BASE_URL ? url.toString() : `${url.pathname}${url.search}`
}

async function readResponsePayload(response: Response) {
  const contentType = response.headers.get('content-type')

  if (contentType?.includes('application/json')) {
    return response.json()
  }

  return response.text()
}

export async function apiRequest<T>(
  endpoint: string,
  options: ApiRequestOptions = {}
): Promise<T> {
  const { body, headers, method = 'GET', query, ...requestOptions } = options

  const response = await fetch(buildUrl(endpoint, query), {
    ...requestOptions,
    method,
    headers: {
      Accept: 'application/json',
      ...(body !== undefined ? { 'Content-Type': 'application/json' } : {}),
      ...headers,
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  })

  if (response.status === 204) {
    return undefined as T
  }

  const payload = await readResponsePayload(response)

  if (!response.ok) {
    throw new ApiError(response.statusText, response.status, payload)
  }

  return payload as T
}

export function apiGet<T>(
  endpoint: string,
  query?: Record<string, QueryValue>
) {
  return apiRequest<T>(endpoint, {
    method: 'GET',
    query,
  })
}
