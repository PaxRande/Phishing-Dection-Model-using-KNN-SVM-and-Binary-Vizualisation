"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Shield, AlertTriangle, CheckCircle, Loader2, ExternalLink, AlertCircle } from "lucide-react"
import { BinaryVisualization } from "./binary-visualization"
import { FeatureList } from "./feature-list"
import { Label } from "@/components/ui/label"
import { motion, AnimatePresence } from "framer-motion"

type AnalysisResult = {
  isPhishing: boolean
  confidence: number
  features: Record<string, number>
  binaryFeatures: number[][]
}

// List of known phishing URLs to highlight in the UI
const KNOWN_PHISHING_URLS = [
  "nexiexterirpremiunmbn.com",
  "talentedge.com.my/arawkaan.php",
  "rebrand.ly/054346",
  "shopee-brasil.com",
  "vendernashopee.com.br",
  "cambridge-exc.com",
  "gt-banrural.firebaseapp.com",
  "burj-azizi.richproperty.ae",
]

// Function to check if a URL is in our known phishing list
function isKnownPhishingURL(url: string): boolean {
  // Normalize the URL by removing protocol and www prefix
  const normalizedUrl = url
    .replace(/^https?:\/\//, "")
    .replace(/^www\./, "")
    .toLowerCase()

  // Check if any of the known phishing domains are in the URL
  return KNOWN_PHISHING_URLS.some((phishingUrl) => normalizedUrl.includes(phishingUrl))
}

export function PhishingDetector() {
  const [url, setUrl] = useState("")
  const [result, setResult] = useState<AnalysisResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [isKnownPhishing, setIsKnownPhishing] = useState(false)

  const analyzeUrl = async () => {
    if (!url) return

    setLoading(true)
    setResult(null)

    // Check if this is a known phishing URL
    setIsKnownPhishing(isKnownPhishingURL(url))

    try {
      const response = await fetch("/api/analyze-url", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      })

      const data = await response.json()

      // Simulate a delay for better UX
      setTimeout(() => {
        setResult(data)
        setLoading(false)
      }, 1500)
    } catch (error) {
      console.error("Error analyzing URL:", error)
      setResult(null)
      setLoading(false)
      setIsKnownPhishing(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="bg-slate-800/80 backdrop-blur-sm border-slate-700 shadow-xl overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-slate-800 to-slate-900 border-b border-slate-700">
          <CardTitle className="flex items-center gap-2 text-white">
            <Shield className="h-6 w-6 text-emerald-400" />
            URL Analysis
          </CardTitle>
          <CardDescription className="text-slate-300">Enter a URL to analyze for phishing indicators</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="url" className="text-white">
                Enter URL to analyze
              </Label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Input
                    id="url"
                    placeholder="https://example.com"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="bg-slate-900 border-slate-700 text-white pr-10"
                  />
                  {url && (
                    <a
                      href={url.startsWith("http") ? url : `https://${url}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                    >
                      <ExternalLink className="h-4 w-4" />
                      <span className="sr-only">Open URL</span>
                    </a>
                  )}
                </div>
                <Button
                  onClick={analyzeUrl}
                  disabled={!url || loading}
                  className="bg-emerald-500 hover:bg-emerald-600 text-white"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    "Analyze"
                  )}
                </Button>
              </div>
            </div>

            {loading && (
              <div className="py-12 flex flex-col items-center justify-center">
                <div className="relative">
                  <div className="h-24 w-24 rounded-full border-4 border-slate-700 border-t-emerald-500 animate-spin"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Shield className="h-8 w-8 text-emerald-500" />
                  </div>
                </div>
                <p className="mt-4 text-slate-300">Analyzing URL security...</p>
              </div>
            )}

            <AnimatePresence>
              {result && !loading && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-white">Binary Visualization</h3>
                    <div className="bg-slate-900 p-6 rounded-lg border border-slate-700">
                      <BinaryVisualization data={result.binaryFeatures} />
                    </div>
                    <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-4 mt-4">
                      <h4 className="text-sm font-semibold text-emerald-400 mb-2">How to Read This Visualization</h4>
                      <ul className="space-y-2 text-sm text-slate-300">
                        <li className="flex items-start gap-2">
                          <div className="w-4 h-4 bg-emerald-500 rounded mt-0.5 flex-shrink-0"></div>
                          <span>
                            <strong>Green cells</strong> represent active features that were detected in the URL
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-4 h-4 bg-slate-700 rounded mt-0.5 flex-shrink-0"></div>
                          <span>
                            <strong>Dark cells</strong> represent inactive features
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="flex-shrink-0 mt-0.5">
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <rect width="4" height="4" fill="#10b981" />
                              <rect x="4" width="4" height="4" fill="#10b981" />
                              <rect x="8" width="4" height="4" fill="#10b981" />
                              <rect y="4" width="4" height="4" fill="#10b981" />
                              <rect x="12" y="8" width="4" height="4" fill="#10b981" />
                            </svg>
                          </div>
                          <span>
                            <strong>Clusters</strong> of green cells often indicate suspicious patterns
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="flex-shrink-0 mt-0.5">
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <rect width="4" height="4" fill="#10b981" />
                              <rect x="12" width="4" height="4" fill="#10b981" />
                              <rect y="12" width="4" height="4" fill="#10b981" />
                              <rect x="12" y="12" width="4" height="4" fill="#10b981" />
                            </svg>
                          </div>
                          <span>
                            <strong>Corner patterns</strong> often represent URL structure anomalies
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="flex-shrink-0 mt-0.5">
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <rect y="4" width="16" height="2" fill="#10b981" />
                              <rect y="8" width="16" height="2" fill="#10b981" />
                            </svg>
                          </div>
                          <span>
                            <strong>Horizontal lines</strong> may indicate suspicious domain characteristics
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-white">Feature Analysis</h3>
                    <div className="bg-slate-900 rounded-lg border border-slate-700">
                      <FeatureList features={result.features} />
                    </div>

                    {isKnownPhishing && (
                      <Alert className="bg-red-900/50 border-red-800 mt-4">
                        <AlertCircle className="h-5 w-5 text-red-400" />
                        <AlertTitle className="text-white">Known Phishing URL Detected</AlertTitle>
                        <AlertDescription className="text-slate-200">
                          This URL has been identified in our database of known phishing sites. Do not enter any
                          personal information or credentials on this site.
                        </AlertDescription>
                      </Alert>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </CardContent>

        <AnimatePresence>
          {result && !loading && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <CardFooter className="border-t border-slate-700 bg-slate-800 p-6">
                <Alert
                  variant={result.isPhishing ? "destructive" : "default"}
                  className={`w-full ${
                    result.isPhishing ? "bg-red-900/50 border-red-800" : "bg-green-900/50 border-green-800"
                  }`}
                >
                  {result.isPhishing ? (
                    <AlertTriangle className="h-5 w-5 text-red-400" />
                  ) : (
                    <CheckCircle className="h-5 w-5 text-green-400" />
                  )}
                  <AlertTitle className="text-white">
                    {result.isPhishing ? "Phishing Detected!" : "No Phishing Detected"}
                  </AlertTitle>
                  <AlertDescription className="text-slate-200">
                    {result.isPhishing
                      ? isKnownPhishing
                        ? `This is a confirmed phishing site with ${result.confidence}% confidence. Do not proceed.`
                        : `This appears to be a phishing attempt with ${result.confidence}% confidence.`
                      : `This appears to be legitimate with ${result.confidence}% confidence.`}
                  </AlertDescription>
                </Alert>
              </CardFooter>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </div>
  )
}
