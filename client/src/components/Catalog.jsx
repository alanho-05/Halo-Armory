import { Link } from 'react-router-dom';
import { toDollars } from '../lib';

export default function Catalog({ product }) {
  const { productId, imageUrl, name, price } = product;
  return (
    <Link className="card h-100" to={`/details/${productId}`}>
      <img src={imageUrl} className="card-img-top" alt={name} />
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <p className="card-text">{toDollars(price)}</p>
      </div>
    </Link>
  );
}
