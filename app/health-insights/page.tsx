"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Brain, TrendingUp, Activity, Heart } from "lucide-react"

export default function HealthInsights() {
  const [insights, setInsights] = useState([
    {
      title: "Sleep Pattern",
      description: "Your average sleep duration has improved by 30 minutes this week.",
      icon: Brain,
    },
    {
      title: "Physical Activity",
      description: "You've met your daily step goal 5 out of 7 days this week. Great job!",
      icon: TrendingUp,
    },
    {
      title: "Heart Rate",
      description: "Your resting heart rate has decreased by 3 bpm over the past month.",
      icon: Heart,
    },
    {
      title: "Stress Levels",
      description:
        "Your stress levels seem to peak on Mondays and Thursdays. Consider scheduling relaxation activities on these days.",
      icon: Activity,
    },
  ])

  return (
    <div className="p-8">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold mb-8 flex items-center"
      >
        <Brain className="mr-2" /> Health Insights
      </motion.h1>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        {insights.map((insight, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + index * 0.1 }}
            className="bg-white p-6 rounded-lg shadow-md"
          >
            <div className="flex items-center mb-4">
              <insight.icon className="w-8 h-8 text-blue-600 mr-3" />
              <h2 className="text-xl font-semibold">{insight.title}</h2>
            </div>
            <p className="text-gray-600">{insight.description}</p>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="mt-8 bg-white p-6 rounded-lg shadow-md"
      >
        <h2 className="text-2xl font-semibold mb-4">Personalized Recommendations</h2>
        <ul className="space-y-4">
          <li className="flex items-start">
            <Activity className="w-6 h-6 text-green-500 mr-3 mt-1" />
            <p>Consider increasing your daily water intake to improve overall hydration.</p>
          </li>
          <li className="flex items-start">
            <Heart className="w-6 h-6 text-red-500 mr-3 mt-1" />
            <p>Your cardiovascular health could benefit from 30 minutes of moderate exercise 3-4 times a week.</p>
          </li>
          <li className="flex items-start">
            <Brain className="w-6 h-6 text-purple-500 mr-3 mt-1" />
            <p>Try incorporating mindfulness meditation for 10 minutes daily to reduce stress levels.</p>
          </li>
        </ul>
      </motion.div>
    </div>
  )
}

