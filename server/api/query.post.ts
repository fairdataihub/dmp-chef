import { readBody, createError } from "h3";

export default defineEventHandler(async (event) => {
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
  // 1. Log the body to your terminal to ensure it isn't empty
  console.log("Body being sent to Flask:", body);

  const baseUrl = process.env.DMP_API;
  const flaskUrl = `${baseUrl}/query`;

  try {
    // 2. Use a direct fetch.
    // We pass 'body' directly. Nuxt will auto-stringify it.
    const response = await $fetch(flaskUrl, {
      method: "POST",
      body: body,
      headers: {
        "Content-Type": "application/json",
      },
      timeout: 300000,
    });

    return response;
  } catch (err: any) {
    // If Flask fails, we print the reason here
    console.error("[Flask Error]:", err.data);

    throw createError({
      statusCode: err?.response?.status ?? 500,
      statusMessage: "Flask Validation Error",
      data: err?.data,
    });
  }
});
