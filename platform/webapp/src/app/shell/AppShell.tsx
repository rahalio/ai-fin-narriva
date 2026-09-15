import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { signOutDemo, type DemoSession } from '../session';
import './AppShell.css';

const NAV = [
  { to: '/runs', label: 'Runs' },
  { to: '/snapshots', label: 'Snapshots' },
  { to: '/templates', label: 'Templates' },
  { to: '/drafts', label: 'Drafts' },
  { to: '/review', label: 'Review' },
  { to: '/deliveries', label: 'Deliveries' },
  { to: '/archive', label: 'Archive' },
  { to: '/reproduce', label: 'Reproduce' },
  { to: '/analytics', label: 'Analytics' },
];

interface Props {
  session: DemoSession;
}

export function AppShell({ session }: Props) {
  const navigate = useNavigate();
  return (
    <div className="shell">
      <header className="shell-masthead">
        <div className="shell-masthead-inner">
          <div className="shell-brand">
            <span className="shell-wordmark">Narriva</span>
            <span className="shell-tag">Client narratives bound to locked facts</span>
          </div>
          <div className="shell-operator">
            <span>{session.displayName}</span>
            <button
              type="button"
              className="btn btn-ghost shell-signout"
              onClick={() => {
                signOutDemo();
                navigate('/login');
              }}
            >
              Sign out
            </button>
          </div>
        </div>
        <nav className="shell-nav" aria-label="Primary">
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                isActive ? 'shell-nav-link is-active' : 'shell-nav-link'
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </header>
      <main className="shell-main">
        <Outlet />
      </main>
    </div>
  );
}
