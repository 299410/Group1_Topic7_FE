

export interface LoginRequest {
    email?: string;
    username?: string;
    password?: string;
}

export interface LoginResponse {
    token: string;
    refreshToken: string;
    type: string;
    id: number;
    username: string;
    email: string;
    roles: string[];
}

export interface LogoutRequest {
    refreshToken: string;
}
