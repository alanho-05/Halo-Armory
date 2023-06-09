import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import NavBar from './NavBar';

function App() {
  const [serverData, setServerData] = useState('');

  useEffect(() => {
    async function readServerData() {
      const resp = await fetch('/api/hello');
      const data = await resp.json();

      console.log('Data from server:', data);

      setServerData(data.message);
    }

    readServerData();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<NavBar />}></Route>
    </Routes>
  );
}

export default App;

{
  /* <div className="App">
  <header className="App-header">
    <img src={logo} className="App-logo" alt="logo" />
    <h1>{serverData}</h1>
  </header>
</div>; */
}
