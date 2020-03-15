import React, {useState} from "react";
import {Button, Input, Progress} from "reactstrap";
import {IImageUploadResult, uploadImage} from "./ImageUploadHelper";

interface IState {
    imageSelected: boolean;
    imageSource: string | null;
    image: File
}

interface IImageUploadState {
    loading: boolean;
    loaded: boolean;
    percents: number;
}

interface ISingleImageUploadComponentProps {
    onImageUploaded?: (url: string) => void;
}

const SingleImageUploadComponent = (props: ISingleImageUploadComponentProps) => {
    const [uploadState, setUploadState] = useState({
        loaded: false,
        loading: false
    } as IImageUploadState);
    
    const [state, setState] = useState({
        imageSelected: false,
        imageSource: null
    } as IState);

    const handleChange = (event: React.SyntheticEvent<HTMLInputElement>) => {
        const files = event.currentTarget.files || new FileList();
        if (!files)
            return;

        let imageSource = files.length > 0 ? URL.createObjectURL(files[0]) : null;

        setState({
            imageSelected: files.length > 0,
            imageSource: imageSource,
            image: files[0]
        });
    };

    const onUploadClicked = () => {
        const formData = new FormData();
        formData.append("images", state.image);

        const config = {
            onUploadProgress: function (progressEvent: any) {
                const percent = Math.round(progressEvent.loaded / progressEvent.total * 100);

                setUploadState({
                    loading: percent > 0,
                    loaded: percent === 100,
                    percents: percent
                });
            }
        };

        const onUploadFinished = (succeeded: boolean, result: IImageUploadResult) => {
            if (succeeded) {
                if (succeeded && props.onImageUploaded) {
                    props.onImageUploaded(result.images[0].url);
                }
            }

            setUploadState({
                loading: false,
                loaded: true,
                percents: 100
            });
        };

        uploadImage(formData, config, onUploadFinished);
    };

    let content = state.imageSelected ? <img src={state.imageSource!} alt="uploadedImage" className="w-100" /> : <p>Upload image</p>
    return (
        <div className="w-100">
            {content}
            <Input type="file" onChange={handleChange} />
            <Button onClick={onUploadClicked}>Upload</Button>
            <Progress value={uploadState.percents} />
        </div>
    )
};

export default SingleImageUploadComponent;
