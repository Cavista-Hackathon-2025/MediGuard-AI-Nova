"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Shield, Brain, PillIcon, Stethoscope, AlertTriangle, Activity, ArrowRight, Menu } from "lucide-react"
import { useState } from "react"

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50">
      {/* Navigation */}
      <nav className="container mx-auto px-4 py-6 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Shield className="w-8 h-8 text-blue-600" />
          <span className="text-xl font-bold">MediGuard AI</span>
        </Link>
        <div className="hidden md:flex items-center space-x-4">
          <Link href="/auth" className="bg-white text-blue-600 px-6 py-2 rounded-full hover:bg-blue-50 transition-all">
            Log In
          </Link>
          <Link href="/auth" className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-all">
            Get Started
          </Link>
        </div>
        <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <Menu className="w-6 h-6" />
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white p-4">
          <Link href="/auth" className="block text-center py-2 text-blue-600 hover:bg-blue-50 transition-all">
            Log In
          </Link>
          <Link
            href="/auth"
            className="block text-center py-2 mt-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all"
          >
            Get Started
          </Link>
        </div>
      )}

      {/* Hero Section */}
      <div className="container mx-auto px-4 pt-16 pb-24">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6">
              Your Personal{" "}
              <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                AI Health Guardian
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
              24/7 intelligent healthcare assistance powered by AI. Monitor medications, check symptoms, and get
              emergency help - all in one place.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/auth"
                className="w-full sm:w-auto bg-blue-600 text-white px-8 py-3 rounded-full hover:bg-blue-700 transition-all flex items-center justify-center group"
              >
                Start Protection
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="#features"
                className="w-full sm:w-auto bg-white text-blue-600 px-8 py-3 rounded-full hover:bg-blue-50 transition-all"
              >
                See Features
              </Link>
            </div>
          </motion.div>

          {/* Abstract Medical Graphics */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-16 relative"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-blue-50 to-transparent" />
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
              {[Brain, Activity, Shield].map((Icon, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + index * 0.2 }}
                  className="aspect-square relative group"
                >
                  <div className="absolute inset-0 bg-blue-500/5 rounded-3xl group-hover:bg-blue-500/10 transition-all" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Icon className="w-12 h-12 text-blue-600" />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="bg-white py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Comprehensive Health Protection</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Advanced AI technology working around the clock to keep you safe and healthy
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Brain,
                title: "AI-Powered Analysis",
                description: "Advanced algorithms analyze your symptoms and provide instant health insights",
              },
              {
                icon: PillIcon,
                title: "Medication Management",
                description: "Track your medications and get timely reminders for doses",
              },
              {
                icon: Stethoscope,
                title: "Symptom Checker",
                description: "Quick and accurate assessment of your health concerns",
              },
              {
                icon: AlertTriangle,
                title: "Drug Interaction Alerts",
                description: "Stay safe with real-time medication interaction warnings",
              },
              {
                icon: Shield,
                title: "Emergency Assistance",
                description: "Quick access to emergency services and medical information",
              },
              {
                icon: Activity,
                title: "Health Monitoring",
                description: "Continuous monitoring of your health patterns and vital signs",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 * index }}
                className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-2xl hover:shadow-lg transition-all"
              >
                <div className="w-12 h-12 bg-blue-600/10 rounded-xl flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="container mx-auto px-4 py-24">
        <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-3xl p-12 text-white">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: "24/7", label: "AI Protection" },
              { number: "100%", label: "Privacy" },
              { number: "Instant", label: "Analysis" },
              { number: "Real-time", label: "Alerts" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 * index }}
                className="space-y-2"
              >
                <div className="text-4xl font-bold">{stat.number}</div>
                <div className="text-blue-100">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

