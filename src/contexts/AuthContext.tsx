import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const savedUser = localStorage.getItem('auth_user');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });

  const login = (userData: User, token?: string) => {
    try {
      localStorage.setItem('auth_user', JSON.stringify(userData));
      if (token) {
        localStorage.setItem('auth_token', token);
      }
    } catch (e) {
      console.error('Failed to save auth data:', e);
    }
    setUser(userData);
  };

  const logout = () => {
    try {
      localStorage.removeItem('auth_user');
      localStorage.removeItem('auth_token');
    } catch (e) {
      console.error('Failed to clear auth data:', e);
    }
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
