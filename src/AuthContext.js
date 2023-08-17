import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [auth, setAuth] = useState({
        userId: null,
        token: null,
        tokenExpiry: null, // 추가: 토큰의 만료 시간
    });

    useEffect(() => {
        const storedUserId = localStorage.getItem('userId');
        const storedToken = localStorage.getItem('token');
        const storedTokenExpiry = localStorage.getItem('tokenExpiry'); // 추가

        if (storedUserId && storedToken && storedTokenExpiry) {
            const expiryTime = new Date(storedTokenExpiry);
            
            if (expiryTime > new Date()) {
                setAuth({
                    userId: storedUserId,
                    token: storedToken,
                    tokenExpiry: storedTokenExpiry,
                });
            } else {
                // 토큰이 만료된 경우 로그아웃 처리
                localStorage.removeItem('userId');
                localStorage.removeItem('token');
                localStorage.removeItem('tokenExpiry');
                setAuth({
                    userId: null,
                    token: null,
                    tokenExpiry: null,
                });
            }
        }
    }, []);

    const setAuthData = (newAuth) => {
        setAuth(newAuth);
        
        if (newAuth && newAuth.userId && newAuth.token && newAuth.tokenExpiry) {
            localStorage.setItem('userId', newAuth.userId);
            localStorage.setItem('token', newAuth.token);
            localStorage.setItem('tokenExpiry', newAuth.tokenExpiry);
        } else {
            localStorage.removeItem('userId');
            localStorage.removeItem('token');
            localStorage.removeItem('tokenExpiry');
        }
    }
   

    const value = {
        auth,
        setAuth: setAuthData,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContext;
