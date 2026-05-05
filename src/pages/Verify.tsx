import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { HelpCircle } from 'lucide-react';
import { CashAppLogo } from '../components/CashAppLogo';
import { RecaptchaBadge } from '../components/RecaptchaBadge';

export function Verify() {
  const [code, setCode] = useState('');
  const location = useLocation();
  const contact = location.state?.contact || '(209) 432-9317';
  const method = location.state?.method || 'phone';

  return (
    <div className="min-h-screen bg-black text-white font-sans relative flex flex-col">
      <div className="flex-1 w-full max-w-[520px] px-6 py-8 md:px-12 md:py-12 mx-auto md:mx-0">
        <CashAppLogo />

        <h1 className="text-[32px] md:text-[40px] font-bold mt-10 mb-2 leading-tight tracking-tight">
          Enter the code sent to your {method}
        </h1>
        
        <p className="text-[#8a8a8a] text-[17px] mb-6">
          We sent the code to {contact}.
        </p>

        <button className="flex items-center gap-2 bg-[#1A1A1A] text-white px-4 py-2 rounded-full text-[15px] font-medium hover:bg-[#252525] transition-colors mb-12">
          <HelpCircle size={18} />
          Get help
        </button>

        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex flex-col gap-8">
          
          <div className="border border-white rounded-xl p-4 flex items-center bg-black">
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Code"
              className="bg-transparent outline-none flex-1 text-[17px] placeholder:text-[#8a8a8a]"
              autoFocus
            />
          </div>

          <button
            type="submit"
            className="w-[200px] bg-[#C2C2C2] text-black font-semibold rounded-full py-[14px] text-[17px] hover:bg-white transition-colors">
            Continue
          </button>
        </form>

        <div className="mt-12 pt-8 border-t border-[#1A1A1A]">
          <p className="text-[15px] font-medium">
            Didn't receive a code?{' '}
            <button className="text-white underline hover:text-gray-200">
              Resend code
            </button>
          </p>
        </div>

        <div className="mt-16">
          <button className="text-[13px] text-[#8a8a8a] hover:text-white transition-colors">
            Your Privacy Choices
          </button>
        </div>
      </div>

      <RecaptchaBadge />
    </div>
  );
}
