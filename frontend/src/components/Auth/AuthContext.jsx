import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({children}){

    const [authorization, setAuthorization] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        // Função que verifica a autenticidade do usuário
        async function verify() {
            try {
                
                // Faz a requisição com o cookie
                const res = await fetch("http://localhost:8000/api/user", {
                    method: "GET",
                    credentials: "include"
                });
        
                // Em caso de erro, ele não tem acesso
                if(!res.ok){
                    setAuthorization(false);
                    return;
                }
                
                // Se der tudo certo, ele tem acesso
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