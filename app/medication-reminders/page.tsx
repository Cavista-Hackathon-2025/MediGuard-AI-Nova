"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { PillIcon as Pills, Plus, Bell, X } from "lucide-react"
import Link from "next/link"

export default function MedicationReminders() {
  type Medication = {
    id: number
    name: string
    dosage: string
    time: string
    interval: number
  }

  const [medications, setMedications] = useState<Medication[]>([])
  const [newMedication, setNewMedication] = useState<Partial<Medication>>({
    name: "",
    dosage: "",
    time: "",
    interval: 2,
  })

  useEffect(() => {
    const storedMedications = localStorage.getItem("medications")
    if (storedMedications) {
      setMedications(JSON.parse(storedMedications))
    }
  }, [])

  const handleAddMedication = (e: React.FormEvent) => {
    e.preventDefault()
    if ((newMedication.interval ?? 0) >= 2 && (newMedication.interval ?? 0) <= 24) {
      const updatedMedications = [
        ...medications,
        {
          id: Date.now(),
          name: newMedication.name!,
          dosage: newMedication.dosage!,
          time: newMedication.time!,
          interval: newMedication.interval!,
        },
      ]
      setMedications(updatedMedications)
      localStorage.setItem("medications", JSON.stringify(updatedMedications))
      setNewMedication({ name: "", dosage: "", time: "", interval: 2 })
    } else {
      alert("Interval must be between 2 and 24 hours.")
    }
  }

  const handleRemoveMedication = (id: number) => {
    const updatedMedications = medications.filter((med) => med.id !== id)
    setMedications(updatedMedications)
    localStorage.setItem("medications", JSON.stringify(updatedMedications))
  }

  return (
    <div className="p-8">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold mb-8 flex items-center"
      >
        <Pills className="mr-2" /> Medication Reminders
      </motion.h1>

      <motion.form
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        onSubmit={handleAddMedication}
        className="mb-8 bg-white p-6 rounded-lg shadow-md"
      >
        <h2 className="text-xl font-semibold mb-4">Add New Medication</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="text"
            value={newMedication.name}
            onChange={(e) => setNewMedication({ ...newMedication, name: e.target.value })}
            placeholder="Medication Name"
            className="p-2 border rounded"
            required
          />
          <input
            type="text"
            value={newMedication.dosage}
            onChange={(e) => setNewMedication({ ...newMedication, dosage: e.target.value })}
            placeholder="Dosage"
            className="p-2 border rounded"
            required
          />
          <input
            type="time"
            value={newMedication.time}
            onChange={(e) => setNewMedication({ ...newMedication, time: e.target.value })}
            className="p-2 border rounded"
            required
          />
          <input
            type="number"
            value={newMedication.interval}
            onChange={(e) => setNewMedication({ ...newMedication, interval: Number(e.target.value) })}
            placeholder="Interval (hours)"
            className="p-2 border rounded"
            min="2"
            max="24"
            required
          />
        </div>
        <button
          type="submit"
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors flex items-center"
        >
          <Plus className="mr-2" /> Add Medication
        </button>
      </motion.form>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
        <h2 className="text-2xl font-semibold mb-4">Your Medications</h2>
        {medications.length > 0 ? (
          <ul className="space-y-4">
            {medications.map((medication, index) => (
              <motion.li
                key={medication.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <Pills className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{medication.name}</h3>
                    <p className="text-sm text-gray-600">
                      {medication.dosage} at {medication.time}, every {medication.interval} hours
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <button className="text-blue-600 hover:text-blue-800 mr-2">
                    <Bell size={20} />
                  </button>
                  <button
                    onClick={() => handleRemoveMedication(medication.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <X size={20} />
                  </button>
                </div>
              </motion.li>
            ))}
          </ul>
        ) : (
          <div className="text-center text-gray-500">
            No medications added yet. Use the form above to add medications.
          </div>
        )}
      </motion.div>

      <div className="mt-8">
        <Link href="/dashboard" className="text-blue-600 hover:text-blue-700">
          ← Back to Dashboard
        </Link>
      </div>
    </div>
  )
}

