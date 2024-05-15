import React, { createContext, useState } from 'react'

const AuthContext = createContext()

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => window.sessionStorage.getItem("token"))
  const [user, setUser] = useState(() =>
    JSON.parse(window.sessionStorage.getItem("userData"))
  )

  return (
    <AuthContext.Provider value={{token, setToken, user, setUser}}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider }
