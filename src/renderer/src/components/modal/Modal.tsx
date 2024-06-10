import { FC, ReactNode} from "react";
import style from './modal.module.css';

import { CloseOutlined, CloseRounded, Login } from '@mui/icons-material';
interface ModalProps {
    isOpen: boolean;
    title: string;
    children ?: ReactNode;
}
const Modal: FC<ModalProps> = ({ isOpen, title, children}) => {

    return (
        <>
        
            <div className={style.overlay}></div>
            <div className={style.container}>
                <button title="Submitting" className={style.closeButton}><CloseOutlined fontSize='inherit' /></button>
                <h3>{title ?? ''}</h3>
                {children}


            </div>
        </>
    )
}

export default Modal;