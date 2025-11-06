"use server";
import { BetaAnalyticsDataClient } from "@google-analytics/data";

const credentials = process.env.GOOGLE_ANALYTICS_CREDENTIALS
  ? JSON.parse(process.env.GOOGLE_ANALYTICS_CREDENTIALS)
  : undefined;

const analyticsDataClient = new BetaAnalyticsDataClient({
  credentials
});
const propertyId = process.env.GA4_PROPERTY_ID || "properties/479056404";

export async function runReport() {
  if (!credentials) {
    throw new Error("Google Analytics credentials not configured.");
  }

  const [response] = await analyticsDataClient.runReport({
    property: propertyId,
    dateRanges: [
      {
        startDate: "30daysAgo",
        endDate: "today"
      }
    ],
    dimensions: [{ name: "date" }],
    metrics: [
      { name: "activeUsers" },
      { name: "newUsers" },
      { name: "sessions" },
      { name: "screenPageViews" },
      { name: "averageSessionDuration" },
      { name: "bounceRate" },
      { name: "engagementRate" }
    ]
  });

  if (!response.rows) {
    return { data: [], totals: [], rowCount: 0 };
  }

  const formattedData = response.rows.map((row) => ({
    date: row.dimensionValues?.[0]?.value,
    activeUsers: parseInt(row.metricValues?.[0]?.value || "0"),
    newUsers: parseInt(row.metricValues?.[1]?.value || "0"),
    sessions: parseInt(row.metricValues?.[2]?.value || "0"),
    pageViews: parseInt(row.metricValues?.[3]?.value || "0"),
    avgSessionDuration: parseFloat(row.metricValues?.[4]?.value || "0"),
    bounceRate: parseFloat(row.metricValues?.[5]?.value || "0"),
    engagementRate: parseFloat(row.metricValues?.[6]?.value || "0")
  }));

  return {
    data: formattedData,
    totals: response.totals,
    rowCount: response.rowCount
  };
}

// Get traffic sources
export async function getTrafficSources() {
  if (!credentials) {
    throw new Error("Google Analytics credentials not configured.");
  }

  const [response] = await analyticsDataClient.runReport({
    property: propertyId,
    dateRanges: [{ startDate: "30daysAgo", endDate: "today" }],
    dimensions: [{ name: "sessionSource" }, { name: "sessionMedium" }],
    metrics: [{ name: "sessions" }, { name: "activeUsers" }],
    orderBys: [{ metric: { metricName: "sessions" }, desc: true }],
    limit: 10
  });

  if (!response.rows) return [];

  return response.rows.map((row) => ({
    source: row.dimensionValues?.[0]?.value,
    medium: row.dimensionValues?.[1]?.value,
    sessions: parseInt(row.metricValues?.[0]?.value || "0"),
    users: parseInt(row.metricValues?.[1]?.value || "0")
  }));
}

// Get top pages
export async function getTopPages() {
  if (!credentials) {
    throw new Error("Google Analytics credentials not configured.");
  }

  const [response] = await analyticsDataClient.runReport({
    property: propertyId,
    dateRanges: [{ startDate: "30daysAgo", endDate: "today" }],
    dimensions: [{ name: "pageTitle" }, { name: "pagePath" }],
    metrics: [{ name: "screenPageViews" }, { name: "activeUsers" }],
    orderBys: [{ metric: { metricName: "screenPageViews" }, desc: true }],
    limit: 10
  });

  if (!response.rows) return [];

  return response.rows.map((row) => ({
    title: row.dimensionValues?.[0]?.value,
    path: row.dimensionValues?.[1]?.value,
    views: parseInt(row.metricValues?.[0]?.value || "0"),
    users: parseInt(row.metricValues?.[1]?.value || "0")
  }));
}

// Get device breakdown
export async function getDeviceStats() {
  if (!credentials) {
    throw new Error("Google Analytics credentials not configured.");
  }

  const [response] = await analyticsDataClient.runReport({
    property: propertyId,
    dateRanges: [{ startDate: "30daysAgo", endDate: "today" }],
    dimensions: [{ name: "deviceCategory" }],
    metrics: [{ name: "activeUsers" }, { name: "sessions" }]
  });

  if (!response.rows) return [];

  return response.rows.map((row) => ({
    device: row.dimensionValues?.[0]?.value,
    users: parseInt(row.metricValues?.[0]?.value || "0"),
    sessions: parseInt(row.metricValues?.[1]?.value || "0")
  }));
}
