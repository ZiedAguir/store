import { useState, useEffect, useCallback } from "react";
import apiRequest from "../../axios/axiosInstance";
import * as jwt_decode from "jwt-decode";

const isTokenExpired = (token) => {
  try {
    const decodedToken = jwt_decode.jwtDecode(token);
    return Date.now() > decodedToken.exp * 1000;
  } catch (err) {
    console.error("Failed to decode token:", err);
    return true;
  }
};

export const useCurrentUser = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [lastFetched, setLastFetched] = useState(null); 

  // Debug logging
  useEffect(() => {
    console.log("useCurrentUser - currentUser:", currentUser);
    console.log("useCurrentUser - isLoading:", isLoading);
    console.log("useCurrentUser - errorMessage:", errorMessage);
  }, [currentUser, isLoading, errorMessage]);

  // Charger l'utilisateur au démarrage si un token existe
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && !currentUser && !isLoading) {
      console.log("useCurrentUser - Auto-fetching user on startup");
      fetchUser();
    }
  }, [fetchUser, currentUser, isLoading]);

  const handleError = (error, redirectOnUnauthorized = false) => {
    const errorMessage = error.response?.data?.message || "An error occurred";
    console.error("useCurrentUser - handleError:", errorMessage);
    setErrorMessage(errorMessage);

    if (redirectOnUnauthorized && error.response?.status === 401) {
      logout();
    }
  };

  const fetchUser = useCallback(async () => {
    const now = Date.now();
    const oneHour = 60 * 60 * 1000;

    if ( currentUser && lastFetched && now - lastFetched < oneHour) {
      console.log("useCurrentUser - fetchUser: Using cached user data");
      return currentUser;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      console.log("useCurrentUser - fetchUser: No token found");
      setErrorMessage("No token found");
      return null;
    }

    console.log("useCurrentUser - fetchUser: Fetching user data");
    setIsLoading(true);
    try {
      const res = await apiRequest.get("/users/getMe");
      console.log("useCurrentUser - fetchUser: Success", res.data);
      setCurrentUser(res.data);
      setLastFetched(now);
      return res.data;
    } catch (err) {
      console.error("useCurrentUser - fetchUser: Error", err);
      handleError(err, true);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [currentUser, lastFetched]);

  const refreshToken = useCallback(async () => {
    console.log("useCurrentUser - refreshToken: Starting token refresh");
    try {
      const res = await apiRequest.post("/auth/refresh-token");
      const { accessToken } = res.data;
      localStorage.setItem("token", accessToken);
      console.log("useCurrentUser - refreshToken: Token refreshed successfully");

      // Seulement actualiser les données utilisateur si le cache est expiré
      if (!currentUser || isTokenExpired(accessToken)) {
        await fetchUser(true);
      }
    } catch (err) {
      console.error("useCurrentUser - refreshToken: Error", err);
      handleError(err, true);
    }
  }, [currentUser, fetchUser]);

  const logout = async () => {
    console.log("useCurrentUser - logout: Starting logout");
    try {
      await apiRequest.post("/auth/logout");
    } catch (err) {
      // Log error but still clear client state to ensure logout UX
      console.error("Logout API failed:", err);
    } finally {
      localStorage.removeItem("token");
      // Clear any persisted form data for security when logging out
      try {
        localStorage.removeItem("formData");
        localStorage.removeItem("step1Data");
        localStorage.removeItem("step2Data");
        localStorage.removeItem("step3Data");
        localStorage.removeItem("step4Data");
        localStorage.removeItem("lastUserId");
      } catch {}
      setCurrentUser(null);
      setLastFetched(null);
      console.log("useCurrentUser - logout: Logout completed");
    }
  };

  useEffect(() => {
    const handleTokenAndUser = async () => {
      const token = localStorage.getItem("token");
      console.log("useCurrentUser - useEffect: Token check", !!token);

      // If there is no token, do not attempt to refresh; treat as logged out
      if (!token) {
        console.log("useCurrentUser - useEffect: No token, staying logged out");
        return;
      }

      if (isTokenExpired(token)) {
        console.log("useCurrentUser - useEffect: Token expired, refreshing");
        try {
          await refreshToken();
        } catch {
          console.error("Failed to refresh token on mount");
        }
      } else if (!currentUser) {
        console.log("useCurrentUser - useEffect: No current user, fetching");
        await fetchUser(); 
      }
    };

    handleTokenAndUser();

    const interval = setInterval(() => {
      const token = localStorage.getItem("token");
      if (token && !isTokenExpired(token)) {
        refreshToken();
      }
    }, 3 * 60 * 60 * 1000); 

    return () => clearInterval(interval);
  }, [fetchUser, refreshToken, currentUser]);

  return { currentUser, errorMessage,setCurrentUser, isLoading, fetchUser, logout, refreshToken };
};

