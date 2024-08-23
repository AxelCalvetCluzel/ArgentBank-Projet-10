import React, { useState, } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../Header';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const response = await axios.post('http://localhost:3001/api/v1/user/login', {
        email,
        password,
      });

      // Si la connexion est réussie
      setSuccess(true);
      setLoading(false);

      // Enregistrer le token dans le localStorage
      localStorage.setItem('token', response.data.token);

      // Rediriger l'utilisateur vers la page /user
      navigate('/user');
      
    } catch (err) {
      setLoading(false);
      setError('Invalid email or password. Please try again.');
    }
  };

  return (
    <>
      <Header />
      <main className="main bg-dark">
        <section className="sign-in-content">
          <i className="fa fa-user-circle sign-in-icon"></i>
          <h1>Sign In</h1>

          {error && <p className="error-message">{error}</p>}
          {success && <p className="success-message">Login Successful!</p>}
          
          <form onSubmit={handleSubmit}>
            <div className="input-wrapper">
              <label htmlFor="email">Email</label>
              <input 
                type="email" 
                id="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
              />
            </div>
            <div className="input-wrapper">
              <label htmlFor="password">Password</label>
              <input 
                type="password" 
                id="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
              />
            </div>
            <div className="input-remember">
              <input 
                type="checkbox" 
                id="remember-me" 
              />
              <label htmlFor="remember-me">Remember me</label>
            </div>
            <button 
              type="submit"
              className="sign-in-button"
              disabled={loading}
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>
        </section>
      </main>
    </>
  );
};

export default Login;
