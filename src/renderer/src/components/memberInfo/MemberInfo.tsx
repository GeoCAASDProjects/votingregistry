import { BadgeOutlined, Close, DocumentScanner, Phone } from "@mui/icons-material"
import ProfilePicture from "../profilePicture/ProfilePicture"
import classes from "./memberInfo.module.css"
import Button from "../button/Button"
import { Badge } from "@mui/material"
import TextIcon from "../textIcon/TextIcon"
import IconButton from "../iconButton/IconButton"
import DynamicLoader from "../dynamicLoader/DynamicLoader"
import { getNamedDate } from "@renderer/util/time/timeFunction"
export default function MemberInfo({currentMember}) {
 
    return (
        <div style={{ width: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignContent: "center", alignItems: "center", gap: "20px"}}>

            <div style={{ width: "100%", display: "flex", justifyContent: "flex-end" }}>
            <IconButton iconName="Close" onClick={() => alert("Hello")}/>
            </div>
          
            <div >
                <div className={classes["image-container"]}>
                    <ProfilePicture size={90} />

                </div>
                <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: "5px", justifyContent: "center", alignContent: "center", alignItems: "center" }}>
                    <h2>{`${currentMember.name} ${currentMember.last_name}`}</h2>

                    <TextIcon title={currentMember?.phone ?? "--"} icon="Phone" />
                    <TextIcon title={`***-***-0349`} icon="BadgeOutlined" />
                    <TextIcon title={`Unido el ${getNamedDate(currentMember?.created_at)}`} icon="CalendarMonth" />



                </div>
            </div>

            <Button title="Ver perfil" />


            <table className={classes['table']}>
                <thead>


                </thead>
                <tbody>
                    <tr>
                        <td>   <span style={{ fontWeight: "bold" }}>Sector</span></td>
                        <td>Robelto</td>

                    </tr>
                    <tr>

                        <td>   <span style={{ fontWeight: "bold" }}>Recinto</span></td>
                        <td>Villaman</td>

                    </tr>

                    <tr>
                        <td>   <span style={{ fontWeight: "bold" }}>Colegio</span></td>
                        <td>Ramirez</td>

                    </tr>

                </tbody>
            </table>


        </div>

    )
}