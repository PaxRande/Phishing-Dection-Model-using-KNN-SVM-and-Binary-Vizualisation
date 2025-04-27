import { NextResponse } from "next/server"
import { getRecentScans } from "@/lib/db"

export async function GET() {
  try {
    const scans = await getRecentScans(10)

    // Parse the binary visualization data from JSON string
    const formattedScans = scans.map((scan) => ({
      ...scan,
      binary_visualization_data: scan.binary_visualization_data ? JSON.parse(scan.binary_visualization_data) : null,
    }))

    return NextResponse.json(formattedScans)
  } catch (error) {
    console.error("Error in recent-scans API:", error)
    return NextResponse.json({ error: "Failed to fetch recent scans" }, { status: 500 })
  }
}
