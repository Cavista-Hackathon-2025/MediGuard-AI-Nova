"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { Shield } from "lucide-react"
import { login, createAccount } from "../lib/api"
import { useUser } from "../context/UserContext"

export default function Auth() {
  const router = useRouter()
  const { setUser } = useUser()
  const [isLogin, setIsLogin] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    phoneNumber: "",
  })
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      let user
      if (isLogin) {
        user = await login(formData.email, formData.password)
      } else {
        user = await createAccount(formData.fullName, formData.email, formData.password, formData.phoneNumber)
      }
      setUser(user)
      router.push("/dashboard")
    } catch (error) {
      console.error("Authentication error:", error)
      setError(isLogin ? "Invalid email or password" : "Failed to create account. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row">
      {/* Left Side - Gradient Background with Text */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex flex-col md:w-1/2 bg-gradient-to-b from-blue-400 to-cyan-300 p-8 md:p-12 text-white relative"
      >
        <div className="flex items-center space-x-2 mb-8">
          <Shield className="w-6 h-6" />
          <span className="text-sm font-medium">MediGuard AI</span>
        </div>
        <div className="flex-grow flex items-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
            {isLogin ? "Your Health Is\nOur Priority" : "Get Started\nWith Us\nToday!"}
          </h1>
        </div>
      </motion.div>

      {/* Right Side - Auth Form */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="w-full md:w-1/2 flex items-center justify-center p-8"
      >
        <div className="w-full max-w-md">
          <h2 className="text-2xl font-semibold mb-8">{isLogin ? "Sign-in" : "Create An Account"}</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <>
                <div>
                  <input
                    type="text"
                    placeholder="Full name"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                    required
                  />
                </div>
                <div>
                  <input
                    type="tel"
                    placeholder="Phone number"
                    value={formData.phoneNumber}
                    onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                    required
                  />
                </div>
              </>
            )}

            <div>
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                required
              />
            </div>

            <div>
              <input
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                required
              />
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full bg-blue-500 text-white py-3 rounded-lg transition-all
                ${isLoading ? "opacity-70 cursor-not-allowed" : "hover:bg-blue-600"}`}
            >
              {isLoading ? "Please wait..." : isLogin ? "Login" : "Create Account"}
            </button>

            <p className="text-center text-sm text-gray-600">
              {isLogin ? (
                <>
                  Don't have an account?{" "}
                  <button
                    type="button"
                    onClick={() => setIsLogin(false)}
                    className="text-blue-500 hover:text-blue-700 font-medium"
                  >
                    Signup Here
                  </button>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={() => setIsLogin(true)}
                    className="text-blue-500 hover:text-blue-700 font-medium"
                  >
                    Login Here
                  </button>
                </>
              )}
            </p>
          </form>
        </div>
      </motion.div>
    </div>
  )
}

