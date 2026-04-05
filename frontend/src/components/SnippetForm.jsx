import { useEffect, useState } from 'react';
import axiosInstance from '../axiosConfig';
import { useAuth } from '../context/AuthContext';

const defaultForm = { title: '', language: 'JavaScript', description: '', code: '' };

const SnippetForm = ({ snippets, setSnippets, editingSnippet, setEditingSnippet }) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState(defaultForm);

  useEffect(() => {
    if (editingSnippet) {
      setFormData({
        title: editingSnippet.title,
        language: editingSnippet.language,
        description: editingSnippet.description || '',
        code: editingSnippet.code,
      });
    } else {
      setFormData(defaultForm);
    }
  }, [editingSnippet]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (editingSnippet) {
        const response = await axiosInstance.put(`/api/snippets/${editingSnippet._id}`, formData, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setSnippets(snippets.map((snippet) => (snippet._id === response.data._id ? response.data : snippet)));
      } else {
        const response = await axiosInstance.post('/api/snippets', formData, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setSnippets((prev) => [response.data, ...prev]);
      }
      setEditingSnippet(null);
      setFormData(defaultForm);
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to save snippet.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-5 flex items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-slate-900">
            {editingSnippet ? 'Edit snippet' : 'Create new snippet'}
          </h2>
          <p className="mt-1 text-sm text-slate-500">Save reusable code for your project work.</p>
        </div>
        {editingSnippet && (
          <button
            type="button"
            onClick={() => setEditingSnippet(null)}
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700"
          >
            Cancel
          </button>
        )}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <input
          type="text"
          name="title"
          placeholder="Snippet title"
          value={formData.title}
          onChange={handleChange}
          className="rounded-lg border border-slate-300 p-3"
          required
        />
        <select
          name="language"
          value={formData.language}
          onChange={handleChange}
          className="rounded-lg border border-slate-300 p-3"
          required
        >
          {['JavaScript', 'Java', 'Python', 'C++', 'C#', 'PHP', 'SQL', 'HTML', 'CSS', 'Other'].map((language) => (
            <option key={language} value={language}>
              {language}
            </option>
          ))}
        </select>
      </div>

      <textarea
        name="description"
        placeholder="Short description"
        value={formData.description}
        onChange={handleChange}
        rows="3"
        className="mt-4 w-full rounded-lg border border-slate-300 p-3"
      />

      <textarea
        name="code"
        placeholder="Paste your code here"
        value={formData.code}
        onChange={handleChange}
        rows="12"
        className="mt-4 w-full rounded-lg border border-slate-300 p-3 font-mono text-sm"
        required
      />

      <button type="submit" className="mt-4 rounded-lg bg-slate-900 px-5 py-3 text-sm font-semibold text-white">
        {editingSnippet ? 'Update snippet' : 'Save snippet'}
      </button>
    </form>
  );
};

export default SnippetForm;
