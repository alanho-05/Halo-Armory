import { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { fetchCart } from './lib';
import AppContext from './components/AppContext';
import CartContext from './components/CartContext';
import Home from './pages/Home';
import NavBar from './components/NavBar';
import Weapons from './pages/Weapons';
import Vehicles from './pages/Vehicles';
import Throwables from './pages/Throwables';
import Auth from './pages/AuthPage';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Success from './pages/Success';
import './App.css';

const tokenKey = 'react-context-jwt';

function App() {
  const [user, setUser] = useState();
  const [token, setToken] = useState();
  const [cart, setCart] = useState();
  const [isAuthorizing, setIsAuthorizing] = useState(true);
  const navigate = useNavigate();

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

  useEffect(() => {
    async function loadCart(userId) {
      try {
        const cart = await fetchCart(userId);
        setCart(cart);
      } catch (err) {
        console.error(err);
      }
    }
    user && loadCart(user.userId);
  }, [user]);

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
    navigate('/weapons');
  }

  const contextValue = { user, token, handleSignIn, handleSignOut };
  const cartContext = { cart, setCart };

  return (
    <AppContext.Provider value={contextValue}>
      <CartContext.Provider value={cartContext}>
        <Routes>
          <Route path="/" element={<NavBar />}>
            <Route index element={<Home />} />
            <Route path="weapons" element={<Weapons />} />
            <Route path="vehicles" element={<Vehicles />} />
            <Route path="throwables" element={<Throwables />} />
            <Route path="details/:productId" element={<ProductDetails />} />
            <Route path="sign-in" element={<Auth action="sign-in" />} />
            <Route path="sign-up" element={<Auth action="sign-up" />} />
            <Route path="cart" element={<Cart />} />
            <Route path="success" element={<Success />} />
          </Route>
        </Routes>
      </CartContext.Provider>
    </AppContext.Provider>
  );
}

export default App;
