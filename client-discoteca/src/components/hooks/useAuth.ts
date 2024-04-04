import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { User } from '../../types';

export const useAuth = () => {
    const [token, setToken] = useState<string | null>();
    const [user, setUser] = useState<User | null>();

    useEffect(() => {
        const userCookie = Cookies.get('user');
        const tokenCookie = Cookies.get('sth_');

        if (userCookie && tokenCookie) {
            setUser(JSON.parse(userCookie));
            setToken(tokenCookie);
        }
    }, []);

    const login = (userData : User, authToken : string) => {
        setUser(userData);
        setToken(authToken);
        Cookies.set('user', JSON.stringify(userData))
        Cookies.set('sth_', authToken);
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        Cookies.remove('user');
        Cookies.remove('sth_');
    };

    return {
        token,
        user,
        login,
        logout
    };
};
