'use client';
import { useState, useEffect } from 'react';

type ContentFile = {
  name: string;
  label: string;
  fields: { key: string; label: string; type: 'text' | 'textarea'; hint?: string }[];
};

const CONTENT_FILES: ContentFile[] = [
  {
    name: 'hero.json',
    label: 'Portada (Hero)',
    fields: [
      { key: 'title1', label: 'Título (parte 1)', type: 'text', hint: 'Ej: "Siéntete como"' },
      { key: 'title2', label: 'Título (parte 2)', type: 'text', hint: 'Ej: "en casa"' },
      { key: 'subtitle', label: 'Subtítulo', type: 'textarea' },
      { key: 'cta_book', label: 'Botón de reserva', type: 'text' },
      { key: 'cta_explore', label: 'Botón explorar', type: 'text' },
    ],
  },
  {
    name: 'about.json',
    label: 'Nosotros',
    fields: [
      { key: 'title', label: 'Título', type: 'text' },
      { key: 'p1', label: 'Párrafo 1', type: 'textarea' },
      { key: 'p2', label: 'Párrafo 2', type: 'textarea' },
      { key: 'p3', label: 'Párrafo 3', type: 'textarea' },
    ],
  },
  {
    name: 'fredy.json',
    label: 'Sr Fredy',
    fields: [
      { key: 'name', label: 'Nombre', type: 'text' },
      { key: 'role', label: 'Rol', type: 'text' },
      { key: 'tagline', label: 'Frase', type: 'text' },
      { key: 'bio', label: 'Biografía', type: 'textarea' },
      { key: 'photo', label: 'Foto (ruta)', type: 'text', hint: 'Ej: /owner-fredy-real.jpg' },
    ],
  },
  {
    name: 'monica.json',
    label: 'Sra Mónica',
    fields: [
      { key: 'name', label: 'Nombre', type: 'text' },
      { key: 'role', label: 'Rol', type: 'text' },
      { key: 'tagline', label: 'Frase', type: 'text' },
      { key: 'bio', label: 'Biografía', type: 'textarea' },
      { key: 'photo', label: 'Foto (ruta)', type: 'text', hint: 'Ej: /owner-monica-real.jpg' },
    ],
  },
  {
    name: 'contact.json',
    label: 'Contacto',
    fields: [
      { key: 'whatsapp', label: 'WhatsApp', type: 'text', hint: 'Ej: +57 300 310 0299' },
      { key: 'instagram', label: 'Instagram', type: 'text' },
      { key: 'address', label: 'Dirección', type: 'text' },
    ],
  },
];

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [activeFile, setActiveFile] = useState<ContentFile | null>(null);
  const [content, setContent] = useState<Record<string, any> | null>(null);
  const [sha, setSha] = useState('');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState('');

  // Check if already authed (sessionStorage)
  useEffect(() => {
    const stored = sessionStorage.getItem('cm-admin-authed');
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (stored === '1') setAuthed(true);
  }, []);

  function login(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    // Test auth by trying to read a file
    fetch('/api/admin/content?file=hero.json', {
      headers: { 'X-Admin-Password': password },
    })
      .then(async res => {
        const data = await res.json().catch(() => ({}));
        if (!res.ok) {
          throw new Error(data.error || `Login failed (HTTP ${res.status})`);
        }
        return data;
      })
      .then(() => {
        sessionStorage.setItem('cm-admin-password', password);
        sessionStorage.setItem('cm-admin-authed', '1');
        setAuthed(true);
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }

  function logout() {
    sessionStorage.removeItem('cm-admin-password');
    sessionStorage.removeItem('cm-admin-authed');
    setAuthed(false);
    setPassword('');
    setActiveFile(null);
    setContent(null);
  }

  function loadFile(file: ContentFile) {
    setLoading(true);
    setError('');
    const pw = sessionStorage.getItem('cm-admin-password') || '';
    fetch(`/api/admin/content?file=${file.name}`, {
      headers: { 'X-Admin-Password': pw },
    })
      .then(res => {
        if (res.status === 401) {
          // Password no longer valid — log out
          logout();
          throw new Error('Session expired. Please log in again.');
        }
        return res.json();
      })
      .then(data => {
        if (data.error) throw new Error(data.error);
        setContent(data.content);
        setSha(data.sha);
        setActiveFile(file);
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }

  function saveFile() {
    if (!activeFile || !content) return;
    setSaving(true);
    setSaveMsg('');
    const pw = sessionStorage.getItem('cm-admin-password') || '';
    fetch('/api/admin/content', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        password: pw,
        file: activeFile.name,
        content,
        sha,
      }),
    })
      .then(res => res.json())
      .then(data => {
        if (data.error) throw new Error(data.error);
        setSha(data.sha);
        setSaveMsg('✓ Guardado. Vercel desplegará en ~60 segundos.');
      })
      .catch(err => setSaveMsg(`✗ Error: ${err.message}`))
      .finally(() => setSaving(false));
  }

  // === LOGIN SCREEN ===
  if (!authed) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #FDF6E8 0%, #F4E6C8 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Georgia, serif',
        padding: '1rem',
      }}>
        <div style={{
          background: 'white',
          padding: '2rem',
          borderRadius: '1rem',
          boxShadow: '0 20px 60px rgba(61,40,23,0.2)',
          width: '100%',
          maxWidth: '400px',
          textAlign: 'center',
        }}>
          <img src="/casa-monica-logo.png" alt="Casa Mónica"
            style={{ width: '64px', height: '64px', margin: '0 auto 1rem', display: 'block' }} />
          <h1 style={{ color: '#C8542A', fontSize: '1.5rem', margin: '0 0 0.5rem' }}>Editor Casa Mónica</h1>
          <p style={{ color: '#7A5A35', fontSize: '0.875rem', margin: '0 0 1.5rem' }}>
            Ingresa la contraseña para editar el contenido del sitio.
          </p>
          <form onSubmit={login}>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Contraseña"
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                border: '1px solid #E6D2B0',
                borderRadius: '0.5rem',
                fontSize: '1rem',
                marginBottom: '1rem',
                boxSizing: 'border-box',
              }}
              autoFocus
            />
            <button type="submit"
              style={{
                width: '100%',
                padding: '0.75rem',
                background: '#C8542A',
                color: 'white',
                border: 'none',
                borderRadius: '0.5rem',
                fontSize: '1rem',
                fontWeight: 600,
                cursor: 'pointer',
              }}>
              Entrar
            </button>
          </form>
          {error && (
            <p style={{ color: '#B22222', fontSize: '0.875rem', marginTop: '1rem' }}>{error}</p>
          )}
          <a href="/" style={{
            display: 'inline-block',
            marginTop: '1.5rem',
            color: '#7A5A35',
            fontSize: '0.875rem',
            textDecoration: 'none',
          }}>← Volver al sitio</a>
        </div>
      </div>
    );
  }

  // === EDITOR ===
  return (
    <div style={{
      minHeight: '100vh',
      background: '#FDF6E8',
      fontFamily: 'Georgia, serif',
      padding: '2rem 1rem',
    }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '2rem',
          flexWrap: 'wrap',
          gap: '1rem',
        }}>
          <div>
            <h1 style={{ color: '#C8542A', margin: 0, fontSize: '1.5rem' }}>Editor Casa Mónica</h1>
            <p style={{ color: '#7A5A35', margin: 0, fontSize: '0.875rem' }}>
              Edita el contenido — los cambios van a GitHub y Vercel los despliega automáticamente.
            </p>
          </div>
          <button onClick={logout}
            style={{
              padding: '0.5rem 1rem',
              background: 'transparent',
              color: '#7A5A35',
              border: '1px solid #E6D2B0',
              borderRadius: '0.5rem',
              cursor: 'pointer',
              fontSize: '0.875rem',
            }}>
            Cerrar sesión
          </button>
        </div>

        {/* File selector */}
        <div style={{
          display: 'flex',
          gap: '0.5rem',
          marginBottom: '2rem',
          flexWrap: 'wrap',
        }}>
          {CONTENT_FILES.map(f => (
            <button
              key={f.name}
              onClick={() => loadFile(f)}
              style={{
                padding: '0.5rem 1rem',
                background: activeFile?.name === f.name ? '#C8542A' : 'white',
                color: activeFile?.name === f.name ? 'white' : '#3D2817',
                border: '1px solid #E6D2B0',
                borderRadius: '999px',
                cursor: 'pointer',
                fontSize: '0.875rem',
                fontWeight: 500,
              }}
            >
              {f.label}
            </button>
          ))}
        </div>

        {error && (
          <div style={{
            background: '#FEE',
            color: '#B22222',
            padding: '1rem',
            borderRadius: '0.5rem',
            marginBottom: '1rem',
          }}>
            {error}
          </div>
        )}

        {loading && (
          <div style={{ textAlign: 'center', padding: '2rem', color: '#7A5A35' }}>
            Cargando…
          </div>
        )}

        {/* Editor form */}
        {activeFile && content && !loading && (
          <div style={{
            background: 'white',
            padding: '2rem',
            borderRadius: '1rem',
            boxShadow: '0 4px 12px rgba(61,40,23,0.1)',
          }}>
            <h2 style={{ color: '#3D2817', marginTop: 0, marginBottom: '1.5rem' }}>
              {activeFile.label}
            </h2>
            {activeFile.fields.map(field => (
              <div key={field.key} style={{ marginBottom: '1.25rem' }}>
                <label style={{
                  display: 'block',
                  color: '#3D2817',
                  fontWeight: 600,
                  marginBottom: '0.5rem',
                  fontSize: '0.875rem',
                }}>
                  {field.label}
                </label>
                {field.hint && (
                  <p style={{ color: '#7A5A35', fontSize: '0.75rem', margin: '0 0 0.5rem' }}>
                    {field.hint}
                  </p>
                )}
                {field.type === 'textarea' ? (
                  <textarea
                    value={content[field.key] || ''}
                    onChange={e => setContent({ ...content, [field.key]: e.target.value })}
                    rows={4}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid #E6D2B0',
                      borderRadius: '0.5rem',
                      fontSize: '0.875rem',
                      fontFamily: 'inherit',
                      resize: 'vertical',
                      boxSizing: 'border-box',
                    }}
                  />
                ) : (
                  <input
                    type="text"
                    value={content[field.key] || ''}
                    onChange={e => setContent({ ...content, [field.key]: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid #E6D2B0',
                      borderRadius: '0.5rem',
                      fontSize: '0.875rem',
                      boxSizing: 'border-box',
                    }}
                  />
                )}
              </div>
            ))}
            <button
              onClick={saveFile}
              disabled={saving}
              style={{
                padding: '0.75rem 2rem',
                background: '#C8542A',
                color: 'white',
                border: 'none',
                borderRadius: '0.5rem',
                fontSize: '1rem',
                fontWeight: 600,
                cursor: saving ? 'not-allowed' : 'pointer',
                opacity: saving ? 0.6 : 1,
              }}
            >
              {saving ? 'Guardando…' : 'Guardar cambios'}
            </button>
            {saveMsg && (
              <p style={{
                marginTop: '1rem',
                padding: '0.75rem',
                background: saveMsg.startsWith('✓') ? '#E8F5E9' : '#FEE',
                color: saveMsg.startsWith('✓') ? '#2E7D32' : '#B22222',
                borderRadius: '0.5rem',
                fontSize: '0.875rem',
              }}>
                {saveMsg}
              </p>
            )}
          </div>
        )}

        {/* Footer */}
        <div style={{
          marginTop: '2rem',
          textAlign: 'center',
          color: '#7A5A35',
          fontSize: '0.75rem',
        }}>
          <a href="/" style={{ color: '#C8542A', textDecoration: 'none' }}>← Volver al sitio</a>
          <span style={{ margin: '0 0.5rem' }}>·</span>
          <span>Los cambios se guardan en GitHub</span>
        </div>
      </div>
    </div>
  );
}
