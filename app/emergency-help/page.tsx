"use client"
import React from 'react'
import { useState } from "react"
// import HospitalMap  from "@components/HospitalMap"
export default function EmergencyHelp(): JSX.Element {
  return (
    <>
      {/* mapping start */}
      <div>
            <div className="flex flex-col items-center justify-center h-screen">
              <h2 className="text-3xl font-bold mb-4">Quick Emergency response </h2>
              <div>
                <div className="rounded-full">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d7926.907829142541!2d3.3948308834333947!3d6.5903655231113145!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1shospitals%20%26%20clinics!5e0!3m2!1sen!2sng!4v1740243202574!5m2!1sen!2sng"
                  width="1200"
                  height="350"
                  className="iframe-style"
                  allowFullScreen
                  title="Hospital and Clinics Map"
                ></iframe>
                </div>
              
              </div>
            </div>
          </div>
      {/* mapping end */}
    </>
  )
}

// export default emergency-help