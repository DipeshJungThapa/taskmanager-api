import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (!user) return null;

  const userInitials = user.username
    ? user.username.substring(0, 2).toUpperCase()
    : "U";

  return (
    <nav style={{
      borderBottom: '1px solid var(--color-border)',
      backgroundColor: 'var(--color-bg-primary)',
      padding: '1rem 0',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      boxShadow: 'var(--shadow-sm)'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 1.5rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <Link
          to="/"
          style={{
            fontSize: '1.5rem',
            fontWeight: '700',
            color: 'var(--color-text-primary)',
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}
        >
          📋 TaskManager
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.5rem 0.75rem',
            borderRadius: 'var(--radius-md)',
            backgroundColor: 'var(--color-bg-secondary)'
          }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              backgroundColor: 'var(--color-primary)',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: '600',
              fontSize: '0.75rem'
            }}>
              {userInitials}
            </div>
            <span style={{
              fontSize: '0.875rem',
              fontWeight: '500',
              color: 'var(--color-text-primary)'
            }}>
              {user.username}
            </span>
          </div>

          <Link to="/projects/new" style={{ textDecoration: 'none' }}>
            <button className="btn btn-primary" style={{ fontSize: '0.875rem', padding: '0.5rem 1rem' }}>
              + New Project
            </button>
          </Link>

          <button
            onClick={handleLogout}
            className="btn btn-secondary"
            style={{ fontSize: '0.875rem', padding: '0.5rem 1rem' }}
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
