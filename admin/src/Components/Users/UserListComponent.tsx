import React, {useEffect, useState} from 'react';
import {Table} from "reactstrap";
import {ListSearchParams} from "../../Models/ListSearchParams";
import axios from "../../Api/axios";
import {buildAbsoluteUrl, routes} from "../../Routes/Routes";

interface IUserModel {
    displayName: string;
    email: string;
    id: number;
}

interface IUserListComponentProps {
    searchParams?: ListSearchParams;
    totalPageCount?: number;
    totalEntries?: number;
    pageNumber?: number;
}

interface IModel {
    userInfos: IUserModel[];
    searchParams?: ListSearchParams;
    totalPageCount?: number;
    totalEntries?: number;
    pageNumber?: number;
}

interface IState {
    data: IModel;
    loaded: boolean;
}

function renderTable(users: IUserModel[]): JSX.Element {
    return (
        <Table>
            <thead>
            <tr>
                <th>#</th>
                <th>Display Name</th>
                <th>Email</th>
                <th>Action</th>
            </tr>
            </thead>
            <tbody>
            {
                users.map((u, i) => {
                    return (
                        <tr key={`tableRow_${i}`}>
                            <th scope="row">{i + 1}</th>
                            <th>{u.displayName}</th>
                            <th>{u.email}</th>
                            <th><a href={buildAbsoluteUrl(routes.profile, u.id.toString())}>Profile</a></th>
                        </tr>
                    )
                })
            }
            </tbody>
        </Table>
    );
}

export const UserListComponent : React.FC<IUserListComponentProps> = (props: IUserListComponentProps) => {
    const [state, setState] = useState({} as IState);

    useEffect(() => {
        fetchData();
    });

    const fetchData = async () => {
        if (state.loaded)
            return;

        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/users/list`,
            {
                params : {
                    displayName: props.searchParams?.displayName,
                    login: props.searchParams?.login,
                    email: props.searchParams?.email,
                    skip: props.searchParams?.skip,
                    take: props.searchParams?.take
                }
            });

        setState({
            data: response.data,
            loaded: true
        });
    };

    let content = state.loaded ? renderTable(state.data.userInfos) : <p>Data is loading...</p>

    return (
        <div>{content}</div>
    )
};
