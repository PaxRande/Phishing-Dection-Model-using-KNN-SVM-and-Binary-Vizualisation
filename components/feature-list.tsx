"use client"

import { useState } from "react"
import { motion } from "framer-motion"

interface FeatureListProps {
  features: Record<string, number>
}

export function FeatureList({ features }: FeatureListProps) {
  const [hoveredFeature, setHoveredFeature] = useState<string | null>(null)

  // Determine which features are suspicious (contribute to phishing detection)
  const isSuspicious = (name: string, value: number): boolean => {
    switch (name) {
      case "URL Length":
        return value > 75
      case "Domain Age":
        return value < 30
      case "Suspicious TLD":
      case "IP in URL":
        return value === 1
      case "Number of Dots":
        return value > 3
      case "Number of Hyphens":
        return value > 1
      case "Has HTTPS":
        return value === 0
      case "Redirect Count":
        return value > 0
      default:
        return false
    }
  }

  // Get risk level description
  const getRiskLevel = (name: string, value: number): string => {
    const suspicious = isSuspicious(name, value)
    if (!suspicious) return "Low Risk"

    switch (name) {
      case "URL Length":
        return value > 100 ? "High Risk" : "Medium Risk"
      case "Domain Age":
        return value < 10 ? "High Risk" : "Medium Risk"
      case "Suspicious TLD":
      case "IP in URL":
        return "High Risk"
      case "Number of Dots":
        return value > 5 ? "High Risk" : "Medium Risk"
      case "Number of Hyphens":
        return value > 2 ? "High Risk" : "Medium Risk"
      case "Has HTTPS":
        return "Medium Risk"
      case "Redirect Count":
        return value > 1 ? "High Risk" : "Medium Risk"
      default:
        return "Medium Risk"
    }
  }

  // Get risk description
  const getRiskDescription = (name: string): string => {
    switch (name) {
      case "URL Length":
        return "Long URLs can be used to hide the true destination or suspicious parts of the URL."
      case "Domain Age":
        return "Newly registered domains are often used for phishing as they have no reputation to lose."
      case "Suspicious TLD":
        return "Certain top-level domains are commonly used in phishing campaigns due to low cost or loose regulations."
      case "IP in URL":
        return "Using an IP address instead of a domain name is often a sign of a phishing attempt."
      case "Number of Dots":
        return "Multiple dots in a URL can indicate subdomain abuse or an attempt to create confusion."
      case "Number of Hyphens":
        return "Multiple hyphens are often used in typosquatting domains to mimic legitimate websites."
      case "Has HTTPS":
        return "Lack of HTTPS indicates the connection is not secure, which is common in phishing sites."
      case "Redirect Count":
        return "Multiple redirects can be used to obscure the final destination of a URL."
      default:
        return "This feature contributes to the phishing detection algorithm."
    }
  }

  return (
    <div className="space-y-4">
      {Object.entries(features).map(([name, value]) => {
        const suspicious = isSuspicious(name, value)
        const riskLevel = getRiskLevel(name, value)
        const isHovered = hoveredFeature === name

        return (
          <motion.div
            key={name}
            className={`relative rounded-lg p-3 ${
              suspicious
                ? isHovered
                  ? "bg-red-950/50"
                  : "bg-slate-800/80"
                : isHovered
                  ? "bg-green-950/50"
                  : "bg-slate-800/80"
            } transition-colors`}
            onMouseEnter={() => setHoveredFeature(name)}
            onMouseLeave={() => setHoveredFeature(null)}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <div className={`w-3 h-3 rounded-full mr-2 ${suspicious ? "bg-red-400" : "bg-green-400"}`} />
                <span className="text-slate-200 font-medium">{name}</span>
              </div>
              <span className={`font-mono font-bold ${suspicious ? "text-red-400" : "text-green-400"}`}>{value}</span>
            </div>

            {isHovered && (
              <motion.div
                className="mt-2 text-xs text-slate-300 border-t border-slate-700 pt-2"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex justify-between mb-1">
                  <span>Risk Level:</span>
                  <span
                    className={`font-medium ${
                      riskLevel === "High Risk"
                        ? "text-red-400"
                        : riskLevel === "Medium Risk"
                          ? "text-yellow-400"
                          : "text-green-400"
                    }`}
                  >
                    {riskLevel}
                  </span>
                </div>
                <p className="text-slate-400">{getRiskDescription(name)}</p>
              </motion.div>
            )}
          </motion.div>
        )
      })}
    </div>
  )
}
