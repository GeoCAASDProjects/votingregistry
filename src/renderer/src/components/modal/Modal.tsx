import { FC, ReactNode } from "react";
import style from './modal.module.css';

import { CloseOutlined, CloseRounded, Login } from '@mui/icons-material';
import Button from "../button/Button";
 
interface ModalProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    title: string;
    children?: ReactNode;
    onSubmit?: (id:number)=>void;
}
const Modal: FC<ModalProps> = ({ isOpen, setIsOpen, title, children, onSubmit}) => {
    if (!isOpen) return null
    function close() {
        setIsOpen(false)
    }
    return (
        <>
            <div className={style.overlay}></div>
            <div className={style.container}>
                <button onClick={close} title="Submitting" className={style.closeButton}><CloseOutlined fontSize='inherit' /></button>
                <h3>{title ?? ''}</h3>
                {children}

                <div style={{display:"flex", width: "100%", justifyContent:"space-between"}}>
                    
                    <Button onClick={close} title="Cancelar"/>
                    <Button onClick={onSubmit} title="Borrar" style={{backgroundColor: "#0F0F40", color:"white"}}/>
                </div>

            </div>
        </>


    )
}

export default Modal;