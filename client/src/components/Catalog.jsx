import { Link } from 'react-router-dom';
import { toDollars } from '../lib';
import './Catalog.css';

export default function Catalog({ product }) {
  const { productId, imageUrl, name, price } = product;
  return (
    <Link to={`/details/${productId}`}>
      <div className="card product position-relative zoom overflow-hidden">
        <div className="mask">
          <div className="d-flex justify-content-start align-tems-start h-100">
            <h5>
              <span className="badge bg-light pt-2 ms-3 mt-3 text-dark">
                {toDollars(price)}
              </span>
            </h5>
          </div>
        </div>
        <img src={imageUrl} className="card-img-top img-contain" alt={name} />
      </div>
    </Link>
  );
}
