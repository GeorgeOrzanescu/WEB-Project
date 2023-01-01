import Image from "react-bootstrap/Image";
import spotify from "../images/spotify.png";

function Home() {
  return (
    <div>
      <h1>Favourite song Manager</h1>
      <Image roundedCircle={true} src={spotify} />
    </div>
  );
}

export default Home;
