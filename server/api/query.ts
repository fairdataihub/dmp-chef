import { readBody, createError } from "h3";

export default defineEventHandler(async (event) => {
  // --- 1. MANUALLY SET CORS HEADERS ---
  // We use standard Node.js headers to guarantee they are sent.
  // This replaces 'handleCors' which can sometimes be overridden.
  event.node.res.setHeader("Access-Control-Allow-Origin", "*");
  event.node.res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  event.node.res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  // --- 2. HANDLE PREFLIGHT (OPTIONS) ---
  // If the file is named 'query.ts', this block will now successfully run.
  if (event.node.req.method === 'OPTIONS') {
    event.node.res.statusCode = 204;
    event.node.res.statusMessage = "No Content";
    return event.node.res.end();
  }

  // --- 3. HANDLE THE REAL POST REQUEST ---
  try {
    // We wrap readBody in a try/catch in case the body is empty or malformed
    const rawBody = await readBody(event);
    
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

    // Log to your Nuxt server terminal
    console.log("-----------------------------------------");
    console.log("Forwarding request to Flask GPU at:", new Date().toLocaleTimeString());
    console.log("Body:", body);
    console.log("-----------------------------------------");

    const baseUrl = process.env.DMP_API;
    
    if (!baseUrl) {
      console.error("ERROR: DMP_API environment variable is not set!");
      throw createError({
        statusCode: 500,
        statusMessage: "Server configuration error: Missing Flask URL",
      });
    }

    // Forward to Flask via Tailscale
    const response = await $fetch(`${baseUrl}/query`, {
      method: "POST",
      body: body,
      headers: {
        "Content-Type": "application/json",
      },
      // 5-minute timeout for heavy GPU processing
      timeout: 300000, 
    });

    return response;

  } catch (err: any) {
    console.error("[Flask/Tailscale Error]:", err.data || err.message);

    // CRITICAL: Even on error, we must ensure CORS headers are present
    // so the frontend can actually read the error message.
    event.node.res.setHeader("Access-Control-Allow-Origin", "*");

    throw createError({
      statusCode: err?.response?.status ?? 500,
      statusMessage: "Flask GPU Server Error",
      data: err?.data || "The GPU server did not respond correctly.",
    });
  }
});