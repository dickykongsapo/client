import Axios from "axios-observable";
import axios from "axios";
export const authHeader = () => {
    const jwtToken = localStorage.getItem('jwt_token');

    if (jwtToken) {
        return {
            headers: {
                "X-Authorization": `Bearer ${jwtToken}`,
                "content-type": "application/json"
            }
        }
    } else {
        return {};
    }
}