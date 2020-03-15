import React from "react";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

interface IBasicLayoutProps {
    children: any
};

const BasicLayout = (props : IBasicLayoutProps) => {
    return (
        <div>
            <ToastContainer position={toast.POSITION.TOP_RIGHT} />
            {props.children}
        </div>
    )
};

export default BasicLayout;
