import { InfoIcon } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function BinaryVisualizationGuide() {
  return (
    <div className="bg-slate-800 border border-slate-700 rounded-lg p-5">
      <div className="flex items-center gap-2 mb-4">
        <InfoIcon className="h-5 w-5 text-emerald-400" />
        <h3 className="text-lg font-semibold text-white">Understanding Binary Visualization</h3>
      </div>

      <p className="text-slate-300 mb-4">
        Our binary visualization transforms URL features into a visual pattern that helps identify phishing attempts.
        Each cell represents a specific feature or characteristic extracted from the URL.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <h4 className="text-sm font-semibold text-emerald-400 mb-3">Cell Representation</h4>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <div className="w-6 h-6 bg-emerald-500 rounded mt-0.5"></div>
              <div>
                <p className="font-medium text-white">Active Feature</p>
                <p className="text-sm text-slate-400">Feature detected in the URL</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-6 h-6 bg-slate-700 rounded mt-0.5"></div>
              <div>
                <p className="font-medium text-white">Inactive Feature</p>
                <p className="text-sm text-slate-400">Feature not present in the URL</p>
              </div>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-emerald-400 mb-3">Grid Position Meaning</h4>
          <ul className="space-y-2 text-sm text-slate-300">
            <li>
              • <strong>Top rows (0-1):</strong> URL structure features
            </li>
            <li>
              • <strong>Middle rows (2-5):</strong> Domain characteristics
            </li>
            <li>
              • <strong>Bottom rows (6-7):</strong> Content indicators
            </li>
            <li>
              • <strong>Left columns (0-3):</strong> Primary features
            </li>
            <li>
              • <strong>Right columns (4-7):</strong> Secondary features
            </li>
          </ul>
        </div>
      </div>

      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="patterns" className="border-slate-700">
          <AccordionTrigger className="text-white hover:text-emerald-400 hover:no-underline">
            Common Patterns to Watch For
          </AccordionTrigger>
          <AccordionContent className="text-slate-300">
            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-1">
                  <svg width="40" height="40" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="2" height="2" fill="#10b981" />
                    <rect x="2" width="2" height="2" fill="#10b981" />
                    <rect x="4" width="2" height="2" fill="#10b981" />
                    <rect y="2" width="2" height="2" fill="#10b981" />
                    <rect x="6" y="4" width="2" height="2" fill="#10b981" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-white">Clusters</p>
                  <p className="text-sm">
                    Groups of active cells often indicate related suspicious features working together, a common sign of
                    sophisticated phishing attempts.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-1">
                  <svg width="40" height="40" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="2" height="2" fill="#10b981" />
                    <rect x="6" width="2" height="2" fill="#10b981" />
                    <rect y="6" width="2" height="2" fill="#10b981" />
                    <rect x="6" y="6" width="2" height="2" fill="#10b981" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-white">Corner Patterns</p>
                  <p className="text-sm">
                    Active cells in corners often represent structural anomalies in the URL, such as unusual TLDs or IP
                    addresses instead of domain names.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-1">
                  <svg width="40" height="40" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect y="2" width="8" height="1" fill="#10b981" />
                    <rect y="4" width="8" height="1" fill="#10b981" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-white">Horizontal Lines</p>
                  <p className="text-sm">
                    Horizontal patterns often indicate domain-level issues, such as newly registered domains or
                    suspicious hosting providers.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-1">
                  <svg width="40" height="40" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="2" width="1" height="8" fill="#10b981" />
                    <rect x="5" width="1" height="8" fill="#10b981" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-white">Vertical Lines</p>
                  <p className="text-sm">
                    Vertical patterns typically represent content-based features, such as suspicious keywords or
                    obfuscation techniques.
                  </p>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="examples" className="border-slate-700">
          <AccordionTrigger className="text-white hover:text-emerald-400 hover:no-underline">
            Example Interpretations
          </AccordionTrigger>
          <AccordionContent className="text-slate-300">
            <div className="space-y-4 pt-2">
              <p>
                <strong>High Density Pattern:</strong> When more than 40% of cells are active (green), the URL likely
                contains multiple suspicious elements and has a high probability of being a phishing attempt.
              </p>
              <p>
                <strong>Sparse Pattern:</strong> Few active cells typically indicate a legitimate URL, though
                sophisticated phishing attempts may deliberately minimize suspicious features.
              </p>
              <p>
                <strong>Top-Heavy Pattern:</strong> Many active cells in the top rows often indicate URL structure
                manipulation, a common phishing technique.
              </p>
              <p>
                <strong>Bottom-Heavy Pattern:</strong> Concentration of active cells in bottom rows may indicate
                content-based deception rather than structural issues.
              </p>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
