import React, {useEffect, useState} from "react";
import AuthManager from './AuthManager';
import axios from '../../Api/axios';
import {buildAbsoluteUrl, routes} from "../../Routes/Routes";

const Authorize: React.FC = props => {
    const [isAuthorized, setAuthorizedState] = useState(false);

    const NavigateToLoginPage = () => (window.location.href = buildAbsoluteUrl(routes.login));

    useEffect(() => {
        const currentUserSession = AuthManager.userSession;
        if (currentUserSession) {
            axios
                .get("http://localhost:5000/api/authorize/check")
                .then(() => {
                    setAuthorizedState(true);
                })
                .catch(() => {
                    AuthManager.clearSession();
                    NavigateToLoginPage();
                });
        } else {
            NavigateToLoginPage();
        }
    }, []);

    return <>{isAuthorized? props.children : null}</>
};

export default Authorize;
