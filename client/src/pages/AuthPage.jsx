import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../components/AuthForm';
import AppContext from '../components/AppContext';

export default function AuthPage({ action }) {
  const navigate = useNavigate();
  const { user, handleSignIn } = useContext(AppContext);

  useEffect(() => {
    if (user) navigate('/weapons');
  }, [user, navigate]);

  const welcomeMessage =
    action === 'sign-in'
      ? 'Please sign in to start shopping'
      : 'Register now Spartan!';
  return (
    <div className="pt-5 align-items-center">
      <div className="col-sm-10 offset-sm-1 col-md-6 offset-md-3">
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
