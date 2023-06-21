import { Link } from 'react-router-dom';
import { toDollars } from '../lib';
import './Catalog.css';

export default function Catalog({ product }) {
  const { productId, imageUrl, name, price } = product;
  return (
    <Link
      className="col-lg-4 col-md-6 mb-4 catalog-products position-relative zoom"
      to={`/details/${productId}`}>
      <div className="mask">
        <div className="d-flex justify-content-start align-tems-start h-100">
          <h5>
            <span className="badge bg-light pt-2 ms-3 mt-3 text-dark">
              {toDollars(price)}
            </span>
          </h5>
        </div>
      </div>
      <div className="hover-overlay">
        <div className="mask" />
      </div>
      <div className="bg-image rounded">
        <img src={imageUrl} alt={name} className="w-100" />
      </div>
    </Link>
  );
}

// <Link className="card h-100" to={`/details/${productId}`}>
//   <img src={imageUrl} className="card-img-top" alt={name} />
//   <div className="card-body">
//     <h5 className="card-title">{name}</h5>
//     <p className="card-text">{toDollars(price)}</p>
//   </div>
// </Link>
