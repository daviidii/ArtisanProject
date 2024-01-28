import axios from "axios";
import { createContext, useState, useEffect, useCallback } from "react";
import { useContext } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [userAddres, setUserAddress] = useState([]);
  const [trigger, setTrigger] = useState(false);
  const [fetchUserTrigger, setFetchUserTrigger] = useState(false);
  const userId = user && user.user_id;
  useEffect(() => {
    const fetchAllAddress = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/address/${userId}`);
        setUserAddress(res.data);
        console.log("UseEffect on fetchAlladdress");
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllAddress();
  }, [trigger, userId, user]);

  const login = useCallback(() => {
    setIsLoggedIn(true);
  }, []);

  const setUserCb = useCallback((data) => {
    setUser(data);
  }, []);

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        login,
        logout,
        user,
        setUser,
        userAddres,
        setUserAddress,
        setTrigger,
        setUserCb,
        fetchUserTrigger,
        setFetchUserTrigger,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
