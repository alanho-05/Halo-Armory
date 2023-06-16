import { toDollars } from '../lib';

export default function UserCart({ product }) {
  const { name, quantity, price, imageUrl, productId } = product;
  console.log(productId);
  return (
    <div key={productId} className="card-body p-4">
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
      </div>
    </div>
  );
}
