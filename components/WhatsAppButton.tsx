'use client';

import Link from 'next/link';

export default function WhatsAppButton() {
  // Format: Remove spaces and add country code 91 for India
  // 95577 06427 becomes 919557706427
  const phoneNumber = '919557706427';
  const message = 'Hello, I would like to inquire about Children\'s Future Academy.';
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <Link
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 group"
      aria-label="Chat on WhatsApp"
    >
      <div className="bg-green-500 hover:bg-green-600 text-white rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110 flex items-center gap-3 pr-0 group-hover:pr-4 overflow-hidden">
        {/* WhatsApp Icon */}
        <div className="w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center flex-shrink-0">
          <svg
            viewBox="0 0 32 32"
            className="w-8 h-8 sm:w-10 sm:h-10 fill-current"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M16 0c-8.837 0-16 7.163-16 16 0 2.825 0.737 5.607 2.137 8.048l-2.137 7.952 7.933-2.127c2.42 1.37 5.173 2.127 8.067 2.127 8.837 0 16-7.163 16-16s-7.163-16-16-16zM16 29.467c-2.482 0-4.908-0.646-7.07-1.87l-0.507-0.292-5.247 1.408 1.417-5.267-0.321-0.519c-1.331-2.165-2.039-4.67-2.039-7.26 0-7.485 6.092-13.577 13.577-13.577s13.577 6.092 13.577 13.577c0 7.485-6.092 13.577-13.577 13.577zM21.52 18.517c-0.294-0.147-1.731-0.854-2-0.951s-0.463-0.147-0.658 0.147c-0.195 0.294-0.756 0.951-0.927 1.146s-0.341 0.221-0.634 0.074c-0.294-0.147-1.239-0.456-2.359-1.456-0.872-0.777-1.461-1.738-1.632-2.032s-0.018-0.453 0.129-0.6c0.132-0.132 0.294-0.342 0.441-0.513s0.195-0.294 0.293-0.489c0.098-0.195 0.049-0.366-0.025-0.513s-0.658-1.586-0.902-2.173c-0.238-0.571-0.479-0.494-0.658-0.503-0.17-0.008-0.364-0.010-0.559-0.010s-0.512 0.073-0.78 0.366c-0.268 0.294-1.024 1.001-1.024 2.442s1.048 2.833 1.194 3.028c0.147 0.195 2.066 3.155 5.007 4.427 0.699 0.303 1.244 0.484 1.669 0.619 0.701 0.223 1.338 0.191 1.843 0.116 0.562-0.084 1.731-0.708 1.975-1.391s0.244-1.269 0.171-1.391c-0.073-0.122-0.268-0.195-0.562-0.342z" />
          </svg>
        </div>
        
        {/* Text that appears on hover */}
        <span className="max-w-0 group-hover:max-w-xs transition-all duration-300 whitespace-nowrap overflow-hidden text-sm sm:text-base font-semibold">
          Chat with us
        </span>
      </div>
      
      {/* Phone number badge */}
      <div className="absolute -top-2 -left-2 bg-white text-green-600 text-xs sm:text-sm font-bold px-2 sm:px-3 py-1 rounded-full shadow-lg border-2 border-green-500 whitespace-nowrap">
        95577 06427
      </div>
    </Link>
  );
}
