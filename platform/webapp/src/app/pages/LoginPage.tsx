import { useNavigate } from 'react-router-dom';
import { signInDemo } from '../session';
import './LoginPage.css';

export function LoginPage() {
  const navigate = useNavigate();
  return (
    <div className="login">
      <div className="login-panel">
        <p className="login-brand">Narriva</p>
        <h1>Client narratives bound to locked facts</h1>
        <p className="login-lede">
          Operator console for period letters, claim-cited drafts, and immutable delivery archives.
        </p>
        <button
          type="button"
          className="btn login-cta"
          onClick={() => {
            signInDemo();
            navigate('/runs');
          }}
        >
          Sign in
        </button>
      </div>
    </div>
  );
}
