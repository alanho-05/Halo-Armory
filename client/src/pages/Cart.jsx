import { useContext, useEffect, useState } from 'react';
import AppContext from '../components/AppContext';
import { fetchCart, toDollars } from '../lib';
import { useNavigate } from 'react-router-dom';
import CartItem from '../components/CartItem';

export default function Cart() {
  const [cart, setCart] = useState();
  const { user } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    !user && navigate('/sign-in');
    async function loadCart(userId) {
      try {
        const cart = await fetchCart(userId);
        setCart(cart);
      } catch (err) {
        console.error(err);
      }
    }
    user && loadCart(user.userId);
  }, [user, navigate]);

  return (
    <section className="h-100 gradient-custom">
      <div className="container py-5">
        <div className="row d-flex justify-content-center my-4">
          <div className="col-md-8">
            <div className="card mb-4">
              <div className="card-header py-3">
                <h5 className="mb-0">Cart - {getCartQuantity(cart)} items</h5>
              </div>
              <div className="card-body">
                {cart?.map((product, index) => (
                  <div key={product.productId}>
                    <CartItem product={product} setCart={setCart} />
                    {index + 1 === cart.length ? undefined : (
                      <hr className="my-4" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card mb-4">
              <div className="card-header py-3">
                <h5 className="mb-0">Summary</h5>
              </div>
              <div className="card-body">
                <ul className="list-group list-group-flush">
                  <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                    Subtotal
                    <span>{getCartTotal(cart)}</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                    Shipping
                    <span>Free</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                    <div>
                      <strong>Total amount</strong>
                    </div>
                    <span>
                      <strong>{getCartTotal(cart)}</strong>
                    </span>
                  </li>
                </ul>
                <button
                  type="button"
                  className="btn btn-primary btn-lg btn-block"
                  onClick={handleCheckout}>
                  Go to checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  async function handleCheckout() {
    try {
      const storage = JSON.parse(localStorage.getItem('react-context-jwt'));
      const req = {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${storage.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cart }),
      };
      const res = await fetch('/api/checkout', req);
      if (!res.ok) throw new Error(`fetch Error ${res.status}`);
      const body = await res.json();
      window.location.href = body.url;
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
    total += item.price * item.quantity;
  });
  return toDollars(total);
}
