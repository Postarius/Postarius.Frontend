import React, {useEffect, useState} from 'react';
import {useHistory, useParams} from 'react-router-dom';
import axios from "../../Api/axios";
import {UserProfileData} from "../../Models/Users/UserProfileData";
import {renderUserProfile} from "../../Models/Users/RenderUtils";
import {Button} from "reactstrap";

interface IState {
    loaded: boolean;
    data: UserProfileData;
}

const UserProfileComponent = () => {
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
                <Button color="primary" onClick={navigateToEdit}>Edit</Button>
            </div>
        </div>
    )
};

export default UserProfileComponent;
