import React, { useEffect, useState } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { Delete, ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export function PinScreen() {
  const [pin, setPin] = useState('')
  const [isError, setIsError] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const controls = useAnimation()
  const navigate = useNavigate()
  const PIN_LENGTH = 4
  const CORRECT_PIN = '1234'

  useEffect(() => {
    if (pin.length === PIN_LENGTH) {
      if (pin === CORRECT_PIN) {
        setIsSuccess(true)
        // Reset after showing success state briefly
        setTimeout(() => {
          setPin('')
          setIsSuccess(false)
          // For now, let's just go back to login or somewhere else if we had a success page
          // navigate('/dashboard') 
        }, 1500)
      } else {
        setIsError(true)
        // Shake animation
        controls
          .start({
            x: [-10, 10, -10, 10, -5, 5, 0],
            transition: {
              duration: 0.4,
            },
          })
          .then(() => {
            setPin('')
            setIsError(false)
          })
      }
    }
  }, [pin, controls, navigate])

  const handlePress = (num: string) => {
    if (pin.length < PIN_LENGTH && !isError && !isSuccess) {
      setPin((prev) => prev + num)
    }
  }

  const handleBackspace = () => {
    if (pin.length > 0 && !isError && !isSuccess) {
      setPin((prev) => prev.slice(0, -1))
    }
  }

  // Keypad configuration
  const keypad = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
    [null, '0', 'backspace'],
  ]

  return (
    <div className="min-h-screen bg-black text-white font-sans flex flex-col selection:bg-[#00D632]/30">
      <div className="max-w-md mx-auto w-full h-full flex flex-col flex-1 px-6 pt-12 pb-8">
        {/* Top Navigation */}
        <div className="flex items-center justify-between mb-8">
          <button 
            onClick={() => navigate(-1)}
            className="p-2 -ml-2 rounded-full active:bg-white/10 transition-colors">
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
          <div className="w-6 h-6" /> {/* Spacer to balance the back arrow */}
        </div>

        {/* Header */}
        <div className="flex flex-col items-center mt-4 mb-12">
          <h1 className="text-lg font-medium tracking-wide">
            Enter your Cash PIN
          </h1>
        </div>

        {/* PIN Indicators */}
        <motion.div
          animate={controls}
          className="flex justify-center gap-6 mb-12"
        >
          {Array.from({
            length: PIN_LENGTH,
          }).map((_, i) => {
            const isFilled = i < pin.length
            return (
              <motion.div
                key={i}
                initial={false}
                animate={{
                  scale: isFilled ? [1, 1.2, 1] : 1,
                  backgroundColor: isSuccess
                    ? '#00D632' // Cash App Green
                    : isFilled
                      ? '#FFFFFF'
                      : 'rgba(255, 255, 255, 0.15)',
                }}
                transition={{
                  duration: 0.2,
                }}
                className="w-4 h-4 rounded-full"
              />
            )
          })}
        </motion.div>

        {/* Forgot PIN Link */}
        <div className="flex justify-center mb-auto">
          <button className="text-white/60 text-sm font-medium hover:text-white hover:underline underline-offset-4 transition-all">
            Forgot Cash PIN?
          </button>
        </div>

        {/* Keypad */}
        <div className="grid grid-cols-3 gap-y-4 gap-x-4 mt-12">
          {keypad.flat().map((key, index) => {
            if (key === null) {
              return <div key={`empty-${index}`} />
            }
            if (key === 'backspace') {
              return (
                <motion.button
                  key="backspace"
                  whileTap={{
                    scale: 0.9,
                  }}
                  onClick={handleBackspace}
                  className="w-20 h-20 mx-auto rounded-full flex items-center justify-center active:bg-white/15 transition-colors"
                  aria-label="Backspace"
                >
                  <Delete className="w-7 h-7 text-white" />
                </motion.button>
              )
            }
            return (
              <motion.button
                key={key}
                whileTap={{
                  scale: 0.9,
                }}
                onClick={() => handlePress(key)}
                className="w-20 h-20 mx-auto rounded-full flex items-center justify-center text-3xl font-medium active:bg-white/15 transition-colors"
              >
                {key}
              </motion.button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
