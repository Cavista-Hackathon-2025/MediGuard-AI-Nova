"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Stethoscope, Search } from "lucide-react"

export default function SymptomChecker() {
  const [symptoms, setSymptoms] = useState("")
  const [results, setResults] = useState<string[]>([])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate API call
    setResults(["Common Cold", "Seasonal Allergies", "Sinus Infection"])
  }

  return (
    <div className="p-8">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold mb-8 flex items-center"
      >
        <Stethoscope className="mr-2" /> Symptom Checker
      </motion.h1>

      <motion.form
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        onSubmit={handleSubmit}
        className="mb-8"
      >
        <div className="flex items-center bg-white rounded-lg shadow-md">
          <input
            type="text"
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
            placeholder="Describe your symptoms..."
            className="flex-grow p-4 rounded-l-lg focus:outline-none"
          />
          <button type="submit" className="bg-blue-600 text-white p-4 rounded-r-lg hover:bg-blue-700 transition-colors">
            <Search />
          </button>
        </div>
      </motion.form>

      {results.length > 0 && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <h2 className="text-2xl font-semibold mb-4">Possible Conditions:</h2>
          <ul className="space-y-4">
            {results.map((result, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="bg-white p-4 rounded-lg shadow-md"
              >
                {result}
              </motion.li>
            ))}
          </ul>
        </motion.div>
      )}
    </div>
  )
}

