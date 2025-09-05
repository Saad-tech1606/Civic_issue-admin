// src/App.js

import React, { useState } from 'react';
import LoginPage from './components/LoginPage'; // Assuming your original file is now a component
import SignupPage from './components/SignupPage';

function App() {
  const [isLogin, setIsLogin] = useState(true); // State to toggle between login and signup

  const togglePage = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div>
      {/* Conditionally render the correct page */}
      {isLogin ? (
        <LoginPage onToggle={togglePage} />
      ) : (
        <SignupPage onToggle={togglePage} />
      )}
    </div>
  );
}

export default App;