import { ModelIntegration } from "@/components/model-integration"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BinaryVisualization } from "@/components/binary-visualization"
import { BinaryVisualizationGuide } from "@/components/binary-visualization-guide"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function DashboardPage() {
  // Sample binary data for visualization
  const sampleData = [
    [1, 0, 1, 0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0, 1, 0, 1],
    [1, 1, 0, 0, 1, 1, 0, 0],
    [0, 0, 1, 1, 0, 0, 1, 1],
    [1, 0, 0, 1, 1, 0, 0, 1],
    [0, 1, 1, 0, 0, 1, 1, 0],
    [1, 0, 1, 0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0, 1, 0, 1],
  ]

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <Header />

      <main className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">PhishGuard Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-white">Total Scans</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">1,248</div>
              <p className="text-xs text-slate-400">+12% from last month</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-white">Phishing Detected</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">328</div>
              <p className="text-xs text-slate-400">26.3% detection rate</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-white">Model Accuracy</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">97.2%</div>
              <p className="text-xs text-slate-400">+1.5% from last version</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Binary Pattern Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center">
                <BinaryVisualization data={sampleData} highlightMode={true} />
              </div>
            </CardContent>
          </Card>

          <ModelIntegration />
        </div>

        <div className="mb-8">
          <BinaryVisualizationGuide />
        </div>
      </main>

      <Footer />
    </div>
  )
}
