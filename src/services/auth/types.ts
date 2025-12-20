export interface AuthResponse {
    email: string;
    token: string;
    expireIn: string; // ISO date string
    userType: "admin" | "user"; // extend if you have more roles
}