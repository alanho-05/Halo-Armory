import { useEffect, useState } from 'react';
import { fetchCategory } from '../lib';
import Catalog from '../components/Catalog';

export default function Throwables() {
  const [products, setProducts] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    async function loadProducts() {
      try {
        const products = await fetchCategory('throwables');
        setProducts(products);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    }
    setIsLoading(true);
    loadProducts();
  }, []);
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error Loading Products: {error.message}</div>;
  return (
    <section className="container">
      <div className="d-flex justify-content-center my-3">
        <img
          src="https://halo.wiki.gallery/images/c/cb/M9_HEDP.png"
          alt="Throwables"
        />
      </div>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {products?.map((product) => (
          <div
            key={product.productId}
            className="col-lg-4 mb-3 d-flex align-items-stretch">
            <Catalog product={product} />
          </div>
        ))}
      </div>
    </section>
  );
}
