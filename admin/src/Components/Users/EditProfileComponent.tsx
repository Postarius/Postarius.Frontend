import React, {useEffect, useState} from "react";
import {UserProfileData} from "../../Models/Users/UserProfileData";
import {useParams, useHistory} from "react-router-dom";
import axios from "../../Api/axios";
import {renderUserProfile} from "../../Models/Users/RenderUtils";
import {Button, Input, Label} from "reactstrap";
import SingleImageUploadComponent from "../ImageUploading/SingleImageUploadComponent";

interface IState {
    loaded: boolean;
    data: UserProfileData;
}

const renderEditProfileForm = (userProfileData: UserProfileData) => {
    return (
        <div>
            <div>
                <Label for="displayName">Display Name</Label>
                <Input id="displayName" type="text" />
            </div>
            <SingleImageUploadComponent />
        </div>
    )
};

const EditProfileComponent = () => {
    const { id } = useParams();
    const [state, setState] = useState({
        loaded: false
    } as IState);

    const history = useHistory();

    useEffect(() => {
        loadUserProfileData();
    });

    const navigateToEdit = () => {
        history.push(`/users/edit/${id}`);
    };

    const loadUserProfileData = async () => {
        if (state.loaded)
            return;

        const response = await axios.get<UserProfileData>(`${process.env.REACT_APP_BACKEND_URL}/api/users/profile/${id}`);

        const newState = {
            loaded: true,
            data: response.data
        } as IState;

        setState(newState);
    };

    let content = state.loaded ? renderUserProfile(state.data) : <p>Loading...</p>
    return (
        <div>
            {content}
            <div className="d-flex flex-row-reverse w-100">
                <Button color="primary" onClick={navigateToEdit}>Save</Button>
            </div>
        </div>
    )
};

export default EditProfileComponent;
