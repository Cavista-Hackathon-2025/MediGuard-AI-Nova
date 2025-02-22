"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function SignUpForm() {
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      alert("Passwords don't match")
      return
    }
    // TODO: Implement actual sign up logic
    console.log("Sign up attempt with:", email, password)
    router.push("/dashboard")
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block mb-2">
          Full Name
        </label>
        <input
          type="text"
          id="name"
          required
          className="w-full p-2 border rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="email" className="block mb-2">
          Email
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-2 border rounded"
        />
      </div>
      <div>
        <label htmlFor="password" className="block mb-2">
          Password
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full p-2 border rounded"
        />
      </div>
      <div>
        <label htmlFor="confirmPassword" className="block mb-2">
          Confirm Password
        </label>
        <input
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          className="w-full p-2 border rounded"
        />
      </div>
      <button type="submit" className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
        Sign Up
      </button>
    </form>
  )
}

