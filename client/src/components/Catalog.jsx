import { Link } from 'react-router-dom';
import { toDollars } from '../lib';

export default function Catalog({ products }) {
  return (
    <div className="row row-cols-1 row-cols-md-3 row-cols-lg-4 g-4">
      {products?.map((product) => (
        <div key={product.productId} className="col">
          <div className="card h-100">
            <img
              src={product.imageUrl}
              className="card-img-top"
              alt={product.name}
            />
            <div className="card-body">
              <h5 className="card-title">{product.name}</h5>
              <p className="card-text">{toDollars(product.price)}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
