import React, {useState} from "react";
import {Button, Form, FormGroup, Input, Label} from "reactstrap";
import { toast } from 'react-toastify';
import SingleImageUploadComponent from "../ImageUploading/SingleImageUploadComponent";

const CreateUserComponent = () => {
    const [state, setState] = useState({} as any);
    const onFormSubmit = () => {
        console.log(state);
        toast.success("Success!", {
            position: toast.POSITION.TOP_RIGHT
        });
    };

    const onImageUploaded = (url: string) => {
        state.avatarUrl = url;
    };

    const handleChange = (event : React.SyntheticEvent<HTMLInputElement>) => {
        const newState = state;
        newState[event.currentTarget.name] = event.currentTarget.value;

        setState(newState);
    };

    return (
        <div className="row">
            <h2 className="col-12">Create user</h2>
            <div className="col-6" style={{maxWidth: "400px"}}>
                <SingleImageUploadComponent onImageUploaded={onImageUploaded}/>
            </div>
            <Form className="col-6">
                <FormGroup>
                    <Label for="login">Login</Label>
                    <Input type="text" id="login" name="login" onChange={handleChange} />
                </FormGroup>
                <FormGroup>
                    <Label for="displayName">Display Name</Label>
                    <Input type="text" id="displayName" name="displayName" onChange={handleChange} />
                </FormGroup>
                <FormGroup>
                    <Label for="email">Email</Label>
                    <Input type="email" id="email" name="email" onChange={handleChange}/>
                </FormGroup>
                <FormGroup>
                    <Label for="password">Password</Label>
                    <Input type="password" id="password" name="password" onChange={handleChange} />
                </FormGroup>
                <FormGroup>
                    <Button color="primary" className="float-right" onClick={onFormSubmit}>Register</Button>
                </FormGroup>
            </Form>
        </div>
    )
};

export default CreateUserComponent;
