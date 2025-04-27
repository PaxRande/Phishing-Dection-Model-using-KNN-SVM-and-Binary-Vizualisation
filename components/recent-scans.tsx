"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BinaryVisualization } from "./binary-visualization"
import { Badge } from "@/components/ui/badge"
import { formatDistanceToNow } from "date-fns"

type Scan = {
  id: number
  url: string
  is_phishing: boolean
  confidence: number
  binary_visualization_data: number[][]
  created_at: string
}

export function RecentScans() {
  const [scans, setScans] = useState<Scan[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchRecentScans = async () => {
      try {
        const response = await fetch("/api/recent-scans")
        const data = await response.json()
        setScans(data)
      } catch (error) {
        console.error("Error fetching recent scans:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchRecentScans()
  }, [])

  if (loading) {
    return (
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Recent Scans</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-slate-400">Loading recent scans...</div>
        </CardContent>
      </Card>
    )
  }

  if (scans.length === 0) {
    return (
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Recent Scans</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-slate-400">No scan history found. Start by analyzing a URL.</div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-slate-800 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white">Recent Scans</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {scans.map((scan) => (
            <div key={scan.id} className="border border-slate-700 rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <div className="truncate max-w-[70%]">
                  <a
                    href={scan.url.startsWith("http") ? scan.url : `https://${scan.url}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-400 hover:underline truncate block"
                  >
                    {scan.url}
                  </a>
                  <div className="text-xs text-slate-400 mt-1">
                    {formatDistanceToNow(new Date(scan.created_at), { addSuffix: true })}
                  </div>
                </div>
                <Badge
                  variant="outline"
                  className={`${scan.is_phishing ? "border-red-500 text-red-400" : "border-green-500 text-green-400"}`}
                >
                  {scan.is_phishing ? "Phishing" : "Safe"}
                </Badge>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-slate-300 mb-1">Binary Pattern</div>
                  {scan.binary_visualization_data ? (
                    <div className="h-24 w-24">
                      <BinaryVisualization data={scan.binary_visualization_data} />
                    </div>
                  ) : (
                    <div className="h-24 w-24 bg-slate-700 rounded flex items-center justify-center text-slate-500 text-xs">
                      No data
                    </div>
                  )}
                </div>
                <div>
                  <div className="text-sm text-slate-300 mb-1">Confidence</div>
                  <div className="text-2xl font-bold text-white">{scan.confidence}%</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
