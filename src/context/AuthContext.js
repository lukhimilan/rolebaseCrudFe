import { createContext, useContext } from "react";
const authContext = createContext({ status: null, setUser: {} });
const AuthStateContext = createContext();
const AuthDispatchContext = createContext();

export function useAuthState() {
  const context = useContext(AuthStateContext);
  if (context === undefined) {
    throw new Error("useAuthState must be used within a AuthProvider");
  }
  return context;
}
export function useAuthDispatch() {
  const context = useContext(AuthDispatchContext);
  if (context === undefined) {
    throw new Error("useAuthDispatch must be used within a AuthProvider");
  }

  return context;
}
