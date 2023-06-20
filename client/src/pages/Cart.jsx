import { useContext, useEffect, useState } from 'react';
import AppContext from '../components/AppContext';
import { fetchCart, toDollars } from '../lib';
import { useNavigate } from 'react-router-dom';
import CartItem from '../components/CartItem';

export default function Cart() {
  const [cart, setCart] = useState();
  const [error, setError] = useState();
  const { user } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    !user && navigate('/sign-in');
    async function loadCart(userId) {
      try {
        const cart = await fetchCart(userId);
        setCart(cart);
      } catch (err) {
        setError(err);
      }
    }
    user && loadCart(user.userId);
  }, [user, navigate]);

  return (
    <section className="vh-100" style={{ backgroundColor: '#DDE6ED' }}>
      <div className="container h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col">
            <p>
              <span className="h2">Shopping Cart </span>
              <span className="h4">
                ({getCartQuantity(cart)} item in your cart)
              </span>
            </p>
            <div className="card mb-4">
              {cart?.map((product) => (
                <CartItem
                  key={product.productId}
                  product={product}
                  setCart={setCart}
                />
              ))}
            </div>
          </div>
          <div className="card mb-5">
            <div className="card-body p-4">
              <div className="float-end">
                <p className="mb-0 me-5 d-flex align-items-center">
                  <span className="small text-muted me-2">Order total:</span>{' '}
                  <span className="lead fw-normal">{getCartTotal(cart)}</span>
                </p>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-end">
            <button
              type="button"
              className="btn btn-light btn-lg me-2"
              onClick={() => navigate(-1)}>
              Continue shopping
            </button>
            <button
              type="button"
              className="btn btn-primary btn-lg"
              onClick={handleCheckout}>
              Check Out
            </button>
          </div>
        </div>
      </div>
    </section>
  );

  async function handleCheckout() {
    try {
      const req = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cart }),
      };
      const res = await fetch('/api/checkout', req);
      if (!res.ok) throw new Error(`fetch Error ${res.status}`);
      const body = await res.json();
      window.location.href = body.url;
      res.sendStatus(202);
    } catch (err) {
      console.error(err);
    }
  }
}

function getCartQuantity(cart) {
  let quantity = 0;
  cart?.forEach((item) => {
    quantity += item.quantity;
  });
  return quantity;
}

function getCartTotal(cart) {
  let total = 0;
  cart?.forEach((item) => {
    total += item.price;
  });
  return toDollars(total);
}
