import { useEffect, useState } from 'react';
import { fetchProduct, toDollars } from '../lib';
import './ProductDetails.css';
import { useParams, useNavigate } from 'react-router-dom';

export default function ProductDetails() {
  const { productId } = useParams();
  const [product, setProduct] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();
  const navigate = useNavigate();
  function prevPage() {
    navigate(-1);
  }

  useEffect(() => {
    async function loadProduct(productId) {
      try {
        const product = await fetchProduct(productId);
        setProduct(product);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    }
    setIsLoading(true);
    loadProduct(productId);
  }, [productId]);

  if (isLoading) return <div>Loading...</div>;
  if (error) {
    return (
      <div>
        Error Loading Product {productId}: {error.message}
      </div>
    );
  }
  if (!product) return null;
  const { name, imageUrl, price, description } = product;
  return (
    <div className="container">
      <div className="card shadow-sm">
        <div className="card-body">
          <div className="row">
            <div className="col">
              <button className="btn text-secondary" onClick={prevPage}>
                &lt;Back
              </button>
            </div>
          </div>
          <div className="row mb-4">
            <div className="col-12 col-sm-6 col-md-5">
              <img src={imageUrl} alt={name} className="image" />
            </div>
            <div className="col-12 col-sm-6 col-md-7">
              <h2>{name}</h2>
              <h5 className="text-secondary">{toDollars(price)}</h5>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <p className="description">{description}</p>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <button className="btn btn-primary">Add to Cart</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
