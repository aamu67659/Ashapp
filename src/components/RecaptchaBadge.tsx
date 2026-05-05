import React from 'react';
import { RefreshCcw } from 'lucide-react';
export function RecaptchaBadge() {
  return (
    <div className="fixed bottom-4 right-4 bg-white rounded-md shadow-lg border border-gray-200 p-3 flex flex-col items-center w-[72px] z-50">
      <RefreshCcw className="text-[#4285F4] w-8 h-8 mb-2" strokeWidth={2.5} />
      <span className="text-[#555555] text-[10px] font-medium mb-1">
        reCAPTCHA
      </span>
      <div className="flex gap-1 text-[8px] text-[#555555]">
        <a href="#" className="hover:underline">
          Privacy
        </a>
        <span>-</span>
        <a href="#" className="hover:underline">
          Terms
        </a>
      </div>
    </div>);

}