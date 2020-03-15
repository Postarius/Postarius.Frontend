import React from "react";
import axiosGlobal, { AxiosError } from "axios";
import AuthManager from "../Pages/Authorization/AuthManager";
import {alert} from "../Components/shared/alert";
import {toast} from "react-toastify";

const axios = axiosGlobal.create();
const baseURI = process.env.REACT_APP_API_URL + "/api";
axios.defaults.baseURL = baseURI;

axios.interceptors.request.use(
    config => {
        if (config.baseURL === baseURI || !config.headers.Authorization && AuthManager.userSession)
            config.headers.Authorization = `Bearer ${AuthManager.userSession?.accessToken}`;

        return config;
    },
    error => Promise.reject(error.response));

axios.interceptors.response.use(
    response => {
        if (response.config.showSuccessAlert) {
            alert.success(response.config.successMessage || (response.config.method === "DELETE" && "Deleted successfully")
            || "Changes have been saved successfully.");
        }

        return response;
    },
    (error: AxiosError) => {
        if (!error.response) {
            alert.error("Unknown error");
            // window.location.href = "login";
            return Promise.reject(error);
        }

        var contentType = error.response.headers["content-type"] || "";

        const response = error.response;
        if (contentType.indexOf("text/html") != -1) {
            const errorDocument = new DOMParser().parseFromString(response.data, "text/html");
            const errorText = errorDocument.getElementsByTagName("h2")[0].innerText;

            alert.error(
                <>
                    {errorText} <br />
                    <a href="javascript:void(0);" onClick={() => window.open()!.document.write(response.data)}>
                        Show details
                    </a>
                </>
            );
        } else if (contentType.indexOf("application/json") != -1) {
            const errorResponse = response.data;

            if (errorResponse.description && !error.config.dontShowErrorAlert) {
                alert.error(errorResponse.description);
            }

            if (errorResponse.supportId) {
                alert.error(
                    <>
                        An error has occurred. Please try again in 1-2 minutes. If the error continues please contact support and reference the support id.
                        <br />
                        <br />
                        Support ID: {errorResponse.supportId}
                    </>
                );
            }
        } else {
            toast.error(response.status == 0 ? "A connection issue occurred, please try again." : `Unknown server error (${response.status}).`);
        }

        return Promise.reject(error);
    }
);

export default axios;

declare module "axios" {
    interface AxiosRequestConfig {
        successMessage?: string;
        showSuccessAlert?: boolean;
        dontShowErrorAlert?: boolean;
    }
}

declare global {
    interface Promise<T> {
        handleAxiosError(): Promise<void>;
    }
}

Promise.prototype.handleAxiosError = function<T>(this: Promise<T>) {
    return this.catch((error: AxiosError) => {
        return error.request || error.response ? Promise.resolve() : Promise.reject(error);
    });
};
