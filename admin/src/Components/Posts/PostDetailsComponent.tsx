import React, {useEffect, useState} from "react";
import axios from "../../Api/axios";
import {PostDetailsModel} from "../../Models/Posts/PostDetailsModel";
import { useParams } from "react-router-dom";
import PostDetailsTemplateComponent from "./PostDetailsTemplateComponent";

const PostDetailsComponent = () => {
    const { id } = useParams();
    const [loading, setLoadingState] = useState(true);
    const [loaded, setLoadedState] = useState(false);
    const [postDetails, setPostDetailsState] = useState();
    const loadPostData = async () => {
        if (loaded) {
            return;
        }
        setLoadingState(true);
        const response = await axios.get<PostDetailsModel>(`${process.env.REACT_APP_BACKEND_URL}/api/posts/details/${id}`);
        setLoadingState(false);

        setPostDetailsState(response.data);
        setLoadedState(true);
    };
    useEffect(() => {
        loadPostData();
    });
    return (
        <div>
            {
                loaded ? <PostDetailsTemplateComponent postDetailsModel={postDetails}/> : <p>Loading...</p>
            }
        </div>
    )
};

export default PostDetailsComponent;
