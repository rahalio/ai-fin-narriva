/** Local demo session for operator console. */

const SESSION_KEY = 'narriva.demo.session';

export interface DemoSession {
  signedIn: boolean;
  displayName: string;
  role: string;
  signedInAt: string;
}

export function getDemoSession(): DemoSession | null {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as DemoSession;
  } catch {
    return null;
  }
}

export function signInDemo(): DemoSession {
  const session: DemoSession = {
    signedIn: true,
    displayName: 'Demo Operator',
    role: 'reporting_lead',
    signedInAt: new Date().toISOString(),
  };
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  return session;
}

export function signOutDemo(): void {
  localStorage.removeItem(SESSION_KEY);
}
