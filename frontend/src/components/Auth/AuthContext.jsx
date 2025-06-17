import { createContext, useContext, useEffect, useState } from "react";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const AuthContext = createContext(null);

export function AuthProvider({children}){
    const [authorization, setAuthorization] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function verify() {
            try {
                const res = await fetch(`${BACKEND_URL}/api/user`, {
                    method: "GET",
                    credentials: "include"
                });
        
                if(!res.ok){
                    setAuthorization(false);
                    return;
                }
            
                setAuthorization(true);
            } catch (error) {
                console.log(error);
                setAuthorization(false);
            } finally {
                setLoading(false);
            }
        }
        verify();
    }, [])

    return  <AuthContext.Provider value={{authorization, setAuthorization, loading}}>
                {children}
            </AuthContext.Provider>
}

export function useAuth(){
    return useContext(AuthContext)
}