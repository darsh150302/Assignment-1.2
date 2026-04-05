import axiosInstance from '../axiosConfig';
import { useAuth } from '../context/AuthContext';

const SnippetList = ({ snippets, setSnippets, setEditingSnippet }) => {
  const { user } = useAuth();

  const handleDelete = async (snippetId) => {
    const confirmed = window.confirm('Delete this snippet?');
    if (!confirmed) return;

    try {
      await axiosInstance.delete(`/api/snippets/${snippetId}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setSnippets((prev) => prev.filter((snippet) => snippet._id !== snippetId));
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to delete snippet.');
    }
  };

  if (!snippets.length) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center text-slate-500">
        No snippets yet. Create your first code snippet above.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {snippets.map((snippet) => (
        <div key={snippet._id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
            <div>
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <h3 className="text-xl font-semibold text-slate-900">{snippet.title}</h3>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-600">
                  {snippet.language}
                </span>
              </div>
              {snippet.description && <p className="mb-3 text-slate-600">{snippet.description}</p>}
              {user.isAdmin && snippet.owner && (
                <p className="mb-3 text-xs text-slate-500">
                  Owner: {snippet.owner.name} ({snippet.owner.email})
                </p>
              )}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setEditingSnippet(snippet)}
                className="rounded-lg bg-amber-400 px-4 py-2 text-sm font-medium text-slate-900"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(snippet._id)}
                className="rounded-lg bg-rose-500 px-4 py-2 text-sm font-medium text-white"
              >
                Delete
              </button>
            </div>
          </div>

          <pre className="mt-4 overflow-x-auto rounded-xl bg-slate-950 p-4 text-sm text-slate-100">
            <code>{snippet.code}</code>
          </pre>
          <p className="mt-3 text-xs text-slate-400">
            Updated: {new Date(snippet.updatedAt).toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
};

export default SnippetList;
