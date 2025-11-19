
import { createContext, useContext, useState } from "react";

// const API_URL = "http://192.168.10.131:4000/api/v1/accounts/login/";

interface AuthContextType {
  user: null | { email: string; [key: string]: unknown };
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  requestPasswordReset: (email: string) => Promise<{ success: boolean; message?: string }>;
  verifyOtp: (email: string, otp: string) => Promise<{ success: boolean; message?: string }>;
  resetPassword: (newPassword: string) => Promise<{ success: boolean; message?: string }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState(() => {
    // Check for existing tokens in local storage on initialization
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    if (accessToken && refreshToken) {
      // Optionally, you could decode the token to extract user info if available
      // For simplicity, we're setting a placeholder user object
      return { email: 'restored-from-token' };
    }
    return null;
  });

  const login = async (email: string, password: string) => {
    try {
      const res = await fetch("http://172.252.13.96:5000/api/v1/accounts/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      console.log("Login response data:", data);
      console.log(data.access_token);
      console.log(data.refresh);
      localStorage.setItem('accessToken', data.access_token);
      localStorage.setItem('refreshToken', data.refresh_token);
      
      if (!res.ok) throw new Error(data?.message || "Login failed");

      setUser(data?.user || { email }); // Save user or token
      // localStorage.setItem("accessToken", data?.access || ""); // Optional
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    try {
      const res = await fetch("http://172.252.13.96:5000/api/v1/accounts/signup/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();
      console.log("Signup response data:", data);
      
      if (!res.ok) {
        console.error("Signup failed with status:", res.status, "Response:", data);
        let errorMessage = data?.message || "Signup failed";
        if (data?.email && Array.isArray(data.email) && data.email.length > 0) {
          errorMessage = `Email error: ${data.email[0]}`;
        }
        throw new Error(errorMessage);
      }

      // Optionally store tokens if signup returns them
      if (data.access_token) {
        localStorage.setItem('accessToken', data.access_token);
        localStorage.setItem('refreshToken', data.refresh_token);
        setUser(data?.user || { email });
      }
    } catch (error) {
      console.error("Signup error:", error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  };

  const requestPasswordReset = async (email: string) => {
    try {
      const res = await fetch("http://172.252.13.96:5000/api/v1/accounts/pass-reset-request/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      console.log("Password reset request response:", data);
      
      if (!res.ok) {
        throw new Error(data?.message || "Failed to send password reset email");
      }

      return { success: true, message: data?.message || "Password reset email sent successfully" };
    } catch (error) {
      console.error("Password reset request error:", error);
      return { success: false, message: error.message || "Failed to send password reset email" };
    }
  };

  const verifyOtp = async (email: string, otp: string) => {
    try {
      const res = await fetch("http://172.252.13.96:5000/api/v1/accounts/reset-request-activate/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, otp }),
      });

      const data = await res.json();
      console.log("OTP verification response:", data);
      
      if (!res.ok) {
        throw new Error(data?.message || "Failed to verify OTP");
      }

      return { success: true, message: data?.message || "OTP verified successfully" };
    } catch (error) {
      console.error("OTP verification error:", error);
      return { success: false, message: error.message || "Failed to verify OTP" };
    }
  };

  const resetPassword = async (newPassword: string) => {
    try {
      const res = await fetch("http://172.252.13.96:5000/api/v1/accounts/reset-password/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password: newPassword }),
      });

      const data = await res.json();
      console.log("Password reset response:", data);
      
      if (!res.ok) {
        throw new Error(data?.message || "Failed to reset password");
      }

      return { success: true, message: data?.message || "Password reset successfully" };
    } catch (error) {
      console.error("Password reset error:", error);
      return { success: false, message: error.message || "Failed to reset password" };
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, signup, logout, requestPasswordReset, verifyOtp, resetPassword }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
