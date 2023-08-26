import { useContext, useState } from 'react';
import AppContext from './AppContext';
import { ProductQuantity } from './ProductQuantity';
import { toDollars } from '../lib';

export default function CartItem({ product, setCart }) {
  const { name, quantity, price, imageUrl, productId } = product;
  const [updatedQuantity, setUpdatedQuantity] = useState(quantity);
  const { user } = useContext(AppContext);
  const shoppingCartId = user?.shoppingCartId;

  return (
    <div className="row">
      <div className="col-lg-3 col-md-12 md-4 md-lg-0 d-flex align-items-center justify-content-center">
        <div
          className="bg-image hover-overlay hover-zoom ripple rounded"
          data-mdb-ripple-color="light">
          <img src={imageUrl} className="img-fluid" alt={name} />
        </div>
      </div>
      <div className="col-lg-5 col-md-6 mb-4 mb-lg-0">
        <p>
          <strong>{name}</strong>
        </p>
        <p>Price: {toDollars(price)}</p>
        <button
          type="button"
          className="btn btn-danger btn-sm me-1 mb-2"
          onClick={handleRemoveItem}>
          <i className="fas fa-trash" />
        </button>
      </div>
      <ProductQuantity
        updatedQuantity={updatedQuantity}
        setUpdatedQuantity={setUpdatedQuantity}
        updateItem={updateItem}
      />
    </div>
  );

  async function handleRemoveItem() {
    try {
      const storage = JSON.parse(localStorage.getItem('react-context-jwt'));
      const req = {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${storage.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId, shoppingCartId }),
      };
      const res = await fetch('/api/cart/removeitem', req);
      if (!res.ok) throw new Error(`fetch Error ${res.status}`);
      setCart((prev) =>
        prev.filter((cartedItem) => cartedItem.productId !== productId)
      );
    } catch (err) {
      console.error(err);
    }
  }

  async function updateItem(quantity) {
    try {
      const storage = JSON.parse(localStorage.getItem('react-context-jwt'));
      const req = {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${storage.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId, shoppingCartId, quantity }),
      };
      const res = await fetch('/api/cart/update', req);
      if (!res.ok) throw new Error(`fetch Error ${res.status}`);
      setCart((prev) =>
        prev.map((cartedItem) =>
          cartedItem.productId === productId
            ? { ...product, quantity: quantity }
            : cartedItem
        )
      );
    } catch (err) {
      console.error(err);
    }
  }
}
