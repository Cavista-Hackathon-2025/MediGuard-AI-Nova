"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { AlertTriangle, Search, X } from "lucide-react"

export default function DrugInteractions() {
  const [medications, setMedications] = useState<string[]>([])
  const [newMedication, setNewMedication] = useState("")
  const [interactions, setInteractions] = useState<string[]>([])

  const handleAddMedication = (e: React.FormEvent) => {
    e.preventDefault()
    if (newMedication && !medications.includes(newMedication)) {
      setMedications([...medications, newMedication])
      setNewMedication("")
    }
  }

  const handleRemoveMedication = (med: string) => {
    setMedications(medications.filter((m) => m !== med))
  }

  const handleCheckInteractions = () => {
    // Simulate API call
    setInteractions(["Moderate interaction between Drug A and Drug B", "Minor interaction between Drug A and Drug C"])
  }

  return (
    <div className="p-8">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold mb-8 flex items-center"
      >
        <AlertTriangle className="mr-2" /> Drug Interactions Checker
      </motion.h1>

      <motion.form
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        onSubmit={handleAddMedication}
        className="mb-8"
      >
        <div className="flex items-center bg-white rounded-lg shadow-md">
          <input
            type="text"
            value={newMedication}
            onChange={(e) => setNewMedication(e.target.value)}
            placeholder="Enter medication name..."
            className="flex-grow p-4 rounded-l-lg focus:outline-none"
          />
          <button type="submit" className="bg-blue-600 text-white p-4 rounded-r-lg hover:bg-blue-700 transition-colors">
            Add
          </button>
        </div>
      </motion.form>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mb-8"
      >
        <h2 className="text-2xl font-semibold mb-4">Your Medications:</h2>
        <div className="flex flex-wrap gap-2">
          {medications.map((med, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 + index * 0.1 }}
              className="bg-white px-3 py-2 rounded-full shadow-md flex items-center"
            >
              {med}
              <button onClick={() => handleRemoveMedication(med)} className="ml-2 text-red-600 hover:text-red-800">
                <X size={16} />
              </button>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {medications.length > 1 && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          onClick={handleCheckInteractions}
          className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center"
        >
          <Search className="mr-2" /> Check Interactions
        </motion.button>
      )}

      {interactions.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="mt-8"
        >
          <h2 className="text-2xl font-semibold mb-4">Potential Interactions:</h2>
          <ul className="space-y-4">
            {interactions.map((interaction, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2 + index * 0.1 }}
                className="bg-white p-4 rounded-lg shadow-md"
              >
                {interaction}
              </motion.li>
            ))}
          </ul>
        </motion.div>
      )}
    </div>
  )
}

