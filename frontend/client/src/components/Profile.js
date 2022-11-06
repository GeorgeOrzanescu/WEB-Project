import Image from 'react-bootstrap/Image'
import musician from "../images/musician.jpeg"
import AppContext from "../context/AppContext";
import {useContext} from "react";

const Profile = () => {
    const { user } = useContext(AppContext);
    return(
        <div>
            <h1>Profile</h1>
            <Image style={{width:300, height: 300, marginTop:50}} roundedCircle={true} src={musician}/>
            <h3>
                Welcome {user}
            </h3>
        </div>
    )
}

export default Profile;