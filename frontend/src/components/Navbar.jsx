import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const linkClass = 'rounded-lg px-3 py-2 text-sm font-medium transition hover:bg-slate-700';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="border-b border-slate-800 bg-slate-900 text-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link to={user ? '/snippets' : '/login'} className="text-xl font-bold tracking-tight">
          Code Snippet Manager
        </Link>

        <div className="flex items-center gap-2">
          {user ? (
            <>
              <Link to="/snippets" className={linkClass}>
                Snippet Manager
              </Link>
              {user.isAdmin && (
                <Link to="/admin" className={linkClass}>
                  Admin Dashboard
                </Link>
              )}
              <span className="hidden rounded-lg bg-slate-800 px-3 py-2 text-sm md:inline-block">
                {user.name}
              </span>
              <button
                onClick={handleLogout}
                className="rounded-lg bg-rose-500 px-3 py-2 text-sm font-medium transition hover:bg-rose-600"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className={linkClass}>
                Login
              </Link>
              <Link
                to="/register"
                className="rounded-lg bg-emerald-500 px-3 py-2 text-sm font-medium transition hover:bg-emerald-600"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
