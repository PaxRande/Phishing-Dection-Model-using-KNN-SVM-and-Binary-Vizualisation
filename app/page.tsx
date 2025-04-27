import { PhishingDetector } from "@/components/phishing-detector"
import { RecentScans } from "@/components/recent-scans"
import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Footer } from "@/components/footer"
import { Shield, Database, Cpu } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <Header />

      <Hero />

      <main className="container mx-auto px-4 py-12">
        <PhishingDetector />

        <div className="mt-16">
          <RecentScans />
        </div>

        <div className="mt-24">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 relative overflow-hidden group hover:border-emerald-500/50 transition-colors duration-300">
              <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-full -mr-12 -mt-12 group-hover:bg-emerald-500/20 transition-colors duration-300"></div>
              <div className="relative">
                <div className="bg-emerald-500/10 p-3 rounded-lg inline-block mb-4">
                  <Shield className="h-6 w-6 text-emerald-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Feature Extraction</h3>
                <p className="text-slate-300">
                  Our system extracts over 80 features from the URL, including domain properties, URL structure, and
                  content indicators.
                </p>
              </div>
            </div>

            <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 relative overflow-hidden group hover:border-emerald-500/50 transition-colors duration-300">
              <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-full -mr-12 -mt-12 group-hover:bg-emerald-500/20 transition-colors duration-300"></div>
              <div className="relative">
                <div className="bg-emerald-500/10 p-3 rounded-lg inline-block mb-4">
                  <Database className="h-6 w-6 text-emerald-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Binary Visualization</h3>
                <p className="text-slate-300">
                  Features are transformed into binary patterns that reveal hidden characteristics of phishing attempts.
                </p>
              </div>
            </div>

            <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 relative overflow-hidden group hover:border-emerald-500/50 transition-colors duration-300">
              <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-full -mr-12 -mt-12 group-hover:bg-emerald-500/20 transition-colors duration-300"></div>
              <div className="relative">
                <div className="bg-emerald-500/10 p-3 rounded-lg inline-block mb-4">
                  <Cpu className="h-6 w-6 text-emerald-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">ML Classification</h3>
                <p className="text-slate-300">
                  Our model combines KNN and SVM algorithms to achieve 97% accuracy in phishing detection.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
