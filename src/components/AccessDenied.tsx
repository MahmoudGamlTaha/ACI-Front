import { Lock, ShieldAlert, Home, Mail } from 'lucide-react';

export default function AccessDenied() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          {/* Icon */}
          <div className="mb-6 flex justify-center">
            <div className="relative">
              <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center">
                <Lock className="w-12 h-12 text-red-600" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                <ShieldAlert className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>

          {/* Heading */}
          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            Access Denied
          </h1>
          
          {/* Description */}
          <p className="text-gray-600 mb-2">
            You don't have permission to access this page.
          </p>
          <p className="text-sm text-gray-500 mb-8">
            Please contact your administrator if you believe this is an error.
          </p>

          {/* Error Code */}
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-8">
            <p className="text-sm font-mono text-red-700">
              Error Code: 403 - Forbidden
            </p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2">
              <Home className="w-5 h-5" />
              Go to Homepage
            </button>
            
            <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2">
              <Mail className="w-5 h-5" />
              Contact Support
            </button>
          </div>
        </div>

        {/* Additional Help Text */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Need help? Check our{' '}
          <a href="#" className="text-blue-600 hover:text-blue-700 underline">
            documentation
          </a>{' '}
          or{' '}
          <a href="#" className="text-blue-600 hover:text-blue-700 underline">
            FAQs
          </a>
        </p>
      </div>
    </div>
  );
}