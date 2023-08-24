import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signUpOrIn } from '../lib';

export default function AuthForm({ action, onSignIn }) {
  const navigate = useNavigate();
  const [error, setError] = useState();

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const { username, password } = Object.fromEntries(formData.entries());
    try {
      const result = await signUpOrIn(action, username, password);
      if (action === 'sign-up') {
        navigate('/sign-in');
      } else if (result.user && result.token) {
        onSignIn(result);
      }
    } catch (err) {
      setError(err);
    }
  }

  async function demoAccount() {
    const result = await signUpOrIn('sign-in', 'spartan', '117');
    onSignIn(result);
  }

  const alternateActionTo = action === 'sign-up' ? '/sign-in' : '/sign-up';
  const alternateActionText =
    action === 'sign-up' ? 'Sign In Here' : 'Register Now';
  const submitButtonText = action === 'sign-up' ? 'Register' : 'Log In';
  return (
    <form className="w-100" onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label">
          Username:
          <input
            required
            autoFocus
            type="text"
            name="username"
            className="form-control bg-light"
          />
        </label>
      </div>
      <div className="mb-3">
        <label className="form-label">
          Password:
          <input
            required
            type="password"
            name="password"
            className="form-control bg-light"
          />
        </label>
      </div>
      <div className="d-flex justify-content-between align-items-center">
        <small>
          <Link className="text-muted" to={alternateActionTo}>
            {alternateActionText}
          </Link>
        </small>
        {action === 'sign-in' ? (
          <small
            className="text-muted text-decoration-underline me-auto ms-4"
            role="button"
            onClick={demoAccount}>
            Use Demo Account
          </small>
        ) : null}
        <button type="submit" className="btn btn-primary">
          {submitButtonText}
        </button>
      </div>
      {error && <div style={{ color: 'red' }}>Error: {error.message}</div>}
    </form>
  );
}
