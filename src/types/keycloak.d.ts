export interface UserRegistration {
    name: string;
    lastName: string;
    email: string;
    username: string;
    password: string;
}
export interface UserLogin {
    username: string;
    password: string;
}


export interface AdminTokens {
    accessToken: string;
    refreshToken: string;
}
