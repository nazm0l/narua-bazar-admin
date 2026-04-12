const BASE_URL = process.env.BACKEND_URL || "http://localhost:5000"

export async function apiClient(
  endpoint: string,
  options: RequestInit = {}
) {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {})
    },
    cache: "no-store"
  })

  if (!res.ok) {
    throw new Error("API request failed")
  }

  return res.json()
}