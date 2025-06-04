import { useState } from 'react';

import { useAuth } from '../hooks/use-auth';
import { useNavigate } from 'react-router-dom';
import '../css/login.css'



const LoginPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const { login, loading, error, clearError } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearError();
    
    const result = await login(formData.username, formData.password);
    
    if (result.success) {
      navigate('/admin');
    }
  };

  return (

            <form onSubmit={handleSubmit} className='container'>
          {error && (
            <div style={{ color: 'red', marginBottom: '1rem' }}>
              {error}
            </div>
          )}
          <h1 style={{color:'black'}}>connectez vous ! </h1>
            <div  className='input-taille2'>
              <input
            type="text"
            name="username"
            className='input-taille'
            value={formData.username}
            onChange={(e) => setFormData({...formData, username: e.target.value})}
            placeholder="Username"
            required
          />
          
          <input
            type="password"
            name="password"
            className='input-taille'
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            placeholder="Password"
            required
          />
            </div>
          <div>
            <button type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
            </button>
          </div>

        </form>

  );
};

export default LoginPage