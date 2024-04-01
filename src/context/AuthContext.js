import { createContext } from "react";

export const AuthContext = createContext({ authState: { id: "", email: "", signedIn: false }, setAuthState: () => { } });