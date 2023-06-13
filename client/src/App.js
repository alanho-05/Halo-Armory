import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar';
import Catalog from './pages/Catalog';
import NotFound from './pages/NotFound';
import Home from './pages/Home';
import Weapons from './pages/Weapons';
import Vehicles from './pages/Vehicles';
import Throwables from './pages/Throwables';

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
      <Route path="/" element={<NavBar />}>
        <Route index element={<Home />} />
        <Route path="weapons" element={<Weapons />} />
        <Route path="vehicles" element={<Vehicles />} />
        <Route path="Throwables" element={<Throwables />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
