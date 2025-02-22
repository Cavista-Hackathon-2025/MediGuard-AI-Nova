"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Ambulance, Phone, MapPin } from "lucide-react"

export default function EmergencyAssistance() {
  const [location, setLocation] = useState<GeolocationCoordinates | null>(null)
  const [nearbyHospitals, setNearbyHospitals] = useState([
    { name: "City General Hospital", distance: "2.5 km" },
    { name: "St. Mary's Medical Center", distance: "3.8 km" },
    { name: "University Hospital", distance: "5.2 km" },
  ])

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => setLocation(position.coords),
        (error) => console.error("Error getting location:", error),
      )
    }
  }, [])

  return (
    <div className="p-8">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold mb-8 flex items-center"
      >
        <Ambulance className="mr-2" /> Emergency Assistance
      </motion.h1>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        <div>
          <h2 className="text-2xl font-semibold mb-4">Emergency Contacts</h2>
          <ul className="space-y-4">
            <li>
              <a
                href="tel:911"
                className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center text-lg font-semibold"
              >
                <Phone className="mr-2" /> Call 911
              </a>
            </li>
            <li>
              <a
                href="tel:+1234567890"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center text-lg font-semibold"
              >
                <Phone className="mr-2" /> Call Your Doctor
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Your Location</h2>
          {location ? (
            <p className="mb-4">
              Latitude: {location.latitude.toFixed(4)}, Longitude: {location.longitude.toFixed(4)}
            </p>
          ) : (
            <p className="mb-4">Fetching your location...</p>
          )}
          <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center">
            <MapPin size={48} className="text-gray-400" />
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-8"
      >
        <h2 className="text-2xl font-semibold mb-4">Nearby Hospitals</h2>
        <ul className="space-y-4">
          {nearbyHospitals.map((hospital, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + index * 0.1 }}
              className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center"
            >
              <div>
                <h3 className="font-semibold">{hospital.name}</h3>
                <p className="text-sm text-gray-600">{hospital.distance}</p>
              </div>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hospital.name)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
              >
                Directions
              </a>
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </div>
  )
}

