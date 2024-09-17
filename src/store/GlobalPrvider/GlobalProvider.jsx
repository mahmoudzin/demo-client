import { createContext, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const GlobalContext = createContext(null);

export default function GlobalProvider({ children }) {
  //state
  const [user, setUser] = useState(null);

  //hooks

  const signUp = useCallback(
    (user, navigate) => {
      localStorage.setItem("auth", JSON.stringify(user));
      setUser(user);
      navigate("/");
    },
    [user]
  );

  const logOut = useCallback(
    (navigate) => {
      localStorage.removeItem("auth");
      setUser(null);
      navigate("/");
    },
    [user]
  );
  useEffect(() => {
    const authUser = localStorage.getItem("auth");
    if (authUser) {
      setUser(JSON.parse(authUser));
    }
  }, []);

  const value = {
    user,
    signUp,
    logOut,
  };
  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
}
