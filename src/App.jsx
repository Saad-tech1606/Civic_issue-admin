import React, { useState } from 'react';
import LoginPage from './components/LoginPage';
import CivicAdminApp from './components/CivicAdminApp';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div>
      {isLoggedIn ? (
        <CivicAdminApp onLogout={() => setIsLoggedIn(false)} />
      ) : (
        <LoginPage onLogin={() => setIsLoggedIn(true)} />
      )}
    </div>
  );
}

export default App;
