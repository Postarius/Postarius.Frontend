import React from "react";
import {PostDetailsModel} from "../../Models/Posts/PostDetailsModel";
import axios from "../../Api/axios";
import { useHistory } from "react-router-dom";
import {routes} from "../../Routes/Routes";

interface IPostDetailsTemplateComponentProps {
    postDetailsModel: PostDetailsModel;
}

const PostDetailsTemplateComponent = (props: IPostDetailsTemplateComponentProps) => {
    const post = props.postDetailsModel;
    const history = useHistory();
    const approvePost = async (id: number) => {
        await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/posts/approve/${id}`);
        history.push(routes.home);
    };
    return (
        <div className="flex-column">
            <h2>{post.title}</h2>
            <div>{post.description}</div>
            {
                post.imageUrls.map((u, i) => {
                    return (
                        <img src={u} alt="image" key={`image_${i}`} className="mx-auto d-block"/>
                    );
                })
            }
            <button className="btn btn-primary float-right" onClick={() => approvePost(post.id)}>Approve</button>
            <button className="btn btn-danger float-right">Disapprove</button>
            <button className="btn btn-primary float-right">Back To List</button>
        </div>
    )
};

export default PostDetailsTemplateComponent;
