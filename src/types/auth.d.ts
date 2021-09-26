export interface AuthResponse {
    status: number;
    accessToken?: string;
    refreshToken?: string;
    message?: string;
}
