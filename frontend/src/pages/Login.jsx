import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axiosInstance from '../axiosConfig';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await axiosInstance.post('/api/auth/login', formData);
      login(response.data);
      navigate(response.data.isAdmin ? '/admin' : '/snippets');
    } catch (error) {
      alert(error.response?.data?.message || 'Login failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto mt-16 grid max-w-5xl gap-8 px-6 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="rounded-3xl bg-slate-900 p-10 text-white shadow-lg">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-300">Code Snippet Manager</p>
        <h1 className="mt-5 text-4xl font-bold leading-tight">Store, organise, and manage your code snippets in one place.</h1>
        <p className="mt-5 max-w-xl text-slate-300">
          This MERN-based assignment project includes user authentication, CRUD operations for snippets, and an admin dashboard for platform monitoring.
        </p>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {['Register securely', 'Create and update snippets', 'Monitor users in admin dashboard'].map((item) => (
            <div key={item} className="rounded-2xl bg-slate-800/90 p-4 text-sm text-slate-200">
              {item}
            </div>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <h2 className="mb-2 text-3xl font-bold text-slate-900">Login</h2>
        <p className="mb-6 text-sm text-slate-500">Use your account to access the snippet manager.</p>
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="mb-4 w-full rounded-lg border border-slate-300 p-3"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          className="mb-4 w-full rounded-lg border border-slate-300 p-3"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-slate-900 p-3 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
        <p className="mt-4 text-sm text-slate-500">
          New user?{' '}
          <Link to="/register" className="font-semibold text-slate-900 underline">
            Create an account
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
