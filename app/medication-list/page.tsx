"use client"

import type React from "react"

import { useState } from "react"

export default function MedicationList() {
  const [medications, setMedications] = useState([
    { name: "Aspirin", dosage: "100mg", frequency: "Once daily" },
    { name: "Lisinopril", dosage: "10mg", frequency: "Twice daily" },
  ])
  const [newMedication, setNewMedication] = useState({ name: "", dosage: "", frequency: "" })

  const handleAddMedication = (e: React.FormEvent) => {
    e.preventDefault()
    setMedications([...medications, newMedication])
    setNewMedication({ name: "", dosage: "", frequency: "" })
  }

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Medication List</h1>
      <ul className="space-y-2 mb-4">
        {medications.map((medication, index) => (
          <li key={index} className="p-2 bg-gray-100 rounded">
            <span className="font-bold">{medication.name}</span> - {medication.dosage}, {medication.frequency}
          </li>
        ))}
      </ul>
      <form onSubmit={handleAddMedication} className="space-y-4">
        <div>
          <label htmlFor="name" className="block mb-2">
            Medication Name:
          </label>
          <input
            type="text"
            id="name"
            value={newMedication.name}
            onChange={(e) => setNewMedication({ ...newMedication, name: e.target.value })}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="dosage" className="block mb-2">
            Dosage:
          </label>
          <input
            type="text"
            id="dosage"
            value={newMedication.dosage}
            onChange={(e) => setNewMedication({ ...newMedication, dosage: e.target.value })}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="frequency" className="block mb-2">
            Frequency:
          </label>
          <input
            type="text"
            id="frequency"
            value={newMedication.frequency}
            onChange={(e) => setNewMedication({ ...newMedication, frequency: e.target.value })}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <button type="submit" className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
          Add Medication
        </button>
      </form>
    </div>
  )
}

