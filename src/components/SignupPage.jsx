import authImage from '../assets/login&signup.png';
import React, { useState } from 'react';

// SVG Icon Components
const MailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
    viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400">
    <rect width="20" height="16" x="2" y="4" rx="2"></rect>
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
  </svg>
);

const LockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
    viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400">
    <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
  </svg>
);

const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
    viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400">
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);

function SignupPage({ onToggle }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || !email || !password || !confirmPassword) {
      const form = e.target;
      const submitButton = form.querySelector('button[type="submit"]');
      if (submitButton) {
        submitButton.classList.add('animate-shake');
        setTimeout(() => {
          submitButton.classList.remove('animate-shake');
        }, 500);
      }
      alert("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    console.log('Signing up with:', { username, email, password });
    alert(`Account created for:\nUsername: ${username}\nEmail: ${email}`);
  };

  return (
    <div 
      className="relative flex items-center justify-center min-h-screen p-4 font-sans text-gray-100 group overflow-hidden"
      style={{
        backgroundImage: `url(${authImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        transition: 'transform 0.5s ease-out',
        transform: 'scale(1)',
      }}
      onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.03)'}
      onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
    >
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-gray-900 opacity-60 group-hover:opacity-30 transition-opacity duration-700"
        style={{ animation: 'fadeIn 1s ease-out forwards' }}
      ></div>

      <div 
        className="relative z-10 w-full max-w-sm sm:max-w-md bg-gray-800/95 rounded-2xl shadow-2xl p-8 sm:p-12 transition-all duration-300 transform animate-fadeInScaleUp"
      >
        <div>
          <h2 className="text-3xl font-bold text-white text-center mb-2">Create an Account</h2>
          <p className="text-center text-gray-400 mb-8">Sign up to get started</p>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username Input */}
            <div className="relative">
              <UserIcon />
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-700/70 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300 focus:border-indigo-500 hover:border-indigo-500"
                required
              />
            </div>

            {/* Email Input */}
            <div className="relative">
              <MailIcon />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-700/70 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300 focus:border-indigo-500 hover:border-indigo-500"
                required
              />
            </div>

            {/* Password Input */}
            <div className="relative">
              <LockIcon />
              <input
                type="password"
                placeholder="Password (min 6, alphanumeric)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                pattern="[A-Za-z0-9]+"
                minLength={6}
                title="Password must be at least 6 characters and contain only letters and numbers"
                className="w-full pl-10 pr-4 py-3 bg-gray-700/70 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300 focus:border-indigo-500 hover:border-indigo-500"
                required
              />
            </div>

            {/* Confirm Password Input */}
            <div className="relative">
              <LockIcon />
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                pattern="[A-Za-z0-9]+"
                minLength={6}
                title="Password must be at least 6 characters and contain only letters and numbers"
                className="w-full pl-10 pr-4 py-3 bg-gray-700/70 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300 focus:border-indigo-500 hover:border-indigo-500"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white font-bold py-3 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg hover:shadow-indigo-600/40 active:animate-buttonPress"
            >
              Sign Up
            </button>
          </form>

          <p className="text-center text-gray-500 text-sm mt-8">
            Already have an account? <a onClick={onToggle} className="text-indigo-400 hover:underline font-semibold cursor-pointer hover:text-indigo-300 transition-colors duration-200">Login</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
