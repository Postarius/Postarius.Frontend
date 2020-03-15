import React from "react";
import { toast } from 'react-toastify';
import { Alert } from "reactstrap";
import styled from "styled-components";

const AlertStyled = styled(Alert)`
    margin-bottom: 0;
    padding-top: 1.3rem;
    padding-bottom: 1.3rem;
    word-break: break-word;
    .close {
        padding-top: 1.3rem;
    }
`;

function createAlert(content: React.ReactNode, color: string) {
    return ({ closeToast }: { closeToast: () => void }) => (
        <AlertStyled color={color} toggle={closeToast}>
            {content}
        </AlertStyled>
    );
}

export const alert = {
    success: (content: React.ReactNode, duration?: number) => {
        toast(createAlert(content, "success"), { autoClose: duration || 2000 });
    },
    error: (content: React.ReactNode) => {
        toast(createAlert(content, "danger"), { autoClose: false, closeOnClick: false });
    }
};