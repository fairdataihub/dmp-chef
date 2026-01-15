import { readBody, createError, handleCors } from "h3";

export default defineEventHandler(async (event) => {
  // 1. Handle CORS for all origins (*)
  // This tells Chrome that your Vercel app is allowed to call this Nuxt server
  handleCors(event, {
    origin: '*',
    methods: ['POST', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization'],
  });

  // 2. Explicitly handle the "Preflight" (The first of the two queries in Chrome)
  if (event.node.req.method === 'OPTIONS') {
    event.node.res.statusCode = 204;
    event.node.res.statusMessage = "No Content";
    // This ensures the connection is closed properly for the handshake
    return event.node.res.end();
  }

  // 3. Parse the actual data from the Vercel frontend
  let rawBody;
  try {
    rawBody = await readBody(event);
  } catch (e) {
    console.error("Failed to read body:", e);
    throw createError({ statusCode: 400, statusMessage: "Invalid Request Body" });
  }

  // Prepare the clean object for Flask
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

  // Log this to your Nuxt server terminal (e.g., in PM2 logs)
  console.log("-----------------------------------------");
  console.log("Forwarding request to Flask GPU at:", new Date().toLocaleTimeString());
  console.log("Body:", body);
  console.log("-----------------------------------------");

  // 4. Get your Tailscale Flask URL
  const baseUrl = process.env.DMP_API;
  
  if (!baseUrl) {
    console.error("ERROR: DMP_API environment variable is not set!");
    throw createError({
      statusCode: 500,
      statusMessage: "Server configuration error: Missing Flask URL",
    });
  }

  const flaskUrl = `${baseUrl}/query`;

  try {
    // 5. Proxy the request to the Flask server via Tailscale
    const response = await $fetch(flaskUrl, {
      method: "POST",
      body: body,
      headers: {
        "Content-Type": "application/json",
      },
      // 5-minute timeout for heavy GPU processing
      timeout: 300000, 
    });

    // Return the result back to Vercel
    return response;

  } catch (err: any) {
    // Log specifically what went wrong with the Flask/Tailscale connection
    console.error("[Flask/Tailscale Error]:", err.data || err.message);

    throw createError({
      statusCode: err?.response?.status ?? 500,
      statusMessage: "Flask GPU Server Error",
      data: err?.data || "The GPU server did not respond correctly.",
    });
  }
});
