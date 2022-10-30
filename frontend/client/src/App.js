import logo from './logo.svg';
import './App.css';
import NavigationBar from "./components/NavBar"
import 'bootstrap/dist/css/bootstrap.min.css';
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
      <body>
      <NavigationBar />
      </body>

    </div>
  );
}

export default App;
