export async function fetchCategory(category) {
  const res = await fetch(`/api/products/${category}`);
  if (!res.ok) throw new Error(`fetch Error ${res.status}`);
  return await res.json();
}

export async function fetchProduct(productId) {
  const res = await fetch(`/api/products/${productId}`);
  if (!res.ok) throw new Error(`fetch Error ${res.status}`);
  return await res.json();
}

export async function fetchCart(userId) {
  const res = await fetch(`/api/cart/${userId}`);
  if (!res.ok) throw new Error(`fetch Error ${res.status}`);
  return await res.json();
}

export async function signIn(username, password) {
  return await signUpOrIn('sign-in', username, password);
}

export async function signUp(username, password) {
  return await signUpOrIn('sign-up', username, password);
}

export async function signUpOrIn(action, username, password) {
  const req = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  };
  const res = await fetch(`/api/auth/${action}`, req);
  if (!res.ok) throw new Error(`fetch Error ${res.status}`);
  return await res.json();
}
