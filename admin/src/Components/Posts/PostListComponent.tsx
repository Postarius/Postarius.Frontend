import React, {useEffect, useState} from "react";
import {buildUrl, routes} from "../../Routes/Routes";
import axios from "../../Api/axios";
import {PostStatus} from "../../Models/Posts/PostListModel";

interface IPostModel {
    primaryImageUrl: string,
    id: number,
    title: string,
    description: string
}

interface IModel {
    posts: IPostModel[];
}

interface IState {
    data: IPostModel[],
    isLoaded: boolean
}

const PostListComponent = () => {
    const [state, setState] = useState({} as IState);

    useEffect(() => {
        fetchData()
    });

    const fetchData = async () => {
        if (state.isLoaded)
            return;

        const response = await axios.get<IModel>(`${process.env.REACT_APP_BACKEND_URL}/api/posts/finalized`,
            {
                params : {
                    status: PostStatus.Finalized
                }
            });

        setState({
            data: response.data.posts,
            isLoaded: true
        });
    };

    let content = !state.isLoaded ? <p>Data is loading...</p>: state.data.length > 0 ? ListComponent(state.data) : <p>No work for now.</p>

    return (
        <div>{content}</div>
    )
};

const ListComponent = (posts: IPostModel[]) => {
    return (
        <div>
            {
                posts.map(p => {
                    return (
                        <div className="d-flex" key={p.id}>
                            <img src={p.primaryImageUrl} width="150" height="150" />
                            <div>
                                <p>Title: {p.title}</p>
                                <p>Description: {p.description}</p>
                            </div>
                            <a href={buildUrl(routes.postDetails, p.id)}>View</a>
                        </div>
                    )
                })
            }
        </div>
    )
};

export default PostListComponent;
