import React, {useState} from "react";
import {Button, Input, Progress, Table} from "reactstrap";
import axios from "../../Api/axios";

interface IState {
    images: IImageModel[];
    imagesUploaded: boolean;
}

interface IImageModel {
    name: string;
    size: number;
    result?: string;
    file: File
}

const MultipleImagesUploadComponent = () => {
    const [state, setState] = useState({
        images: [],
        imagesUploaded: false
    } as IState);

    const [uploadState, setUploadState] = useState({
        progressStates: [0]
    });

    const onImageSelected = (event: React.SyntheticEvent<HTMLInputElement>) => {
        const fileList = event.currentTarget.files!;

        setState({
            imagesUploaded: true,
            images: Array.from(fileList).map(image => {
                return {
                    name: image.name,
                    size: image.size,
                    result: URL.createObjectURL(image),
                    file: image
                }
            })
        });
    };

    const uploadImage = (image: IImageModel, index: number) => {
        const formData = new FormData();
        formData.append("images", image.file);

        const config = {
            onUploadProgress: function (progressEvent: any) {
                const percent = Math.round(progressEvent.loaded / progressEvent.total * 100);
                let newPercentStates = uploadState.progressStates;
                newPercentStates[index] = percent;

                setUploadState({
                    progressStates: newPercentStates
                });
            },
            headers: {
                "Accept": "application/json"
            },
            form: formData
        };

        axios.post(`${process.env.REACT_APP_BACKEND_IMAGE_URL}/api/images/upload`, formData, config)
            .then(res => console.log(res))
            .catch(err => console.log(err));
    };

    const uploadImages = (images: IImageModel[]) => {
        images.forEach((image, index) => {
            uploadImage(image, index);
        });
    };

    const renderTable = (images: IImageModel[]) => {
        return (
            <div>
                <Button onClick={() => uploadImages(state.images)}>Upload all</Button>
                <Table>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Preview</th>
                        <th>Name</th>
                        <th>Size</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        images.map((image, index) => {
                            let progressBar = uploadState.progressStates[index] > 0 ?
                                <Progress value={uploadState.progressStates[index]} /> :
                                null;

                            return (
                                <tr key={`imageUpload_${index}`}>
                                    <td>{index + 1}</td>
                                    <td><img src={image.result} style={{maxHeight: "100px"}}/></td>
                                    <td>{image.name}</td>
                                    <td>{image.size}</td>
                                    <td>
                                        <Button onClick={() => uploadImages([image])}>Upload</Button>
                                        {progressBar}
                                    </td>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </Table>
            </div>
        )
    };

    let content = state.imagesUploaded ? renderTable(state.images) : <p>Please, upload images</p>;
    return (
        <div>
            <p>{state.imagesUploaded}</p>
            {content}
            <Input type="file" onChange={onImageSelected} multiple={true} />
        </div>
    )
};

export default MultipleImagesUploadComponent;
/*
{http://localhost:7000/Images/Raws/c85b21ac689245fba88d77f407816b2d.jpg,
http://localhost:7000/Images/Raws/0f20667a4ada42569b3bf00348d54e3a.png,
http://localhost:7000/Images/Raws/4b624b5c8d4542acb786d77f5a29dee2.jpg}
 */
