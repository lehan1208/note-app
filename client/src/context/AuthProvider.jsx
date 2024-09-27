/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";

export const AuthContext = createContext({
  user: {},
  setUser: () => {},
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const auth = getAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onIdTokenChanged((user) => {
      console.log("🚀 user:", user);
      if (user?.uid) {
        setUser(user);
        if (user.accessToken !== localStorage.getItem("accessToken")) {
          localStorage.setItem("accessToken", user.accessToken);
          window.location.reload();
        }
        setIsLoading(false);
        return;
      }

      //reset user info
      setIsLoading(false);
      setUser({});
      localStorage.clear();
      navigate("/login");
    });

    return () => {
      unsubscribe();
    };
  }, [auth]);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {isLoading ? <CircularProgress /> : children}
    </AuthContext.Provider>
  );
};

export function useAuth () {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context
}