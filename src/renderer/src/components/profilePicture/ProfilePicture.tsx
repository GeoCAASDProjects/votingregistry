
import { useRef, useState } from 'react';
import DynamicIcon from '../dynamicIcon/DynamicIcon'
import classes from './profilePicture.module.css'
export default function ProfilePicture({ size, onChange, image = null}) {

    const fileInputRef = useRef<null>(null)
  //  const [image, setImage] = useState<null | string>(null);
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
         /*   const name = file.name;
            const imageUrl = URL.createObjectURL(file);
            setImage(imageUrl);
            console.log("Archivo");
            console.log(file);*/
            onChange(file);


    }
    }
 

    function selectFiles() {
        fileInputRef?.current?.click();
    }
    return (

        <div className={classes.container} style={{ width: size ?? 100, height: size ?? 100 }}>
            <input
                title='image'
                type="file"
                ref={fileInputRef}
                accept="image/*"
                onChange={onChange && handleFileChange}
                className={classes.fileInput}

            />
            <div className={classes.iconWrapper} onClick={selectFiles}>
                <div className={classes.icon}>
                    <DynamicIcon iconName="PhotoCamera" />
                </div>

            </div>
            <img alt="profile" src={image ?? "./src/assets/user/user.jpg"} />
        </div>
    )
}
