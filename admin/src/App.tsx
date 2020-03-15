import React from 'react';
import { Route } from 'react-router';
import './App.css';
import {Layout} from "./Pages/Layout/Layout";
import {Home} from "./Pages/Home/Home";
import {UserListComponent} from "./Components/Users/UserListComponent";
import {BrowserRouter, Switch} from "react-router-dom";
import {routes} from "./Routes/Routes";
import LoginPage from "./Pages/Login/LoginPage";
import Authorize from "./Pages/Authorization/Authorize";
import SignIn from "./Pages/Authorization/SignIn";
import MyProfileComponent from "./Components/Users/MyProfileComponent";
import UserProfileComponent from "./Components/Users/UserProfileComponent";
import EditProfileComponent from "./Components/Users/EditProfileComponent";
import CreateUserComponent from "./Components/Users/CreateUserComponent";
import BasicLayout from "./Pages/Layout/BasicLayout";
import PostDetailsComponent from "./Components/Posts/PostDetailsComponent";

export const App: React.FC = () => {
    return (
        <BrowserRouter>
            <BasicLayout>
                <Switch>
                    <Route exact path={routes.login} component={LoginPage} />
                    <Route exact path={routes.signIn} component={SignIn} />
                    <Layout>
                        <Authorize>
                            <Route exact path={routes.home} component={Home} />
                            <Route exact path={routes.userList} component={UserListComponent} />
                            <Route exact path={routes.myProfile} component={MyProfileComponent} />
                            <Route exact path={routes.profile} component={UserProfileComponent} />
                            <Route exact path={routes.editUserProfile} component={EditProfileComponent} />
                            <Route exact path={routes.createUser} component={CreateUserComponent} />
                            <Route exact path={routes.postDetails} component={PostDetailsComponent} />
                        </Authorize>
                    </Layout>
                </Switch>
            </BasicLayout>
        </BrowserRouter>
    )
};
