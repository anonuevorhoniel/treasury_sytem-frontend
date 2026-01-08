"use client"

import { useEffect, useState } from "react"

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) return 90
        return prev + Math.random() * 30
      })
    }, 200)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5 flex flex-col items-center justify-center p-4">
      <div className="flex flex-col items-center space-y-8">
        {/* Logo Animation */}
        <div className="relative">
          <div className="w-16 h-16 bg-gradient-to-br from-accent to-accent/60 rounded-lg flex items-center justify-center animate-pulse">
            <span className="text-3xl font-bold text-primary-foreground">T</span>
          </div>
          <div className="absolute inset-0 w-16 h-16 border-2 border-transparent border-t-accent border-r-accent rounded-lg animate-spin" />
        </div>


        {/* Progress Bar */}
        <div className="w-64 h-1 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-accent to-accent/60 transition-all duration-300 rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Loading Status */}
        <div className="text-sm text-muted-foreground">{Math.round(progress)}%</div>
    
      </div>
    </div>
  )
}
