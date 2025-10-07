import { CurrentUserContext } from "./useCurrentUser";
import { useState, useEffect, useMemo, useCallback } from "react";
import {
  postSignin,
  postSignup,
  getMe,
  updateUser as apiUpdateUser,
  setToken,
  getToken,
  clearToken,
} from "../utils/api";

export default function CurrentUserProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUserLoading, setCurrentUserLoading] = useState(true);
  const [currentUserError, setCurrentUserError] = useState(null);
  const [signUpMessage, setSignUpMessage] = useState("");

  useEffect(() => {
    setCurrentUserLoading(true);
    setCurrentUserError(null);

    const token = getToken();
    if (!token) {
      setIsLoggedIn(false);
      setCurrentUser(null);
      setCurrentUserLoading(false);
      return;
    }

    const ctrl = new AbortController();

    (async () => {
      try {
        const me = await getMe({ signal: ctrl.signal });
        setCurrentUser(me);
        setIsLoggedIn(true);
      } catch (e) {
        if (e.name === "AbortError") return;
        clearToken();
        setIsLoggedIn(false);
        setCurrentUser(null);
        setCurrentUserError(e);
      } finally {
        setCurrentUserLoading(false);
      }
    })();

    return () => ctrl.abort();
  }, []);

  const login = useCallback(async (email, password) => {
    setCurrentUserError(null);
    const res = await postSignin(email, password);
    if (res?.token) setToken(res.token);
    const me = await getMe();
    setCurrentUser(me);
    setIsLoggedIn(true);
    return me;
  }, []);

  const handleRegistration = useCallback(
    async (name, avatar, email, password) => {
      setCurrentUserError(null);
      const signUp = await postSignup(name, avatar, email, password);
      setSignUpMessage(
        `User with email ${signUp.email} has successfully signed up. Congratulations`
      );
    },
    []
  );

  const logout = useCallback(() => {
    clearToken();
    setCurrentUser(null);
    setIsLoggedIn(false);
    setCurrentUserError(null);
  }, []);

  const refreshUser = useCallback(async () => {
    const me = await getMe();
    setCurrentUser(me);
    setIsLoggedIn(true);
    return me;
  }, []);

  const updateUser = useCallback(async (name, avatar) => {
    const updated = await apiUpdateUser(name, avatar);
    if (updated && updated._id) {
      setCurrentUser(updated);
      return updated;
    }
    const fresh = await getMe();
    setCurrentUser(fresh);
    return fresh;
  }, []);

  const value = useMemo(
    () => ({
      currentUser,
      isLoggedIn,
      currentUserLoading,
      currentUserError,

      login,
      handleRegistration,
      logout,
      refreshUser,
      updateUser,

      signUpMessage,
      setSignUpMessage,
      setCurrentUser,
    }),
    [
      currentUser,
      isLoggedIn,
      currentUserLoading,
      currentUserError,
      login,
      handleRegistration,
      logout,
      refreshUser,
      updateUser,
      signUpMessage,
    ]
  );

  return (
    <CurrentUserContext.Provider value={value}>
      {children}
    </CurrentUserContext.Provider>
  );
}
