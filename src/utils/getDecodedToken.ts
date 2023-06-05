import jwtDecode from "jwt-decode";
type JwtData = {
    name: string;
    email: string;
    id: string;
};
function getDecodedToken() {
    if (document.cookie) {
        const token = document.cookie.split("jwt_token=")[1];
        const decoded = jwtDecode(token);
        return decoded as JwtData;
    }
}
export default getDecodedToken;
