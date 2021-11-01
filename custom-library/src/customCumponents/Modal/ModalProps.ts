import { ReactElement } from "react";

export interface ModalProps {
    closeButtonElement: ReactElement;
    visible: boolean;
    toggle: () => void;
}