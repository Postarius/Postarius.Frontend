import axios from "../../Api/axios";
import { toast } from 'react-toastify';

export interface IImageUploadResult {
    images: IImageModel[];
}

interface IImageModel {
    url: string;
}

const uploadImage = (formData: FormData, config: any, callback: (succeeded: boolean, result: any) => void) => {
    axios.post(`${process.env.REACT_APP_BACKEND_IMAGE_URL}/api/images/upload`, formData, config)
        .then(res => {
            toast.success("Image uploaded successfully!");
            callback(true, res.data);
        })
        .catch(err => {
            toast.error(`Image upload failed, try again. Error: ${err}`);
            callback(false, null);
        });
};

export {uploadImage};
