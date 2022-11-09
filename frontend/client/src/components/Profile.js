import Image from "react-bootstrap/Image";
import musician from "../images/musician.jpeg";

import { observer } from "mobx-react-lite";

const Profile = observer(({ store }) => {
  return (
    <div>
      <h1>Profile</h1>
      <Image
        style={{ width: 300, height: 300, marginTop: 50 }}
        roundedCircle={true}
        src={musician}
      />
      <h3>Welcome {store.User}</h3>
    </div>
  );
});

export default Profile;
