import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import AppContext from './components/AppContext';
import NavBar from './components/NavBar';
import NotFound from './pages/NotFound';
import Home from './pages/Home';
import Weapons from './pages/Weapons';
import Vehicles from './pages/Vehicles';
import Throwables from './pages/Throwables';
import Auth from './pages/AuthPage';
import ProductDetails from './pages/ProductDetails';
import './App.css';

const tokenKey = 'react-context-jwt';

function App() {
  const [user, setUser] = useState();
  const [token, setToken] = useState();
  const [isAuthorizing, setIsAuthorizing] = useState(true);

  useEffect(() => {
    // If user logged in previously on this browser, authorize them
    const auth = localStorage.getItem(tokenKey);
    if (auth) {
      const a = JSON.parse(auth);
      setUser(a.user);
      setToken(a.token);
    }
    setIsAuthorizing(false);
  }, []);

  if (isAuthorizing) return null;

  function handleSignIn(auth) {
    localStorage.setItem(tokenKey, JSON.stringify(auth));
    setUser(auth.user);
    setToken(auth.token);
  }

  function handleSignOut() {
    localStorage.removeItem(tokenKey);
    setUser(undefined);
    setToken(undefined);
  }

  const contextValue = { user, token, handleSignIn, handleSignOut };

  return (
    <AppContext.Provider value={contextValue}>
      <Routes>
        <Route path="/" element={<NavBar />}>
          <Route index element={<Home />} />
          <Route path="weapons" element={<Weapons />} />
          <Route path="vehicles" element={<Vehicles />} />
          <Route path="throwables" element={<Throwables />} />
          <Route path="details/:productId" element={<ProductDetails />} />
          <Route path="sign-in" element={<Auth action="sign-in" />} />
          <Route path="sign-up" element={<Auth action="sign-up" />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </AppContext.Provider>
  );
}

export default App;
