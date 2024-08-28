import { BadgeOutlined, Close, DocumentScanner, Phone } from "@mui/icons-material"
import ProfilePicture from "../profilePicture/ProfilePicture"
import classes from "./memberInfo.module.css"
import Button from "../button/Button"
import { Badge } from "@mui/material"
import TextIcon from "../textIcon/TextIcon"
import IconButton from "../iconButton/IconButton"
import DynamicLoader from "../dynamicLoader/DynamicLoader"
import { getNamedDate } from "@renderer/util/time/timeFunction"
import { formatDocument } from "@renderer/util/miscFunctions"
import { BASE_URL } from "@renderer/config"
export default function MemberInfo({ currentMember, openSchool, clearMember, singleMemberPending }) {
    console.log("AAAAAAAAHH")

    
    console.log(`${BASE_URL}storage/${currentMember?.image}`);
    return (
        <div style={{ width: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignContent: "center", alignItems: "center", gap: "20px" }}>

        {currentMember && !singleMemberPending &&    <div style={{ width: "100%", display: "flex", justifyContent: "flex-end" }}>
                <IconButton iconName="Close" onClick={() => clearMember(currentMember?.school?.id)} />
            </div>}

            {currentMember && !singleMemberPending && <div >
                <div className={classes["image-container"]}>
                    <ProfilePicture size={90} image={currentMember?.image ? `${BASE_URL}storage/${currentMember?.image}`: null} />

                </div>
                <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: "5px", justifyContent: "center", alignContent: "center", alignItems: "center" }}>
                    <h2>{`${currentMember.name} ${currentMember.last_name}`}</h2>

                    <TextIcon title={currentMember?.phone ?? "--"} icon="Phone" />
                    <TextIcon title={formatDocument(currentMember?.document) ?? "--"} icon="BadgeOutlined" />
                    <TextIcon title={`Unido el ${getNamedDate(currentMember?.created_at)}`} icon="CalendarMonth" />



                </div>
            </div>
            }
            <Button title="Ver perfil" />


            {currentMember && !singleMemberPending && <table className={classes['table']}>
                <thead>


                </thead>
                <tbody>

                    <tr>

                        <td ><span style={{ fontWeight: "bold" }}>Colegio</span></td>
                        <td>{currentMember?.school?.name}</td>

                    </tr>



                </tbody>
            </table>}


        </div>

    )
}