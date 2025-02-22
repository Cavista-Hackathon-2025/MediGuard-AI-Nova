"use client"

import { useState } from "react"
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
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function Dashboard() {
  const router = useRouter()
  const [notifications, setNotifications] = useState([
    { id: 1, title: "Medication Reminder", message: "Time to take Aspirin", time: "2:30 PM" },
    { id: 2, title: "Doctor Appointment", message: "Check-up tomorrow", time: "10:00 AM" },
  ])

  const handleLogout = () => {
    // TODO: Implement actual logout logic (clear session, etc.)
    router.push("/auth")
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <motion.aside
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="w-72 bg-white border-r shadow-sm"
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
      </motion.aside>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Top Navigation */}
        <header className="bg-white border-b sticky top-0 z-10">
          <div className="flex items-center justify-between px-8 py-4">
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg">
                <span className="sr-only">View notifications</span>
                <Bell className="h-6 w-6" />
                <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white"></span>
              </button>
              <button className="flex items-center space-x-2 text-gray-700 hover:text-gray-900">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-21%20115139-oehJuzUt11jfPrUl7pR14RdKJHCZS9.png"
                  alt="Profile"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <span className="font-medium">John Doe</span>
              </button>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="p-8">
          {/* Welcome Banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white mb-8"
          >
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-3xl font-bold mb-2">Welcome back, John! 👋</h2>
                <p className="text-blue-100 mb-4">Here's your health overview for today</p>
                <button className="bg-white text-blue-600 px-6 py-2 rounded-lg font-medium hover:bg-blue-50 transition-all">
                  View Health Report
                </button>
              </div>
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-21%20115139-oehJuzUt11jfPrUl7pR14RdKJHCZS9.png"
                alt="Health Illustration"
                width={200}
                height={200}
                className="w-48 h-48"
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
                <button className="text-blue-600 hover:text-blue-700">View all</button>
              </div>
              <div className="space-y-4">
                {[1, 2, 3].map((_, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <Pills className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">Aspirin</h4>
                        <p className="text-sm text-gray-500">100mg - 1 tablet</p>
                      </div>
                    </div>
                    <span className="text-blue-600 font-medium">2:30 PM</span>
                  </div>
                ))}
                <button className="w-full py-3 text-blue-600 hover:bg-blue-50 rounded-lg transition-all flex items-center justify-center space-x-2">
                  <Plus className="w-5 h-5" />
                  <span>Add Medication</span>
                </button>
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
    </div>
  )
}

