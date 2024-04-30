'use client'
import React, { useState, useEffect, useContext, createContext } from "react"
import { useRouter } from "next/navigation";
const authContext = createContext();

export function ProvideAuth({ children }) {
    const auth = useProvideAuth();
    return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
    return useContext(authContext);
};

function useProvideAuth() {
    const [autenticado, setAutenticado] = useState(false)
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [mensaje, setMensaje] = useState(null)
    const router = useRouter()
    
    const login = async (data) => {
        try{
            const body = JSON.stringify(data)

            const res = await fetch("api/auth",{method:'POST', body:body})
            const d = await res.json()
            // return console.log(d)
            if( d.status === 'success'){
                    setAutenticado(true)
                    setUser(d.payload)                    
                
            }
            return {
                status: d.status,
                message: d.message,
                err: d.err
            }
        }catch(err){
            return {
                status: 'error',
                message: "Imposible conectar, revise su conexión a Internet.",
                err
            }
        }
    }

    // const verificarToken = (token) => {
    //     let decoded = null
    //     try{
    //         decoded = jwtVerify(token, process.env.SECRET_KEY)
    //         if (decoded !== null){
    //             setAutenticado(true)
    //             setMensaje("Token valido")
    //             setUser({
    //                 nombre: decoded.nombre,
    //                 apellido: decoded.apellido,
    //                 email: decoded.email,
    //                 level: decoded.level,
    //                 database: decoded.database,
    //                 ubicacion: decoded.ubicacion,
    //                 licenceEnds: decoded.paidPeriodEnds,
    //             })
    //         }else{
    //             setAutenticado(false)
    //             setUser(null)
    //             setMensaje("token invalido.")
    //         }
    //         return
    //     }catch(err){
    //         return null
    //     }
    // }

    // useEffect(() => {
    //     if(token){
    //         setMensaje("Verificando la sesión.")
    //         let decoded = verificaToken(token)
    //         console.log(decoded)
            
    //     }

    //     return ()  => {
    //         setAutenticado(false)
    //         setUser(null)
    //     }
    // },[token])
    
    const signup = (email, password) => {
        return false
    }
    
    const logout = (cb) => {
        localStorage.removeItem('usertoken')
        setAutenticado(false)
        setToken(null)
        setUser(null)
        return cb()
    };
    const sendPasswordResetEmail = (email) => {
        return false
    };
    const confirmPasswordReset = (code, password) => {
        return false
    };
    // Subscribe to user on mount
    // Because this sets state in the callback it will cause any ...
    // ... component that utilizes this hook to re-render with the ...
    // ... latest auth object.
    

    return {
        user, setUser,
        token,
        autenticado, setAutenticado,
        mensaje,
        login,
        signup,
        logout,
        sendPasswordResetEmail,
        confirmPasswordReset,
    };
}