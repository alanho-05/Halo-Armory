import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../components/AuthForm';
import AppContext from '../components/AppContext';

export default function AuthPage({ action }) {
  const navigate = useNavigate();
  const { user, handleSignIn } = useContext(AppContext);

  useEffect(() => {
    if (user) navigate('/');
  }, [user, navigate]);

  const welcomeMessage =
    action === 'sign-in'
      ? 'Please sign in to add to your cart'
      : 'Register now Spartan!';
  return (
    <div className="row pt-5 align-items-center">
      <div className="col-12 offset-0 col-sm-10 offset-sm-1 col-md-8 offset-md-2 col-xl-4 offset-xl-4">
        <header className="text-center">
          <h2 className="text-white mb-2">Spartan Registration</h2>
          <p className="text-white mb-4">{welcomeMessage}</p>
        </header>
        <div className="card p-3 ">
          <AuthForm key={action} action={action} onSignIn={handleSignIn} />
        </div>
      </div>
    </div>
  );
}
