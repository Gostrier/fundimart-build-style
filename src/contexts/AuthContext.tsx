import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { User, Seller } from "@/types/product";
import { toast } from "sonner";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  sendOTP: (email: string) => Promise<void>;
  verifyOTP: (email: string, otp: string) => Promise<boolean>;
  registerBuyer: (firstName: string, lastName: string, email: string, phone: string, password: string) => Promise<void>;
  registerSeller: (firstName: string, lastName: string, email: string, phone: string, password: string, hardwareName: string, location: string, firmEmail: string) => Promise<void>;
  logout: () => void;
  isSeller: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [otps, setOtps] = useState<Record<string, string>>({});

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("fundimart_user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Failed to parse stored user:", error);
        localStorage.removeItem("fundimart_user");
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const users = JSON.parse(localStorage.getItem("fundimart_users") || "[]");
      const foundUser = users.find((u: User) => u.email === email);

      if (!foundUser) {
        throw new Error("User not found");
      }

      // In a real app, password verification happens here
      setUser(foundUser);
      localStorage.setItem("fundimart_user", JSON.stringify(foundUser));
    } finally {
      setIsLoading(false);
    }
  };

  const sendOTP = async (email: string) => {
    setIsLoading(true);
    try {
      // Generate a random 6-digit OTP
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      
      // Store it temporarily
      setOtps(prev => ({ ...prev, [email]: otp }));
      
      // Mock sending email
      console.log(`[AUTH] OTP for ${email}: ${otp}`);
      toast.info(`OTP sent to ${email} (Check console for demo)`);
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 800));
    } finally {
      setIsLoading(false);
    }
  };

  const verifyOTP = async (email: string, otp: string) => {
    return otps[email] === otp;
  };

  const registerBuyer = async (firstName: string, lastName: string, email: string, phone: string, password: string) => {
    setIsLoading(true);
    try {
      const users = JSON.parse(localStorage.getItem("fundimart_users") || "[]");
      
      if (users.some((u: User) => u.email === email)) {
        throw new Error("Email already registered");
      }

      const newUser: User = {
        id: Date.now().toString(),
        email,
        firstName,
        lastName,
        phone,
        role: "buyer",
        createdAt: Date.now(),
      };

      users.push(newUser);
      localStorage.setItem("fundimart_users", JSON.stringify(users));
      localStorage.setItem("fundimart_user", JSON.stringify(newUser));
      setUser(newUser);
    } finally {
      setIsLoading(false);
    }
  };

  const registerSeller = async (
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    password: string,
    hardwareName: string,
    location: string,
    firmEmail: string
  ) => {
    setIsLoading(true);
    try {
      const users = JSON.parse(localStorage.getItem("fundimart_users") || "[]");
      
      if (users.some((u: User) => u.email === email)) {
        throw new Error("Email already registered");
      }

      const sellerId = `seller_${Date.now()}`;
      const seller: Seller = {
        id: sellerId,
        userId: Date.now().toString(),
        hardwareName,
        location,
        firmEmail,
        createdAt: Date.now(),
      };

      const newUser: User = {
        id: seller.userId,
        email,
        firstName,
        lastName,
        phone,
        role: "seller",
        seller,
        createdAt: Date.now(),
      };

      users.push(newUser);
      localStorage.setItem("fundimart_users", JSON.stringify(users));
      localStorage.setItem("fundimart_user", JSON.stringify(newUser));
      setUser(newUser);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("fundimart_user");
  };

  const isSeller = () => {
    return user?.role === "seller";
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, sendOTP, verifyOTP, registerBuyer, registerSeller, logout, isSeller }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
