"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { LogOut, Settings, Stethoscope, Pills, AlertTriangle, Ambulance, Brain, Activity, Shield, Menu, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useUser } from "../context/UserContext";

export default function DashboardLayout({ children }) {
  const { user, loading } = useUser();
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  if (loading) return <div>Loading...</div>;
  if (!user) return null;

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/auth");
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <motion.aside
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r shadow-sm transition-all duration-300 ease-in-out ${
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
            {[
              { href: "/dashboard", icon: Activity, label: "Dashboard" },
              { href: "/symptom-checker", icon: Stethoscope, label: "Symptom Checker" },
              { href: "/medication-reminders", icon: Pills, label: "Medication Reminders" },
              { href: "/drug-interactions", icon: AlertTriangle, label: "Drug Interactions" },
              { href: "/emergency", icon: Ambulance, label: "Emergency Help" },
              { href: "/health-insights", icon: Brain, label: "Health Insights" },
            ].map(({ href, icon: Icon, label }) => (
              <Link
                key={href}
                href={href}
                className="flex items-center space-x-3 px-4 py-3 text-gray-700 rounded-xl transition-all duration-200 hover:bg-gray-50"
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{label}</span>
              </Link>
            ))}
          </div>

          {/* Settings & Logout */}
          <div className="mt-8">
            <h3 className="px-4 text-sm font-semibold text-gray-500 uppercase tracking-wider">Settings</h3>
            <div className="mt-4 space-y-1">
              <Link href="/settings" className="flex items-center space-x-3 px-4 py-3 text-gray-700 rounded-xl transition-all duration-200 hover:bg-gray-50">
                <Settings className="w-5 h-5" />
                <span className="font-medium">Settings</span>
              </Link>
              <button onClick={handleLogout} className="flex items-center space-x-3 px-4 py-3 text-gray-700 rounded-xl transition-all duration-200 hover:bg-gray-50 w-full">
                <LogOut className="w-5 h-5" />
                <span className="font-medium">Log out</span>
              </button>
            </div>
          </div>
        </nav>
      </motion.aside>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Top Navbar */}
        <header className="bg-white border-b sticky top-0 z-10">
          <div className="flex items-center justify-between px-4 py-4">
            <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="mr-4 text-gray-500 focus:outline-none md:hidden">
              {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <div className="flex items-center space-x-4">
              <Image src="/profile.png" alt="Profile" width={40} height={40} className="rounded-full" />
              <span className="font-medium hidden md:inline-block">{user.name}</span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 md:p-8">{children}</main>
      </div>
    </div>
  );
}
