import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [isAdmin, setIsAdmin] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    const result = await login(formData.username, formData.password, isAdmin);
    
    if (result.success) {
      // Redirect based on role
      window.location.href = isAdmin ? '/admin' : '/dashboard';
    } else {
      setError(result.error);
    }
    setLoading(false);
  };

  return (
    <div className="login-page">
      <div className="container">
        <div className="auth-form">
          <h1>Login {isAdmin ? 'as Admin' : ''}</h1>
          
          {error && (
            <div className="error-message">
              <strong>Error:</strong> {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Username</label>
              <input 
                type="text" 
                value={formData.username}
                onChange={(e) => setFormData({...formData, username: e.target.value})}
                required 
                disabled={loading}
              />
            </div>
            
            <div className="form-group">
              <label>Password</label>
              <input 
                type="password" 
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                required 
                disabled={loading}
              />
            </div>
            
            <div className="form-group">
             <label className="checkbox-label">
             <input
                type="checkbox"
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
                disabled={loading}
             />
              <span>Login as Admin</span>
              </label>
            </div>
            
            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <div className="auth-links">
            <p>Don't have an account? <Link to="/signup">Sign up here</Link></p>
            {!isAdmin && <p>Are you an admin? <a href="#" onClick={() => setIsAdmin(true)}>Admin login</a></p>}
            {isAdmin && <p>Not an admin? <a href="#" onClick={() => setIsAdmin(false)}>User login</a></p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;