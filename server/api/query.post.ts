import { readBody } from 'h3'

export default defineEventHandler(async (event) => {
  const body = await readBody(event) // get posted JSON from browser

  try {
    // call the Flask microservice
    const flaskUrl = process.env.FLASK_URL || 'http://localhost:5001/query'

    const res = await $fetch(flaskUrl, {
      method: 'POST',
      body,
      // If Flask requires specific headers (it doesn't by default), add them here
      headers: { 'Content-Type': 'application/json' }
    })

    // pass Flask response straight to frontend
    return res
  } catch (err: any) {
    console.error('[API Gateway] Error contacting Flask service:', err?.message ?? err)
    throw createError({
      statusCode: 502,
      statusMessage: 'Bad Gateway: failed to contact DMSP service'
    })
  }
})
