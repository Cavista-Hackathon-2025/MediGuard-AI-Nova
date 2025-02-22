"use client"

import type React from "react"

import { useState } from "react"

export default function DrugInteraction() {
  const [medications, setMedications] = useState(["", ""])
  const [result, setResult] = useState("")

  const handleAddMedication = () => {
    setMedications([...medications, ""])
  }

  const handleMedicationChange = (index: number, value: string) => {
    const newMedications = [...medications]
    newMedications[index] = value
    setMedications(newMedications)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement actual API call to backend for drug interaction check
    setResult("No significant interactions found between the entered medications.")
  }

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Drug Interaction Checker</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {medications.map((medication, index) => (
          <div key={index}>
            <label htmlFor={`medication-${index}`} className="block mb-2">
              Medication {index + 1}:
            </label>
            <input
              type="text"
              id={`medication-${index}`}
              value={medication}
              onChange={(e) => handleMedicationChange(index, e.target.value)}
              required
              className="w-full p-2 border rounded"
            />
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddMedication}
          className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Another Medication
        </button>
        <button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Check Interactions
        </button>
      </form>
      {result && (
        <div className="mt-4 p-4 bg-gray-100 rounded">
          <h2 className="font-bold mb-2">Interaction Result:</h2>
          <p>{result}</p>
        </div>
      )}
    </div>
  )
}

