export async function fetchProducts(category) {
  const res = await fetch(`/api/products/${category}`);
  if (!res.ok) throw new Error(`fetch Error ${res.status}`);
  return await res.json();
}
