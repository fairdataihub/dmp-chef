import { readBody, createError } from "h3";

export default defineEventHandler(async (event) => {
  // Handle CORS preflight
  if (event.node.req.method === "OPTIONS") {
    // Allow all origins for simplicity (or restrict to your frontend domain)
    event.node.res.setHeader("Access-Control-Allow-Origin", "*");
    event.node.res.setHeader("Access-Control-Allow-Methods", "POST,OPTIONS");
    event.node.res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    event.node.res.statusCode = 200;
    return "OK";
  }

  // Normal POST handling
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

  console.log("Body being sent to Flask:", body);

  const baseUrl = process.env.DMP_API;
  const flaskUrl = `${baseUrl}/query`;

  try {
    const response = await $fetch(flaskUrl, {
      method: "POST",
      body: body,
      headers: {
        "Content-Type": "application/json",
      },
      timeout: 300000,
    });

    // Allow browser to read the response
    event.node.res.setHeader("Access-Control-Allow-Origin", "*");
    return response;
  } catch (err: any) {
    console.error("[Flask Error]:", err.data);

    throw createError({
      statusCode: err?.response?.status ?? 500,
      statusMessage: "Flask Validation Error",
      data: err?.data,
    });
  }
});
