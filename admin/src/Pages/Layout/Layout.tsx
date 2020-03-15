import React from 'react';
import { Container } from 'reactstrap';
import { NavMenu } from '../../Components/NavMenu/NavMenu';
import {BrowserRouter} from "react-router-dom";

interface ILayoutProps {
    children: any;
}

export const Layout : React.FC<ILayoutProps> = (props : ILayoutProps) => {
    return (
        <div>
            <NavMenu />
            <Container>
                {props.children}
            </Container>
        </div>
    );
};
