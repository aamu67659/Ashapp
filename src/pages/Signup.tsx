import React from 'react';
import { Link } from 'react-router-dom';
import { CashAppLogo } from '../components/CashAppLogo';
export function Signup() {
  return (
    <div className="min-h-screen bg-black text-white font-sans flex flex-col items-center justify-center p-6 md:p-12">
      <div className="max-w-[480px] w-full mx-auto">
        <CashAppLogo />

        <h1 className="text-4xl font-bold mt-10 mb-6 tracking-tight">
          Create account
        </h1>

        <p className="text-[#8a8a8a] mb-8">
          This is a stub page for the signup flow.
        </p>

        <Link
          to="/login"
          className="inline-block bg-[#E8E8E8] text-black font-semibold rounded-full py-4 px-8 text-center hover:bg-white transition-colors">
          
          Back to Log in
        </Link>
      </div>
    </div>);

}