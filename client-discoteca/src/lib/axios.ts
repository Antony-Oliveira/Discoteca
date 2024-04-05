import axios, { AxiosInstance } from 'axios';
import { Album, NewAlbumFormData, NewTrackFormData, RegisterFormData, SignInFormData, User } from '../types';
import { toast } from 'react-toastify';
import { redirect } from 'react-router-dom';

const http: AxiosInstance = axios.create({
    baseURL: 'http://localhost:8000',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,

});



http.interceptors.request.use(async function (config) {
    return config;
}, function (error) {
    return Promise.reject(error);
});

export const getAlbums = async (): Promise<Album[]> => {
    try {
        const res = await http.get('/api/albums');
        console.log(res);
        return res.data;
    } catch (error) {
        return [];
    }
}

export const getAlbumInfo = async (id: string): Promise<Album | undefined> => {
    try {

        const res = await http.get(`/api/album/${id}`);
        return res.data;
    } catch (error) {
        redirect('/');
    }
}

export const trackDelete = async (trackId: string, token: string) => {
    try {

        const res = await http.delete(`/api/track/${trackId}/delete`, {headers: {Authorization: `Bearer ${token}`}});
    } catch (error) {
        return;
    }
}


export const trackSave = async (data: NewTrackFormData, token: string) => {
    try {
        console.log(data.image);
        const res = await http.post("/api/track/add", data, { headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${token}` } });

        return res.data.track;
    } catch (error) {
        return console.log('eita', error);
    }
}

export const albumDelete = async (albumId: string, token: string) => {
    try {
        const res = await http.delete(`/api/album/${albumId}/delete`, { headers: { Authorization: `Bearer ${token}` } });

    } catch (error) {
        return;
    }
}

export const albumSave = async (data: NewAlbumFormData, token: string) => {
    try {
        const res = await http.post("/api/album/add", data, { headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${token}` } });

        return res.data.album;
    } catch (error) {
        return;
    }
}

interface ILogin {
    login: (user : User, token : string) => void;
}
export const handleSignUp = async (data: RegisterFormData, {login} : ILogin) => {
    try {
        const res = await http.post<{user : User, token : string}>('/api/register', data);
        login(res.data.user, res.data.token);
        toast.success("Bem vindo!!");
        return 'ok';
    } catch (error: any) {
        console.log(error);

        if (error.response) {
            const status = error.response.status;
            if (status === 422) {
                const validationErrors = error.response.data.errors;
                Object.values(validationErrors).forEach(errorMsg => {
                    toast.error(errorMsg);
                });
            } else if (status === 409) {
                toast.error('Este e-mail já está em uso!');
            } else {
                toast.error('Erro durante a solicitação. Por favor, tente novamente mais tarde.');
            }
        } else {
            toast.error('Erro durante a solicitação. Por favor, tente novamente mais tarde.');
        }
    }
}


export const handleSignIn = async (data: SignInFormData, { login }: ILogin) => {
    try {
        const res = await http.post<{ user: User; token: string }>('/api/login', data);
        login(res.data.user, res.data.token);
        toast.success('Login bem-sucedido!');
        return 'ok';
    } catch (error: any) {
        console.log(error);

        if (error.response) {
            const status = error.response.status;
            if (status === 422) {
                const errors = error.response.data.errors;
                Object.values(errors).forEach(errorMsg => {
                    toast.error(errorMsg);
                });
            } else if (status === 401) {
                toast.error('Credenciais inválidas. Verifique seu e-mail e senha e tente novamente.');
            } else {
                toast.error('Erro durante a solicitação. Por favor, tente novamente mais tarde.');
            }
        } else {
            toast.error('Erro durante a solicitação. Por favor, tente novamente mais tarde.');
        }
    }
};
interface ILogout {
    logout: () => void;
}

export const handleLogout = async (userId : string, {logout} : ILogout, token: string) => {
    logout();
    await http.post(`/api/user/${userId}/logout`, {}, { headers: { Authorization: `Bearer ${token}`}});
    toast.success("Log out efetuado. Até a próxima!")
}


export default http;
