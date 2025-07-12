'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { User } from '@/app/types/index';
import * as UserService from '@/service/UserService'; 
import { useRouter } from 'next/navigation';

interface AuthContextType {
  user: User | null;
  login: (credentials: { email: string; password: string }) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  

  // login method now takes credentials and calls your login service
const login = async (credentials: { email: string; password: string }): Promise<boolean> => {
  try {
    const res = await UserService.login(credentials);
    if (res?.token && res?.user) {
      localStorage.setItem('token', res.token);
      localStorage.setItem('user', JSON.stringify(res.user));
      setUser(res.user);

      // ✅ Store the first assigned project_id
      const firstProject = res.user.projects?.[0];
      if (firstProject?.project_id) {
        localStorage.setItem('projectId', String(firstProject.project_id));
      } else {
        localStorage.removeItem('projectId'); // fallback
      }

      return true;
    }
    return false;
  } catch {
    return false;
  }
};



  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
   router.push(`/`);

    
  };

  // On mount, restore user from localStorage if available
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userString = localStorage.getItem('user');
    if (token && userString) {
      setUser(JSON.parse(userString));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
