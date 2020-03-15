import React, {FormEvent, useState} from "react";
import AuthManager from "../Authorization/AuthManager";
import { Redirect, useHistory } from "react-router-dom";
import {buildUrl, routes} from "../../Routes/Routes";
import {Button, Card, CardBody, CardHeader, Container, Form, FormGroup, Input, Label, Spinner} from "reactstrap";

interface IState {
    loading: boolean;
    formData: any;
}

const LoginPage: React.FC = () => {
    const [state, setState] = useState({
        loading: false,
        formData: {}
    } as IState);
    const history = useHistory();

    const handleChange = (e : FormEvent<HTMLInputElement>) => {
        const newState: IState = state;
        newState.formData[e.currentTarget.name] = e.currentTarget.value;

        setState(newState);
    };

    const onAuth = (token: string | null, succeeded: boolean) => {
        setState({
            loading: succeeded,
            formData: state.formData
        });

        if (succeeded) {
            history.push("/");
        }
    };

    const onLoginClicked = () => {
        setState({
            loading: true,
            formData: state.formData
        });

        AuthManager.login(state.formData, onAuth);
    };

    return AuthManager.userSession ? (
        <Redirect to={buildUrl(routes.home)} />
    ) : (
        <Container className="col-6 offset-3 mt-5">
            <Card>
                <CardHeader>
                    <h4>Log in WebProgramming Coursework</h4>
                </CardHeader>
                <CardBody>
                    <Form>
                        <FormGroup>
                            <Label for="login">Login</Label>
                            <Input type="text" id="login" name="login" onChange={handleChange}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="password">Password</Label>
                            <Input type="password" id="password" name="password" onChange={handleChange}/>
                        </FormGroup>
                        <Button color="primary" disabled={state.loading} onClick={onLoginClicked}>
                            {state.loading ? (<Spinner size="sm" className="mr-1" />) : null}
                            Login
                        </Button>
                    </Form>
                </CardBody>
            </Card>
        </Container>
    );
};

export default LoginPage;
