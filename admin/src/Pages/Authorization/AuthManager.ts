import jwt_decode from "jwt-decode";
import {buildAbsoluteUrl, routes} from "../../Routes/Routes";
import axios from "../../Api/axios";
import { AxiosResponse } from "axios";

interface IUserSession {
    accessToken: string;
    login: string;
    id: number;
}

interface IUserSessionJwtData {
    login: string;
    id: number;
}

interface IResultModel {
    token: string;
    returnUrl?: string;
}

export class AuthManager {
    private readonly localStorageKey = "authUserSession";

    get userSession(): IUserSession {
        const userSessionJson = localStorage.getItem(this.localStorageKey);
        return userSessionJson ? JSON.parse(userSessionJson) : null;
    }

    clearSession() {
        localStorage.removeItem(this.localStorageKey);
    }

    login(data: any, callBack: (token: string | null, succeeded: boolean) => void) {
        axios
            .post<IResultModel>("http://localhost:5000/api/authorize", data)
            .then((res: AxiosResponse<IResultModel>) => {
                const token = res.data.token;
                const decodedToken = jwt_decode<IUserSessionJwtData>(token);

                localStorage.setItem(
                    this.localStorageKey,
                    JSON.stringify({
                        login: decodedToken.login,
                        id: decodedToken.id,
                        accessToken: token
                    })
                );

                callBack(token, true);
            })
            .catch(error => {
                callBack(null, false);
            });
    }

    signIn(token: string) {
        const decodedToken =jwt_decode<IUserSessionJwtData>(token);
    }

    signOut() {
        this.clearSession();

        window.location.href = buildAbsoluteUrl(routes.login);
    }
}

export default new AuthManager();

