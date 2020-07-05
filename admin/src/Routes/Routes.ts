export const routes = {
    login: "/login",
    signIn: "/signIn",

    home: "/",
    userList: "/users/list",
    profile: "/users/profile/:id",
    myProfile: "/users/myProfile",
    editUserProfile: "/users/edit/:id",
    createUser: "/users/create",

    finalizedPosts: "/finalizedPosts",
    postDetails: "/posts/details/:id"
};

export const buildUrl = (route: string, ...params: (string | number)[]) => {
    const routeParamPlaceholders = route.split("/").filter(p => p.startsWith(":"));

    if (!routeParamPlaceholders.length) {
        return route;
    }

    if (routeParamPlaceholders.length !== params.length) {
        throw Error(`Not all parameters are provided! Route: ${route}`);
    }

    let i = 0;
    return route.replace(new RegExp(routeParamPlaceholders.join("|"), "gi"), () => params[i++].toString());
};

export const buildAbsoluteUrl = (route: string, ...params: (string | number)[]) => {
    return window.location.origin + buildUrl(route, ...params);
};
