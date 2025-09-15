import React, { createContext, useContext, useState, useEffect } from 'react';
// ✅ CORRECTED IMPORT - Import individual functions, not authAPI
import { adminLogin, userLogin, adminSignup, userSignup } from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      setUser(JSON.parse(userData));
    }
    setLoading(false);
  }, []);

  const login = async (username, password, isAdmin = false) => {
    try {
      // ✅ Use the directly imported functions
      const response = isAdmin 
        ? await adminLogin({ username, password })
        : await userLogin({ username, password });
      
      const { token } = response.data;
      const userData = { username, role: isAdmin ? 'admin' : 'user', isAdmin };
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      
      return { success: true };
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Login failed' };
    }
  };

  const signup = async (username, password, isAdmin = false) => {
    try {
      // ✅ Use the directly imported functions
      const response = isAdmin 
        ? await adminSignup({ username, password })
        : await userSignup({ username, password });
      
      const { token } = response.data;
      const userData = { username, role: isAdmin ? 'admin' : 'user', isAdmin };
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      
      return { success: true };
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Signup failed' };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  const value = {
    user,
    login,
    signup,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};