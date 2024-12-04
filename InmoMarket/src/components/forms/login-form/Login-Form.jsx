// LoginForm.jsx
import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import { AuthContext } from "../../../contexts/AuthContext";

const url = "https://inmomarket.me/api/v1";

export default function LoginForm() {
  const navigate = useNavigate();
  const { user, handleSaveToken, handleSaveUser } = useContext(AuthContext);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  useEffect(() => {
    // Verificar si hay un token o usuario en la URL (después del callback de Google)
    const queryParams = new URLSearchParams(window.location.search);
    const token = queryParams.get('token');
    const userData = queryParams.get('user');

    if (token && userData) {
      try {
        handleSaveToken(token);
        handleSaveUser(JSON.parse(decodeURIComponent(userData)));
        navigate('/home');
      } catch (err) {
        setError('Error processing login data');
        console.error('Error during authentication:', err);
      }
    }
  }, [handleSaveToken, handleSaveUser, navigate]);

  useEffect(() => {
    if (user) {
      navigate("/home");
    }
  }, [user, navigate]);

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      setError(null);
      window.location.href = `${url}/auth/google`;
    } catch (err) {
      setError('Error initiating Google login');
      console.error('Error initiating Google login:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white px-10 py-20 rounded-3xl border-2 border-gray-100">
      <h1 className="text-7xl font-bold mb-16">Welcome back!</h1>
      <img src="/inmomarket.jpg" alt="logo" />
      <p className="text-xl font-medium text-gray-500 my-8">
        to keep connected with us please login with your Google account
      </p>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <button
        onClick={handleGoogleLogin}
        disabled={loading}
        className={`
          flex items-center justify-center gap-5 text-xl font-bold py-3 
          bg-secondary-green text-background-color w-full rounded-xl 
          active:scale-[.98] transition-all hover:scale-[1.01]
          ${loading ? 'opacity-50 cursor-not-allowed' : ''}
        `}
      >
        <FaGoogle className="w-8 h-8" />
        {loading ? 'REDIRECTING...' : 'CONTINUE WITH GOOGLE'}
      </button>
    </div>
  );
}