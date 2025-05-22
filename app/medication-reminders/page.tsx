"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { PillIcon as Pills, Plus, Bell, X } from "lucide-react"
import Link from "next/link"
import { createMedicationReminder, getMedicationReminders, type MedicationReminder } from "../lib/api"

export default function MedicationReminders() {


  // Example: Get medication reminders
// const reminders = await getMedicationReminders()

  const [medications, setMedications] = useState<MedicationReminder[]>([])
  const [newMedication, setNewMedication] = useState<Omit<MedicationReminder, "medication_remainder_id" | "schedule">>({
    medication_name: "",
    medication_dose: "",
    repeat_interval: 0,
    medication_date: new Date().toISOString().split("T")[0],
  })

  useEffect(() => {
    fetchMedications()
  }, [])

  const fetchMedications = async () => {
    try {
      const response = await getMedicationReminders()
      if (response.status === "success") {
        setMedications(response.data.medicationRemainders)
      }
    } catch (error) {
      console.error("Error fetching medications:", error)
    }
  }

  const handleAddMedication = async (e: React.FormEvent) => {
    e.preventDefault()
    if (newMedication.repeat_interval >= 0.1 && newMedication.repeat_interval <= 24) { 
      try {
        const response = await createMedicationReminder(newMedication)
        if (response.status === "success") {
          await fetchMedications()
          setNewMedication({
            medication_name: "",
            medication_dose: "",
            repeat_interval: 0
          })
        }
      } catch (error) {
        console.error("Error adding medication:", error)
      }
    } else {
      alert("Interval must be between 0.1 and 24 hours.")
    }
  }
  
  
  const handleRemoveMedication = async (id: string) => {
    // Implement delete functionality here
    console.log("Remove medication with id:", id)
    // After successful deletion, refetch medications
    await fetchMedications()
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
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <input
            type="text"
            value={newMedication.medication_name}
            onChange={(e) => setNewMedication({ ...newMedication, medication_name: e.target.value })}
            placeholder="Medication Name"
            className="p-2 border rounded"
            required
          />
          <input
            type="text"
            value={newMedication.medication_dose}
            onChange={(e) => setNewMedication({ ...newMedication, medication_dose: e.target.value })}
            placeholder="Dosage"
            className="p-2 border rounded"
            required
          />
<input
  type="number"
  value={newMedication.repeat_interval}
  onChange={(e) => setNewMedication({ ...newMedication, repeat_interval: Number(e.target.value) })}
  placeholder="Interval (hours)"
  className="p-2 border rounded"
  min="0.1"
  max="24"
  step="0.1"
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
                key={medication.medication_remainder_id}
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
                    <h3 className="font-semibold">{medication.medication_name}</h3>
                    <p className="text-sm text-gray-600">
                      {medication.medication_dose} at, every {medication.repeat_interval}{" "}
                      hours
                    </p>
                    <p className="text-sm text-gray-600">
                      Starting from: {new Date(medication.medication_date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <button className="text-blue-600 hover:text-blue-800 mr-2">
                    <Bell size={20} />
                  </button>
                  <button
                    onClick={() => handleRemoveMedication(medication.medication_remainder_id)}
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

