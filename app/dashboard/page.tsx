"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import {
  Activity,
  Bell,
  Settings,
  LogOut,
  Stethoscope,
  PillIcon as Pills,
  AlertTriangle,
  Ambulance,
  Brain,
  CalendarIcon,
  Plus,
  Shield,
  Menu,
  X,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useUser } from "../context/UserContext"

export default function Dashboard() {
  const router = useRouter()
  const { user, loading } = useUser()
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [notifications, setNotifications] = useState([
    { id: 1, title: "Medication Reminder", message: "Time to take Aspirin", time: "2:30 PM" },
    { id: 2, title: "Doctor Appointment", message: "Check-up tomorrow", time: "10:00 AM" },
  ])
  interface Medication {
    name: string
    dosage: string
    time: string
    interval: number
  }

  const [medications, setMedications] = useState<Medication[]>([])

  useEffect(() => {
    const token = localStorage.getItem("token")

    if (!token) {
      router.replace("/auth") // Redirect to login if token is missing
    }

    const storedMedications = localStorage.getItem("medications")
    if (storedMedications) {
      setMedications(JSON.parse(storedMedications))
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("token") // Remove the authentication token
    router.push("/auth") // Redirect to login page
  }

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  if (loading) {
    return <div>Loading...</div>
  }

  if (!user) {
    return null
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r shadow-sm transition-all duration-300 ease-in-out transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:relative md:translate-x-0`}
      >
        <div className="p-6">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              MediGuard AI
            </span>
          </Link>
        </div>

        <nav className="px-4 py-4">
          <div className="space-y-1">
            <Link
              href="/dashboard"
              className="flex items-center space-x-3 px-4 py-3 text-blue-600 bg-blue-50 rounded-xl transition-all duration-200 hover:bg-blue-100"
            >
              <Activity className="w-5 h-5" />
              <span className="font-medium">Dashboard</span>
            </Link>

            <Link
              href="/symptom-checker"
              className="flex items-center space-x-3 px-4 py-3 text-gray-700 rounded-xl transition-all duration-200 hover:bg-gray-50"
            >
              <Stethoscope className="w-5 h-5" />
              <span className="font-medium">Symptom Checker</span>
            </Link>

            <Link
              href="/medication-reminders"
              className="flex items-center space-x-3 px-4 py-3 text-gray-700 rounded-xl transition-all duration-200 hover:bg-gray-50"
            >
              <Pills className="w-5 h-5" />
              <span className="font-medium">Medication Reminders</span>
            </Link>

            <Link
              href="/drug-interactions"
              className="flex items-center space-x-3 px-4 py-3 text-gray-700 rounded-xl transition-all duration-200 hover:bg-gray-50"
            >
              <AlertTriangle className="w-5 h-5" />
              <span className="font-medium">Drug Interactions</span>
            </Link>

            <Link
              href="/emergency"
              className="flex items-center space-x-3 px-4 py-3 text-gray-700 rounded-xl transition-all duration-200 hover:bg-gray-50"
            >
              <Ambulance className="w-5 h-5" />
              <span className="font-medium">Emergency Help</span>
            </Link>

            <Link
              href="/health-insights"
              className="flex items-center space-x-3 px-4 py-3 text-gray-700 rounded-xl transition-all duration-200 hover:bg-gray-50"
            >
              <Brain className="w-5 h-5" />
              <span className="font-medium">Health Insights</span>
            </Link>
          </div>

          <div className="mt-8">
            <h3 className="px-4 text-sm font-semibold text-gray-500 uppercase tracking-wider">Settings</h3>
            <div className="mt-4 space-y-1">
              <Link
                href="/settings"
                className="flex items-center space-x-3 px-4 py-3 text-gray-700 rounded-xl transition-all duration-200 hover:bg-gray-50"
              >
                <Settings className="w-5 h-5" />
                <span className="font-medium">Settings</span>
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-3 px-4 py-3 text-gray-700 rounded-xl transition-all duration-200 hover:bg-gray-50 w-full"
              >
                <LogOut className="w-5 h-5" />
                <span className="font-medium">Log out</span>
              </button>
            </div>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Top Navigation */}
        <header className="bg-white border-b sticky top-0 z-10">
          <div className="flex items-center justify-between px-4 py-4">
            <div className="flex items-center">
              <button
                onClick={toggleSidebar}
                className="mr-4 text-gray-500 focus:outline-none focus:text-gray-700 md:hidden"
              >
                {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
              <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg">
                <span className="sr-only">View notifications</span>
                <Bell className="h-6 w-6" />
                <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white"></span>
              </button>
              <button className="flex items-center space-x-2 text-gray-700 hover:text-gray-900">
                {user?.name ? (
                  <div className="w-10 h-10 flex items-center justify-center bg-blue-600 text-white font-bold rounded-full">
                    {user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()}
                  </div>
                ) : (
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-21%20115139-oehJuzUt11jfPrUl7pR14RdKJHCZS9.png"
                    alt="Profile"
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                )}

                <span className="font-medium hidden md:inline-block">{user.name}</span>
              </button>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="p-4 md:p-8">
          {/* Welcome Banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 md:p-8 text-white mb-8"
          >
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-2">Welcome back, {user.name}! 👋</h2>
                <p className="text-blue-100 mb-4">Here's your health overview for today</p>
                <button className="bg-white text-blue-600 px-6 py-2 rounded-lg font-medium hover:bg-blue-50 transition-all">
                  View Health Report
                </button>
              </div>
              <Image
                src="/ghuo.jpg"
                alt="Health Illustration"
                width={700}
                height={300}
                className="w-48 h-48 mt-4 md:mt-0 rounded-[1.5rem]"
              />
            </div>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-gray-500">Today's Medications</h3>
                <Pills className="w-5 h-5 text-blue-500" />
              </div>
              <div className="text-2xl font-bold text-gray-900">3/4</div>
              <div className="mt-2 text-sm text-gray-600">Next dose in 2 hours</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-gray-500">Upcoming Appointments</h3>
                <CalendarIcon className="w-5 h-5 text-green-500" />
              </div>
              <div className="text-2xl font-bold text-gray-900">2</div>
              <div className="mt-2 text-sm text-gray-600">Next: March 15, 10:00 AM</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-gray-500">Health Score</h3>
                <Activity className="w-5 h-5 text-purple-500" />
              </div>
              <div className="text-2xl font-bold text-gray-900">85%</div>
              <div className="mt-2 text-sm text-green-600">↑ 5% from last week</div>
            </motion.div>
          </div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Upcoming Medications */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-xl shadow-sm p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Upcoming Medications</h2>
                <Link href="/medication-reminders" className="text-blue-600 hover:text-blue-700">
                  View all
                </Link>
              </div>
              <div className="space-y-4">
                {medications.length > 0 ? (
                  medications.slice(0, 3).map((medication, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                          <Pills className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">{medication.name}</h4>
                          <p className="text-sm text-gray-500">{medication.dosage}</p>
                          <p className="text-sm text-gray-500">{new Date().toLocaleDateString()}</p>
                        </div>
                      </div>
                      <span className="text-blue-600 font-medium">{medication.time}</span>
                    </div>
                  ))
                ) : (
                  <div className="text-center text-gray-500">
                    No medications added yet. Add medications from the Medication Reminders page.
                  </div>
                )}
                <Link
                  href="/medication-reminders"
                  className="w-full py-3 text-blue-600 hover:bg-blue-50 rounded-lg transition-all flex items-center justify-center space-x-2"
                >
                  <Plus className="w-5 h-5" />
                  <span>Add Medication</span>
                </Link>
              </div>
            </motion.div>

            {/* Calendar */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white rounded-xl shadow-sm p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Calendar</h2>
                <button className="text-blue-600 hover:text-blue-700">View all</button>
              </div>
              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-2 text-center text-sm mb-4">
                {["S", "M", "T", "W", "T", "F", "S"].map((day) => (
                  <div key={day} className="text-gray-500 font-medium p-2">
                    {day}
                  </div>
                ))}
                {Array.from({ length: 31 }, (_, i) => (
                  <button
                    key={i}
                    className={`p-2 rounded-lg transition-all ${
                      i + 1 === 15 ? "bg-blue-600 text-white" : "hover:bg-gray-100"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
              {/* Upcoming Events */}
              <div className="space-y-4 mt-6">
                <h3 className="font-medium text-gray-900">Upcoming Events</h3>
                {[1, 2].map((_, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                    <div>
                      <h4 className="font-medium text-gray-900">Doctor's Appointment</h4>
                      <p className="text-sm text-gray-500">March 15, 10:00 AM</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </main>
      </div>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden" onClick={toggleSidebar}></div>
      )}
    </div>
  )
}

