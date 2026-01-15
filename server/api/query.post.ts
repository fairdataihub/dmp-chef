import { readBody, createError, handleCors } from "h3";

export default defineEventHandler(async (event) => {
  // 1. Handle CORS for all origins (*)
  // This allows any Vercel deployment URL to access this endpoint
  handleCors(event, {
    origin: '*',
    methods: ['POST', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization'],
  });

  // 2. Immediately return for browser 'preflight' requests
  if (event.node.req.method === 'OPTIONS') {
    return null;
  }

  // 3. Parse the body coming from your Vercel frontend
  const rawBody = await readBody(event);

  const body = {
    title: rawBody.title || "Untitled Project",
    agency: rawBody.agency || "Not specified",
    projectSummary: rawBody.projectSummary || "Not provided",
    dataType: rawBody.dataType || "Not specified",
    dataSource: rawBody.dataSource || "Not specified",
    humanSubjects: rawBody.humanSubjects || "No",
    dataSharing: rawBody.dataSharing || "Not specified",
    dataVolume: rawBody.dataVolume || "Not specified",
  };

  // Log to your Nuxt terminal (useful for debugging)
  console.log("Forwarding request to Flask GPU:", body);

  // 4. Get your Tailscale Flask URL from environment variables
  // Example: DMP_API=http://100.x.y.z:5000
  const baseUrl = process.env.DMP_API;
  
  if (!baseUrl) {
    throw createError({
      statusCode: 500,
      statusMessage: "Missing DMP_API Environment Variable",
    });
  }

  const flaskUrl = `${baseUrl}/query`;

  try {
    // 5. Proxy the request to the Flask server
    const response = await $fetch(flaskUrl, {
      method: "POST",
      body: body,
      headers: {
        "Content-Type": "application/json",
      },
      // GPU tasks take time, so we set a long timeout (5 minutes)
      timeout: 300000, 
    });

    // Return the Flask response back to the Vercel frontend
    return response;

  } catch (err: any) {
    console.error("[Flask Error]:", err.data || err.message);

    throw createError({
      statusCode: err?.response?.status ?? 500,
      statusMessage: "Flask GPU Server Error",
      data: err?.data,
    });
  }
});
