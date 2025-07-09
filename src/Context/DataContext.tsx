import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';

interface ContentData {
  content: string;
  // Add other fields if necessary based on API response
}

interface DashboardData {
  total_users: number;
  active_users: number;
  total_ai_conversation_count: number;
}

interface UserGrowthData {
  year: number;
  monthly_user_growth: Array<{ month: number; user_count: number }>;
}

interface UserData {
  id: number;
  username: string;
  email: string;
  level: string | null;
  date_joined: string;
  status: string;
}

interface DataContextType {
  privacyPolicy: ContentData | null;
  termsAndConditions: ContentData | null;
  dashboardData: DashboardData | null;
  userGrowthData: UserGrowthData | null;
  userData: UserData[] | null;
  loading: boolean;
  error: string | null;
  fetchPrivacyPolicy: () => Promise<void>;
  updatePrivacyPolicy: (content: string) => Promise<boolean>;
  fetchTermsAndConditions: () => Promise<void>;
  updateTermsAndConditions: (content: string) => Promise<boolean>;
  fetchDashboardData: () => Promise<void>;
  fetchUserGrowthData: () => Promise<void>;
  fetchUserData: () => Promise<void>;
  deleteUser: (id: number) => Promise<boolean>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [privacyPolicy, setPrivacyPolicy] = useState<ContentData | null>(null);
  const [termsAndConditions, setTermsAndConditions] = useState<ContentData | null>(null);
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [userGrowthData, setUserGrowthData] = useState<UserGrowthData | null>(null);
  const [userData, setUserData] = useState<UserData[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const PRIVACY_POLICY_API_URL = 'http://192.168.10.124:2100/api/v1/settings/privacy-policy/';
  const TERMS_AND_CONDITIONS_API_URL = 'http://192.168.10.124:2100/api/v1/settings/terms-and-conditions/';
  const DASHBOARD_API_URL = 'http://192.168.10.124:2100/api/v1/dashboard/first-section/';
  const USER_GROWTH_API_URL = 'http://192.168.10.124:2100/api/v1/dashboard/user-growth/';
  const USER_DATA_API_URL = 'http://192.168.10.124:2100/api/v1/dashboard/users/';

  const fetchPrivacyPolicy = async () => {
  setLoading(true);
  setError(null);
  try {
    const token = localStorage.getItem("accessToken"); // 👈 get token
    const response = await axios.get(PRIVACY_POLICY_API_URL, {
      headers: {
        Authorization: `Bearer ${token}`, // 👈 add token to header
      },
    });
    setPrivacyPolicy(response.data);
  } catch (err) {
    setError("Failed to fetch privacy policy. Please try again.");
    console.error(err);
  } finally {
    setLoading(false);
  }
};

  const fetchTermsAndConditions = async () => {
  setLoading(true);
  setError(null);
  try {
    const token = localStorage.getItem("accessToken"); // 👈 get token
    const response = await axios.get(TERMS_AND_CONDITIONS_API_URL, {
      headers: {
        Authorization: `Bearer ${token}`, // 👈 add token to header
      },
    });
    setTermsAndConditions(response.data);
  } catch (err) {
    setError("Failed to fetch terms and conditions. Please try again.");
    console.error(err);
  } finally {
    setLoading(false);
  }
};


  const updatePrivacyPolicy = async (content: string) => {
  setLoading(true);
  setError(null);
  try {
    const token = localStorage.getItem("accessToken"); // 👈 get token
    const response = await axios.put(
      PRIVACY_POLICY_API_URL,
      { content },
      {
        headers: {
          Authorization: `Bearer ${token}`, // 👈 add token to header
        },
      }
    );
    setPrivacyPolicy(response.data);
    return true;
  } catch (err) {
    setError("Failed to update privacy policy. Please try again.");
    console.error(err);
    return false;
  } finally {
    setLoading(false);
  }
};

  const updateTermsAndConditions = async (content: string) => {
  setLoading(true);
  setError(null);
  try {
    const token = localStorage.getItem("accessToken"); // 👈 get token
    const response = await axios.put(
      TERMS_AND_CONDITIONS_API_URL,
      { content },
      {
        headers: {
          Authorization: `Bearer ${token}`, // 👈 add token to header
        },
      }
    );
    setTermsAndConditions(response.data);
    return true;
  } catch (err) {
    setError("Failed to update terms and conditions. Please try again.");
    console.error(err);
    return false;
  } finally {
    setLoading(false);
  }
};


  const fetchDashboardData = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.get(DASHBOARD_API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setDashboardData(response.data);
      console.log(response.data)
    } catch (err) {
      setError("Failed to fetch dashboard data. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserGrowthData = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.get(USER_GROWTH_API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUserGrowthData(response.data);
      console.log(response.data);
    } catch (err) {
      setError("Failed to fetch user growth data. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserData = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.get(USER_DATA_API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUserData(response.data);
      console.log(response.data);
    } catch (err) {
      setError("Failed to fetch user data. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("accessToken");
      await axios.delete(USER_DATA_API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          user_id: id
        }
      });
      // Remove the deleted user from the state
      setUserData((prev) => prev ? prev.filter(user => user.id !== id) : null);
      return true;
    } catch (err) {
      setError("Failed to delete user. Please try again.");
      console.error(err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrivacyPolicy();
    fetchTermsAndConditions();
  }, []);

  return (
    <DataContext.Provider value={{ privacyPolicy, termsAndConditions, dashboardData, userGrowthData, userData, loading, error, fetchPrivacyPolicy, updatePrivacyPolicy, fetchTermsAndConditions, updateTermsAndConditions, fetchDashboardData, fetchUserGrowthData, fetchUserData, deleteUser }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
