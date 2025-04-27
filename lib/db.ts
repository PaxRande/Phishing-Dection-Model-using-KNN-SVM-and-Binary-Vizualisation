import { neon } from "@neondatabase/serverless"

// Create a SQL client with the pooled connection
export const sql = neon(process.env.DATABASE_URL!)

// Function to store scan results
export async function storeScanResult(
  url: string,
  isPhishing: boolean,
  confidence: number,
  binaryVisualizationData: string,
) {
  try {
    const result = await sql`
      INSERT INTO scan_results (url, is_phishing, confidence, binary_visualization_data)
      VALUES (${url}, ${isPhishing}, ${confidence}, ${binaryVisualizationData})
      RETURNING id
    `
    return result[0]
  } catch (error) {
    console.error("Error storing scan result:", error)
    throw error
  }
}

// Function to get recent scan results
export async function getRecentScans(limit = 10) {
  try {
    const results = await sql`
      SELECT id, url, is_phishing, confidence, binary_visualization_data, created_at
      FROM scan_results
      ORDER BY created_at DESC
      LIMIT ${limit}
    `
    return results
  } catch (error) {
    console.error("Error getting recent scans:", error)
    throw error
  }
}

// Function to get scan history for a specific URL
export async function getScanHistoryForUrl(url: string, limit = 5) {
  try {
    const results = await sql`
      SELECT id, url, is_phishing, confidence, binary_visualization_data, created_at
      FROM scan_results
      WHERE url = ${url}
      ORDER BY created_at DESC
      LIMIT ${limit}
    `
    return results
  } catch (error) {
    console.error("Error getting scan history for URL:", error)
    throw error
  }
}
