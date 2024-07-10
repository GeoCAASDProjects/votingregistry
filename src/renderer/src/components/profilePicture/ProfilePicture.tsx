
import classes from './profilePicture.module.css'
export default function ProfilePicture({size}){
    
    return(
    <div className={classes.container} style={{width: size ?? 100, height: size ?? 100}}>

    <img alt="profile" src="./src/assets/user/user.jpg"/>
    </div>
    )
}
