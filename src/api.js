// src/api.js
export async function getHealth() {
  const response = await fetch('/.netlify/functions/health')
  if (!response.ok) {
    throw new Error('Health check failed')
  }
  return response.json()
}
