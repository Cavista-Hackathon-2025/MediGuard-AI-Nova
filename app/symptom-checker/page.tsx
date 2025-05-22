"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Mic, Send, History, Search, ArrowRight } from "lucide-react"
import { SymptomChecker as checkSymptomAPI, GetSymptomChecker } from "../lib/api"

interface SymptomCheck {
  id: string
  message: string
  response: string
  created_at: string
}

export default function SymptomChecker() {
  const [symptoms, setSymptoms] = useState("")
  const [response, setResponse] = useState<string | null>(null)
  const [previousChecks, setPreviousChecks] = useState<SymptomCheck[]>([])
  const [loading, setLoading] = useState(false)


  // Example: Symptom checker
// const result = await SymptomChecker("I have a headache")


  useEffect(() => {
    const fetchPreviousChecks = async () => {
      try {
        const response = await GetSymptomChecker()
        if (response?.status === "success" && response.data) {
          setPreviousChecks(response.data.symptomChecks || [])
        }
      } catch (error) {
        console.error("Error fetching previous symptoms:", error)
      }
    }

    fetchPreviousChecks()
  }, [])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const handleCheckSymptoms = async () => {
    if (!symptoms.trim()) return

    setLoading(true)
    setResponse(null)

    try {
      const response = await checkSymptomAPI(symptoms)

      if (response?.status === "success") {
        setResponse(response.data.response)
        // Refresh the list of previous checks
        const updatedChecks = await GetSymptomChecker()
        if (updatedChecks?.status === "success" && updatedChecks.data) {
          setPreviousChecks(updatedChecks.data.symptomChecks || [])
        }
      } else {
        setResponse(response?.message || "Something went wrong. Try again.")
      }
    } catch (err) {
      setResponse("Oops! Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-sm border p-6 md:p-8 mb-8"
        >
          <h1 className="text-2xl font-semibold mb-6">How are you feeling today?</h1>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              placeholder="Describe your symptoms..."
              className="block w-full pl-11 pr-16 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-colors"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault()
                  handleCheckSymptoms()
                }
              }}
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-2">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Mic className="h-5 w-5 text-gray-400" />
              </button>
              <button
                onClick={handleCheckSymptoms}
                disabled={loading || !symptoms.trim()}
                className="ml-2 bg-blue-600 text-white p-2 rounded-lg shadow-sm hover:bg-blue-700 transition-colors disabled:bg-gray-300"
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
          </div>

          {loading && (
            <div className="mt-4 flex items-center text-sm text-gray-500">
              <div className="animate-pulse mr-2">●</div>
              Analyzing your symptoms...
            </div>
          )}

          {response && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 p-4 bg-gray-50 rounded-xl border border-gray-200"
            >
              <div className="prose max-w-none whitespace-pre-line">{response}</div>
            </motion.div>
          )}
        </motion.div>

        {previousChecks.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold flex items-center">
                <History className="w-5 h-5 mr-2" />
                Your recent symptom checks
              </h2>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center">
                View all <ArrowRight className="w-4 h-4 ml-1" />
              </button>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {previousChecks.map((check, index) => (
                <motion.div
                  key={check.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 line-clamp-1">{check.message}</h3>
                      <p className="text-sm text-gray-500">{formatDate(check.created_at)}</p>
                    </div>
                    <button
                      className="ml-4 p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      onClick={() => {
                        setSymptoms(check.message)
                        window.scrollTo({ top: 0, behavior: "smooth" })
                      }}
                    >
                      <Search className="w-4 h-4 text-gray-400" />
                    </button>
                  </div>
                  <p className="text-sm text-gray-600 line-clamp-3">{check.response}</p>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

