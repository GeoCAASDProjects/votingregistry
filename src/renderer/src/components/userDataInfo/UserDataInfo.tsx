import DynamicIcon from "../dynamicIcon/DynamicIcon";

export default function UserDataInfo({label, data, iconName}){
    return(
        <div style={{display:"flex", gap: "4px"}}>
        {iconName &&   <DynamicIcon iconName={iconName}/>}
        <div style={{display:"flex", flexDirection:"column", gap:"4px"}}>
            <span style={{display:"flex", gap:"4px", fontSize: "14px"}}>
            <label>{label}:</label>
            </span>
            <p style={{fontWeight:"bold"}}>{data}</p>
        </div>
        </div>
    )
}