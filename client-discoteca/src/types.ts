
export interface Album {
    id: string;
    cover_url: string;
    background_url: string;
    description: string;
    name: string;
    created_at: string;
    updated_at: string;
    tracks: Track[]
}

export interface Track {
    id: string;
    cover_url: string;
    name: string;
    duration: string;
    album_id: string;
    created_at: string;
    updated_at: string;
}

export interface User {
    id: string;
    name: string;
    email: string;
    email_verified_at: string | null;
    password: string;
    remember_token: string;
    created_at: string;
    updated_at: string;
}

export interface NewTrackFormData {
    name: string;
    duration: string;
    albumId: string;
    image: File;
}

export interface NewAlbumFormData {
    name: string;
    albumCover: File;
    albumBackground: File;
    description: string;
}

export interface RegisterFormData {
    name: string;
    email: string;
    password: string;

}


export interface SignInFormData {
    email: string;
    password: string;
}

export interface LogoutProps {
    userId: string;
    logout: () => void;
}
