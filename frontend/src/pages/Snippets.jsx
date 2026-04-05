import { useEffect, useState } from 'react';
import axiosInstance from '../axiosConfig';
import SnippetForm from '../components/SnippetForm';
import SnippetList from '../components/SnippetList';
import { useAuth } from '../context/AuthContext';

const Snippets = () => {
  const { user } = useAuth();
  const [snippets, setSnippets] = useState([]);
  const [editingSnippet, setEditingSnippet] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSnippets = async () => {
      try {
        const response = await axiosInstance.get('/api/snippets', {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setSnippets(response.data);
      } catch (error) {
        alert(error.response?.data?.message || 'Failed to fetch snippets.');
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchSnippets();
    }
  }, [user]);

  return (
    <div className="mx-auto max-w-6xl px-6 py-8">
      <div className="mb-8 flex flex-col gap-4 rounded-3xl bg-white p-6 shadow-sm md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">{user.isAdmin ? 'Snippet Manager' : 'My Snippets'}</h1>
          <p className="mt-2 text-slate-600">Create, read, update, and delete code snippets for your project.</p>
        </div>
        <div className="rounded-2xl bg-slate-100 px-5 py-4 text-sm text-slate-600">
          Signed in as <span className="font-semibold text-slate-900">{user.name}</span>
        </div>
      </div>

      {loading ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-slate-500 shadow-sm">Loading snippets...</div>
      ) : (
        <div className="grid gap-8 lg:grid-cols-[1.05fr_1.2fr]">
          <SnippetForm
            snippets={snippets}
            setSnippets={setSnippets}
            editingSnippet={editingSnippet}
            setEditingSnippet={setEditingSnippet}
          />
          <SnippetList snippets={snippets} setSnippets={setSnippets} setEditingSnippet={setEditingSnippet} />
        </div>
      )}
    </div>
  );
};

export default Snippets;
