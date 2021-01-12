import axios from 'axios';
import { JWT_TOKEN, AUTH_ENDPOINT  } from '../contantes';

class AuthService {

    login(username, password, onLogin) {
        axios.post(`${AUTH_ENDPOINT}/login`, {
            username: username, password: password
        }).then(response => {
            const jwrToken = response.headers['Authorization'].replace("Bearer ", "");
            sessionStorage.setItem(JWT_TOKEN, jwrToken);
            onLogin(true);
        }).catch(error => {
            console.error(error);
            onLogin(false);
        });
    }

    getJWTToken() {
        return sessionStorage.getItem(JWT_TOKEN);
    }
    isAuthentication() {
        return this.getJWTToken() != null;
    }

}

export default new AuthService();