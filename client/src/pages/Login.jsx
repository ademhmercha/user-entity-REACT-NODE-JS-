import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../api/auth';

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [status, setStatus] = useState({ loading: false, error: '' });

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, error: '' });

    try {
      await loginUser(form);
      // JWT cookie is set by the server; redirect to a protected page
      navigate('/me');
    } catch (err) {
      setStatus({
        loading: false,
        error: err.response?.data?.message || 'Login failed. Please try again.',
      });
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Welcome back</h2>

        {status.error && <p style={styles.error}>{status.error}</p>}

        <form onSubmit={handleSubmit} style={styles.form}>
          <label style={styles.label}>Email</label>
          <input
            name="email"
            type="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={handleChange}
            required
            style={styles.input}
          />

          <label style={styles.label}>Password</label>
          <input
            name="password"
            type="password"
            placeholder="Your password"
            value={form.password}
            onChange={handleChange}
            required
            style={styles.input}
          />

          <div style={{ textAlign: 'right', marginTop: -4 }}>
            <Link to="/forgot-password" style={{ fontSize: 13, color: '#4F46E5' }}>
              Forgot password?
            </Link>
          </div>

          <button type="submit" disabled={status.loading} style={styles.button}>
            {status.loading ? 'Logging in…' : 'Log In'}
          </button>
        </form>

        <p style={styles.footer}>
          No account? <Link to="/register">Sign up</Link>
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: { display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: '#f3f4f6' },
  card: { background: '#fff', borderRadius: 10, padding: '40px 36px', width: '100%', maxWidth: 420, boxShadow: '0 4px 20px rgba(0,0,0,0.08)' },
  title: { marginBottom: 24, fontSize: 24, fontWeight: 700, color: '#111' },
  form: { display: 'flex', flexDirection: 'column', gap: 12 },
  label: { fontSize: 14, fontWeight: 600, color: '#374151' },
  input: { padding: '10px 14px', borderRadius: 6, border: '1px solid #d1d5db', fontSize: 14, outline: 'none' },
  button: { marginTop: 8, padding: '12px', background: '#4F46E5', color: '#fff', border: 'none', borderRadius: 6, fontSize: 15, fontWeight: 600, cursor: 'pointer' },
  error: { background: '#fee2e2', color: '#991b1b', padding: '10px 14px', borderRadius: 6, marginBottom: 12, fontSize: 14 },
  footer: { marginTop: 20, textAlign: 'center', fontSize: 14, color: '#6b7280' },
};
