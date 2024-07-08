import DynamicIcon from "../dynamicIcon/DynamicIcon"

export default function TextIcon({icon, title}){
    return(

        <div style={{display:"flex", gap:"4px", alignContent:"center", alignItems:"center"}}>
        <DynamicIcon iconName={icon} fontSize="inherit"/>
        <p>{title}</p>
        </div>
    )
    
}
