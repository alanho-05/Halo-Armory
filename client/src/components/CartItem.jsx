import { useContext } from 'react';
import AppContext from './AppContext';
import { toDollars } from '../lib';

export default function CartItem({ product }) {
  const { name, quantity, price, imageUrl, productId } = product;
  const { user } = useContext(AppContext);
  const shoppingCartId = user.shoppingCartId;

  return (
    <div className="card-body p-4">
      <div className="row align-items-center">
        <div className="col-md-2">
          <img src={imageUrl} className="img-fluid" alt={name} />
        </div>
        <div className="col-md-2 d-flex justify-content-center">
          <div>
            <p className="small text-muted mb-4 pb-2">Name</p>
            <p className="lead fw-normal mb-0">{name}</p>
          </div>
        </div>
        <div className="col-md-2 d-flex justify-content-center">
          <div>
            <p className="small text-muted mb-4 pb-2">Quantity</p>
            <p className="lead fw-normal mb-0">{quantity}</p>
          </div>
        </div>
        <div className="col-md-2 d-flex justify-content-center">
          <div>
            <p className="small text-muted mb-4 pb-2">Price</p>
            <p className="lead fw-normal mb-0">{toDollars(price)}</p>
          </div>
        </div>
        <div className="col-md-2 d-flex justify-content-center">
          <div>
            <button className="btn btn-danger" onClick={removeItem}>
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  async function removeItem() {
    try {
      const req = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId, shoppingCartId }),
      };
      const res = await fetch('/api/cart/removeitem', req);
      if (!res.ok) throw new Error(`fetch Error ${res.status}`);
    } catch (err) {
      console.error(err);
    }
  }
}
