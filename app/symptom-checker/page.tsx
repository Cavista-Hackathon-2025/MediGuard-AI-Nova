"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mic } from "lucide-react";

export default function SymptomChecker() {
  const [symptoms, setSymptoms] = useState("");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-xl font-bold mb-4 text-center"
      >
        How are you feeling?
      </motion.h1>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="relative w-full max-w-md"
      >
        <input
          type="text"
          value={symptoms}
          onChange={(e) => setSymptoms(e.target.value)}
          placeholder="Describe your symptoms"
          className="w-full p-4 rounded-xl border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
        />
        <Mic className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
      </motion.div>
    </div>
  );
}
