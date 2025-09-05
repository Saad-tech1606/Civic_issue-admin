import authImage from '../assets/login&signup.png';
import React, { useState } from 'react';

// SVG Icon Components for better readability
const MailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400">
    <rect width="20" height="16" x="2" y="4" rx="2"></rect>
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
  </svg>
);

const LockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400">
    <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
  </svg>
);

function LoginPage({ onToggle }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      const form = e.target;
      const submitButton = form.querySelector('button[type="submit"]');
      if (submitButton) {
          submitButton.classList.add('animate-shake');
          setTimeout(() => {
              submitButton.classList.remove('animate-shake');
          }, 500);
      }
      return;
    }
    console.log('Logging in with:', { email, password });
    alert(`Welcome!\nEmail: ${email}`);
  };

  return (
    <div 
      className="relative flex items-center justify-center min-h-screen p-4 font-sans text-gray-100 group overflow-hidden" // Added overflow-hidden
      style={{
        backgroundImage: `url(${authImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        transition: 'transform 0.5s ease-out', // For background zoom
        transform: 'scale(1)',
      }}
      onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.03)'} // Slight zoom on hover
      onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'} // Reset zoom
    >
      {/* Overlay for dullness and hover effect */}
      {/* Changed initial opacity from 50 to 60 for slightly more contrast with form, feel free to adjust */}
      <div 
        className="absolute inset-0 bg-gray-900 opacity-60 group-hover:opacity-30 transition-opacity duration-700" // Increased duration
        style={{ animation: 'fadeIn 1s ease-out forwards' }} // Initial fade-in for overlay
      ></div>

      <div 
        className="relative z-10 w-full max-w-sm sm:max-w-md bg-gray-800/95 rounded-2xl shadow-2xl p-8 sm:p-12 transition-all duration-300 transform animate-fadeInScaleUp" // Added animate-fadeInScaleUp
      >
        <div>
          <h2 className="text-3xl font-bold text-white text-center mb-2">Welcome Back</h2>
          <p className="text-center text-gray-400 mb-8">Sign in to continue</p>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Input */}
            <div className="relative">
              <MailIcon />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-700/70 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300 focus:border-indigo-500 hover:border-indigo-500" // Added focus:border and hover:border
                required
              />
            </div>

            {/* Password Input */}
            <div className="relative">
              <LockIcon />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-700/70 border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300 focus:border-indigo-500 hover:border-indigo-500" // Added focus:border and hover:border
                required
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input type="checkbox" className="form-checkbox h-4 w-4 bg-gray-700 border-gray-600 rounded text-indigo-500 focus:ring-indigo-500" />
                <span className="text-sm text-gray-400">Remember me</span>
              </label>
              <a href="#" className="text-sm text-indigo-400 hover:underline hover:text-indigo-300 transition-colors duration-200">Forgot Password?</a> {/* Added hover:text and transition */}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white font-bold py-3 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg hover:shadow-indigo-600/40 active:animate-buttonPress" // Added active:animate-buttonPress
            >
              Login
            </button>
          </form>

          <p className="text-center text-gray-500 text-sm mt-8">
            Don't have an account? <a onClick={onToggle} className="text-indigo-400 hover:underline font-semibold cursor-pointer hover:text-indigo-300 transition-colors duration-200">Sign up</a> {/* Added hover:text and transition */}
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;