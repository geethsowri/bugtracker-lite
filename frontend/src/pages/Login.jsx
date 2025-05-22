import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Login({ setToken }) {
  const [form, setForm] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', form);
      localStorage.setItem('token', res.data.token);
      setToken(res.data.token);
      navigate('/dashboard');
    } catch {
      alert('Login failed');
    }
  };

  return (
    <div className="p-4 max-w-sm mx-auto">
      <h2 className="text-xl font-bold mb-4">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="username" onChange={handleChange} placeholder="Username" className="w-full p-2 border" />
        <input name="password" onChange={handleChange} type="password" placeholder="Password" className="w-full p-2 border" />
        <button type="submit" className="w-full bg-blue-600 text-white p-2">Login</button>
      </form>
    </div>
  );
}
