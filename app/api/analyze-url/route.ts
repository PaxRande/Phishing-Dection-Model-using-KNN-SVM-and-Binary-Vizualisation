import { NextResponse } from "next/server"
import { storeScanResult } from "@/lib/db"

export async function POST(request: Request) {
  try {
    const { url } = await request.json()

    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 })
    }

    // In a real implementation, this would call your Python model
    // For now, we'll simulate the analysis

    // Generate random binary features for visualization (8x8 grid)
    const binaryFeatures = Array(8)
      .fill(0)
      .map(() =>
        Array(8)
          .fill(0)
          .map(() => Math.round(Math.random())),
      )

    // Random result for demonstration
    const isPhishing = Math.random() > 0.5
    const confidence = Math.round(Math.random() * 30 + 70) // 70-100% confidence

    // Generate random feature values
    const features = {
      "URL Length": Math.floor(Math.random() * 100) + 20,
      "Domain Age": Math.floor(Math.random() * 1000) + 1,
      "Suspicious TLD": Math.random() > 0.7 ? 1 : 0,
      "IP in URL": Math.random() > 0.8 ? 1 : 0,
      "Number of Dots": Math.floor(Math.random() * 5) + 1,
      "Number of Hyphens": Math.floor(Math.random() * 3),
      "Has HTTPS": Math.random() > 0.3 ? 1 : 0,
      "Redirect Count": Math.floor(Math.random() * 2),
    }

    // Store the result in the database
    await storeScanResult(url, isPhishing, confidence, JSON.stringify(binaryFeatures))

    return NextResponse.json({
      isPhishing,
      confidence,
      url,
      features,
      binaryFeatures,
    })
  } catch (error) {
    console.error("Error in analyze-url API:", error)
    return NextResponse.json({ error: "Failed to analyze URL" }, { status: 500 })
  }
}
