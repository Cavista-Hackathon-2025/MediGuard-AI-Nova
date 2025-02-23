"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Mic, Send } from "lucide-react";
import { SymptomChecker as checkSymptomAPI, GetSymptomChecker } from "../lib/api"; // Adjust path if needed

export default function SymptomChecker() {
  const [symptoms, setSymptoms] = useState("");
  const [response, setResponse] = useState<string | null>(null);
  const [previousChecks, setPreviousChecks] = useState<{ symptom: string; result: string }[]>([]);
  const [loading, setLoading] = useState(false);

  // ✅ Fetch Previous Symptom Checks on Mount
  useEffect(() => {
    const fetchPreviousChecks = async () => {
      try {
        const data = await GetSymptomChecker();
        setPreviousChecks(data || []);
      } catch (error) {
        console.error("Error fetching previous symptoms:", error);
      }
    };

    fetchPreviousChecks();
  }, []);

  // ✅ Function to Format API Response for Readability
  const formatResponse = (data: any): string => {
    if (!data) return "No response received.";

    if (typeof data === "string") {
      return data.trim(); // Clean plain text responses.
    }

    if (Array.isArray(data)) {
      return data.map((item) => `- ${item}`).join("\n"); // Convert arrays to bullet points.
    }

    if (typeof data === "object") {
      return Object.entries(data)
        .map(([key, value]) => {
          const formattedKey = key.replace(/_/g, " ").toUpperCase(); // Format keys nicely
          if (Array.isArray(value)) {
            return `**${formattedKey}**:\n${value.map((v) => `- ${v}`).join("\n")}`;
          } else if (typeof value === "object") {
            return `**${formattedKey}**:\n${formatResponse(value)}`;
          } else {
            return `**${formattedKey}**: ${value}`;
          }
        })
        .join("\n\n"); // Separate sections with line breaks.
    }

    return "Unknown response format.";
  };

  const handleCheckSymptoms = async () => {
    if (!symptoms.trim()) return; // Prevent empty input

    setLoading(true);
    setResponse(null);

    try {
      const data = await checkSymptomAPI(symptoms);

      if (data?.status === "success") {
        const formattedResult = formatResponse(data.data); // Format the response neatly
        setResponse(formattedResult);
        // setPreviousChecks((prev) => [...prev, { symptom: symptoms, result: formattedResult }]);
      } else {
        setResponse(data.message || "Something went wrong. Try again.");
      }
    } catch (err) {
      setResponse("Oops! Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-xl font-bold mb-6 text-center"
      >
        How are you feeling today?
      </motion.h1>

      {/* Input Field */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="relative w-full max-w-2xl"
      >
        <div className="relative">
          <Mic className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />

          <input
            type="text"
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
            placeholder="Describe your symptoms..."
            className="w-full p-4 pl-12 pr-14 rounded-xl border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400 text-lg"
          />

          <button
            onClick={handleCheckSymptoms}
            disabled={loading}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white p-2 rounded-full shadow-md hover:bg-blue-700 transition disabled:bg-gray-400"
          >
            <Send size={18} />
          </button>
        </div>
      </motion.div>

      {/* Response Section */}
      {loading && (
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 text-gray-600 text-sm italic">
          Typing...
        </motion.p>
      )}

      {response && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-6 w-full max-w-2xl bg-white p-4 rounded-xl border border-gray-200 shadow-md whitespace-pre-line"
        >
          {response}
        </motion.div>
      )}

      {/* Previous Symptom Checks */}
      {previousChecks.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8 w-full max-w-2xl bg-white p-4 rounded-xl border border-gray-200 shadow-md"
        >
          <h2 className="text-lg font-semibold mb-4">Past Symptom Checks</h2>
          <ul className="space-y-3">
            {previousChecks.map((item, index) => (
              <li key={index} className="p-3 bg-gray-100 rounded-lg whitespace-pre-line">
                <strong className="block text-gray-700">Symptom:</strong> {item.symptom}
                <strong className="block mt-1 text-gray-700">Result:</strong> {item.result}
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </div>
  );
}
