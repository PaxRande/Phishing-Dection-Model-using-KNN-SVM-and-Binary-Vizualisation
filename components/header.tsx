import { Shield } from "lucide-react"
import Link from "next/link"

export function Header() {
  return (
    <header className="w-full bg-slate-900/80 backdrop-blur-sm border-b border-slate-800/50 sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="bg-gradient-to-br from-emerald-400 to-emerald-600 p-2 rounded-lg shadow-lg group-hover:shadow-emerald-500/20 transition-all duration-300">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white tracking-tight">PhishGuard</h1>
              <p className="text-xs text-slate-400">AI-Powered Protection</p>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-slate-300 hover:text-white transition-colors">
              Home
            </Link>
            <Link href="/dashboard" className="text-slate-300 hover:text-white transition-colors">
              Dashboard
            </Link>
            <Link href="#" className="text-slate-300 hover:text-white transition-colors">
              Documentation
            </Link>
          </nav>

          <div className="flex items-center gap-2">
            <div className="bg-emerald-500/10 text-emerald-400 text-xs px-3 py-1 rounded-full border border-emerald-500/20">
              Model v1.2
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
