import { ArrowRight, Sparkles, BrainCircuit } from 'lucide-react'
import React from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { useNavigate } from 'react-router-dom'
import { getData } from '@/context/userContext'

const Hero = () => {
  const { user } = getData()
  const navigate = useNavigate()

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center bg-white text-black overflow-hidden">

      {/* Soft Background Glow */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-gray-200 blur-[120px] rounded-full opacity-30"></div>
      <div className="absolute bottom-10 right-10 w-64 h-64 bg-gray-300 blur-[120px] rounded-full opacity-30"></div>

      <section className="relative w-full mt-8 py-16">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex flex-col items-center text-center space-y-6">

            {user && (
              <h2 className="text-base md:text-lg font-medium text-gray-600">
                Welcome back,{" "}
                <span className="text-black font-semibold">
                  {user.username}
                </span>
              </h2>
            )}

            {/* Badge */}
            <Badge className="bg-black text-white px-3 py-1 text-xs">
              <Sparkles className="w-3 h-3 mr-2" />
              AI Powered Platform
            </Badge>

            {/* Main Heading */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight tracking-tight">
              Intelligent Platform
              <br />
              <span className="text-gray-500">
                Designed for the Future
              </span>
            </h1>

            {/* Description */}
            <p className="max-w-xl text-gray-600 text-sm md:text-base">
              Let AI organize, enhance, and structure your thoughts
              into powerful knowledge. Simple, clean, and built
              for modern productivity.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mt-4">
              <Button
                onClick={() => navigate('/create-todo')}
                size="lg"
                className="h-10 px-6 bg-black text-white hover:bg-gray-800 transition-all duration-300"
              >
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="h-10 px-6 border-black text-black hover:bg-black hover:text-white transition-all duration-300"
              >
                <BrainCircuit className="mr-2 h-4 w-4" />
                Explore AI
              </Button>
            </div>

            {/* Bottom Trust Line */}
            <p className="text-xs text-gray-500 mt-4">
              Clean • Intelligent • Secure
            </p>

          </div>
        </div>
      </section>
    </div>
  )
}

export default Hero
