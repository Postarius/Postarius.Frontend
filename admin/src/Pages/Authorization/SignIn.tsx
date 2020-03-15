import React from "react";
import { Redirect } from "react-router-dom";
import AuthManager from "./AuthManager";
import {buildUrl, routes} from "../../Routes/Routes";
import queryString from "query-string";

const SignIn: React.FC = () => {
    const hash = window.location.hash;
    const queryParams = queryString.parse(window.location.search, { parseNumbers: true });
    if (hash) {
        const token = queryString.parse(hash).token;
        if (typeof token == "string") {
            AuthManager.signIn(token);
            return <Redirect to={(queryParams.returnUrl as string) || buildUrl(routes.home)} />;
        }
    }

    return <>{"Something went wrong."}</>;
};

export default SignIn;
