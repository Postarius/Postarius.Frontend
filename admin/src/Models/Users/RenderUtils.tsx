import {UserProfileData} from "./UserProfileData";
import React from "react";
import {Card, CardBody, CardHeader} from "reactstrap";

export function renderUserProfile(userProfileData: UserProfileData) {
    return (
        <div>
            <div className="w-50 d-inline-block">
                <img src={userProfileData.avatarUrl} alt="avatar" style={{maxHeight: "300px"}}/>
            </div>
            <Card className="w-50 d-inline-block">
                <CardHeader className="w-auto">
                    <h4>{userProfileData.displayName}</h4>
                </CardHeader>
                <CardBody>
                    <p>{userProfileData.login}</p>
                    <p>{userProfileData.email}</p>
                </CardBody>
            </Card>
        </div>
    )
}
