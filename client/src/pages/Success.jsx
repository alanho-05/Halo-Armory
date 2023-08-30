import { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import AppContext from '../components/AppContext';
import firework from '../lib/confetti';

export default function Success() {
  const { user } = useContext(AppContext);
  const cartId = user?.shoppingCartId;

  useEffect(() => {
    async function emptyCart() {
      const storage = JSON.parse(localStorage.getItem('react-context-jwt'));
      const req = {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${storage.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cartId }),
      };
      const res = await fetch('/api/checkout/success', req);
      if (!res.ok) throw new Error(`fetch Error ${res.status}`);
    }
    emptyCart();
    firework();
  });

  return (
    <div className="mt-5 d-flex justify-content-center container">
      <div className="py-4 px-5 bg-white bg-opacity-75 rounded">
        <div className="mb-4 text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="text-success bi bi-check-circle-fill"
            width="75"
            height="75"
            fill="currentColor"
            viewBox="0 0 16 16">
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
          </svg>
        </div>
        <div className="text-center">
          <h1>Thank You!</h1>
          <p>Your order has been received, ordnance drop incoming!</p>
          <Link to="/" className="btn btn-primary">
            Back Home
          </Link>
        </div>
      </div>
    </div>
  );
}
