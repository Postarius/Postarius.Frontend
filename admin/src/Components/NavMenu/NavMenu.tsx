import React, {useState} from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import {BrowserRouter, Link} from 'react-router-dom';
import './NavMenu.css';
import {routes} from "../../Routes/Routes";
import AuthManager from "../../Pages/Authorization/AuthManager";

interface IState {
    collapsed: boolean;
}

export const NavMenu : React.FC = () => {
    const [state, setState] = useState({
        collapsed : true
    } as IState);

    const toggleNavbar = () => {
        setState({
            collapsed: !state.collapsed
        })
    };

    const onGoToPublicClicked = () => {
        window.location.href = `${process.env.REACT_APP_PUBLIC_URL}/thirdPartyAuth?token=${AuthManager.userSession.accessToken}`;
    };

    return (
        <header>
            <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" light>
                <Container>
                    <NavbarBrand to="/">react</NavbarBrand>
                    <NavbarToggler onClick={toggleNavbar} className="mr-2" />
                    <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!state.collapsed} navbar>
                        <ul className="navbar-nav flex-grow">
                            <NavItem>
                                <NavLink className="text-dark" tag={Link} to="/">Home</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="text-dark" tag={Link} to={routes.userList}>User list</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="text-dark" tag={Link} to={routes.myProfile}>Profile</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="text-dark" tag={Link} to={routes.createUser}>Create user</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="text-dark" tag={Link} to={routes.finalizedPosts}>Finalized posts</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="text-dark" onClick={onGoToPublicClicked}>Go to Public page</NavLink>
                            </NavItem>
                        </ul>
                    </Collapse>
                </Container>
            </Navbar>
        </header>
    )
};
