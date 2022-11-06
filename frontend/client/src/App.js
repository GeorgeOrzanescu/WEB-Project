import logo from './logo.svg';
import './App.css';
import NavigationBar from "./components/NavigationBar"
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Home from "./components/Home";
import Playlist from "./components/Playlist";
import AddSong from "./components/AddSong";
import Profile from "./components/Profile";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Spotify integrated song manager
        </p>
        <a
          className="App-link"
          href="/#"
          target="_blank"
          rel="noopener noreferrer"
        >
          WEB PROJECT
        </a>
      </header>
        <BrowserRouter>
            <div>
                <NavigationBar/>
            </div>
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/profile" element={<Profile/>} />
                <Route path="/playlist" element={<Playlist/>} />
                <Route path="/addsong" element={<AddSong/>} />
            </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
