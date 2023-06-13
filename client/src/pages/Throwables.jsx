import { useEffect, useState } from 'react';
import { fetchProducts } from '../lib';
import Catalog from '../components/Catalog';

export default function Throwables() {
  const [products, setProducts] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    async function loadProducts() {
      try {
        const products = await fetchProducts('throwables');
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
    <div className="card-deck">
      <Catalog products={products} />
    </div>
  );
}
