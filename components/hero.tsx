"use client"

import { motion } from "framer-motion"
import { Shield, Lock, AlertTriangle } from "lucide-react"

export function Hero() {
  return (
    <div className="relative overflow-hidden py-12 md:py-20">
      {/* Background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>

      {/* Glow effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-1/2 bg-emerald-500/10 blur-[120px] rounded-full"></div>

      <div className="relative container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-1 bg-slate-800/80 border border-slate-700/50 rounded-full px-3 py-1 text-sm text-slate-300 mb-6"
        >
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          Powered by advanced machine learning
        </motion.div>

        <motion.h1
          className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Detect Phishing Attacks <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-500">
            Before They Strike
          </span>
        </motion.h1>

        <motion.p
          className="text-xl text-slate-300 max-w-2xl mx-auto mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Our AI-powered phishing detection system identifies malicious URLs with 97% accuracy, keeping you safe from
          online threats.
        </motion.p>

        <motion.div
          className="flex flex-wrap justify-center gap-6 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="flex items-center gap-2 bg-slate-800/80 border border-slate-700/50 rounded-lg px-4 py-2">
            <Shield className="h-5 w-5 text-emerald-400" />
            <span className="text-slate-300">97% Detection Rate</span>
          </div>

          <div className="flex items-center gap-2 bg-slate-800/80 border border-slate-700/50 rounded-lg px-4 py-2">
            <Lock className="h-5 w-5 text-emerald-400" />
            <span className="text-slate-300">Real-time Protection</span>
          </div>

          <div className="flex items-center gap-2 bg-slate-800/80 border border-slate-700/50 rounded-lg px-4 py-2">
            <AlertTriangle className="h-5 w-5 text-emerald-400" />
            <span className="text-slate-300">Advanced Threat Analysis</span>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
