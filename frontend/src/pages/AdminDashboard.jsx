import { useEffect, useState } from 'react';
import axiosInstance from '../axiosConfig';
import { useAuth } from '../context/AuthContext';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchDashboard = async () => {
    try {
      const response = await axiosInstance.get('/api/admin/dashboard', {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setDashboard(response.data);
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to load dashboard.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const deleteUser = async (userId) => {
    const confirmed = window.confirm('Delete this user and all of their snippets?');
    if (!confirmed) return;

    try {
      await axiosInstance.delete(`/api/admin/users/${userId}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      fetchDashboard();
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to delete user.');
    }
  };

  if (loading) {
    return <div className="mx-auto mt-16 max-w-6xl px-6">Loading dashboard...</div>;
  }

  if (!dashboard) {
    return <div className="mx-auto mt-16 max-w-6xl px-6">Dashboard data is unavailable.</div>;
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-8">
      <div className="rounded-3xl bg-white p-6 shadow-sm">
        <h1 className="text-3xl font-bold text-slate-900">Admin Dashboard</h1>
        <p className="mt-2 text-slate-600">Track users and code snippets across the whole application.</p>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl bg-slate-900 p-6 text-white shadow-sm">
          <p className="text-sm uppercase tracking-wide text-slate-300">Total users</p>
          <p className="mt-3 text-4xl font-bold">{dashboard.summary.totalUsers}</p>
        </div>
        <div className="rounded-2xl bg-emerald-500 p-6 text-white shadow-sm">
          <p className="text-sm uppercase tracking-wide text-emerald-100">Total snippets</p>
          <p className="mt-3 text-4xl font-bold">{dashboard.summary.totalSnippets}</p>
        </div>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">Recent users</h2>
          <div className="mt-4 space-y-4">
            {dashboard.recentUsers.length ? (
              dashboard.recentUsers.map((item) => (
                <div key={item._id} className="rounded-xl border border-slate-200 p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-semibold text-slate-900">{item.name}</p>
                      <p className="text-sm text-slate-500">{item.email}</p>
                      <p className="mt-1 text-xs text-slate-400">{item.isAdmin ? 'Admin' : 'User'}</p>
                    </div>
                    {!item.isAdmin && (
                      <button
                        onClick={() => deleteUser(item._id)}
                        className="rounded-lg bg-rose-500 px-3 py-2 text-xs font-semibold text-white"
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-slate-500">No users found.</p>
            )}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">Recent snippets</h2>
          <div className="mt-4 space-y-4">
            {dashboard.recentSnippets.length ? (
              dashboard.recentSnippets.map((item) => (
                <div key={item._id} className="rounded-xl border border-slate-200 p-4">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="font-semibold text-slate-900">{item.title}</p>
                      <p className="text-sm text-slate-500">{item.language}</p>
                      <p className="mt-1 text-xs text-slate-400">
                        {item.owner?.name} ({item.owner?.email})
                      </p>
                    </div>
                    <span className="text-xs text-slate-400">{new Date(item.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-slate-500">No snippets found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
