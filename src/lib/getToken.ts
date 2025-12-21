import { jwtDecode } from "jwt-decode";

export const getToken = () => {
    return localStorage.getItem("token");
};

export const getTokenDecoded = (): any => {
    const token = getToken();
    if (!token) return null;
    const decodedToken = jwtDecode(token);
    return decodedToken;
}