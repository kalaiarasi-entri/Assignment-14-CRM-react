import React, { useState } from 'react';
import { register } from '../api/userApi';
import { useNavigate } from 'react-router-dom';

export default function Register(){
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [err, setErr] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Check password match before sending request
    if (password !== confirmPassword) {
      setErr("Passwords do not match");
      return;
    }
    try {
      // only role 'user' allowed; backend will accept role if present but we set it as 'user'
      await register({ username, email, password, role: 'user' });
      navigate('/login');
    } catch (error) {
      setErr(error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="max-w-md mx-auto card">
      <h2 className="text-xl font-semibold mb-4">Register</h2>
      {err && <div className="text-red-500 mb-2">{err}</div>}
      <form onSubmit={handleSubmit} className="space-y-3">
        <input className="input" placeholder="Name" value={username} onChange={e=>setUsername(e.target.value)} />
        <input className="input" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <input className="input" placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
        <input
          className="input"
          placeholder="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
        />
        <div className="flex justify-end">
          <button className="btn bg-green-600">Register</button>
        </div>
      </form>
    </div>
  );
}
