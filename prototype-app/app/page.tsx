'use client';

import { FormEvent, useMemo, useState } from 'react';

type Step = 1 | 2 | 3 | 4;
type DeliveryResult = 'entregada' | 'no-entregada' | '';
type Page = 'entrega' | 'historial' | 'usuarios' | 'roles';

// El hub vive en la URL principal del deploy. En local corre aparte con `node tools/dev-server.js`.
const HUB_URL_PROD = 'https://entrega-hh-suc-v1.vercel.app';
const HUB_URL_LOCAL = 'http://localhost:5173';

function getHubUrl() {
  if (typeof window !== 'undefined' && /^(localhost|127\.0\.0\.1)$/.test(window.location.hostname)) {
    return HUB_URL_LOCAL;
  }
  return HUB_URL_PROD;
}

function getHubLinks() {
  const base = getHubUrl();
  return [
    { label: 'Centro del proyecto', href: `${base}/`, tag: null as 'actual' | 'pendiente' | null },
    { label: 'Prototipo navegable', href: '#', tag: 'actual' as 'actual' | 'pendiente' | null },
    { label: 'Flujo de navegación', href: `${base}/hub/flujo.html`, tag: 'pendiente' as 'actual' | 'pendiente' | null },
    { label: 'Presentación', href: `${base}/hub/presentacion.html`, tag: 'pendiente' as 'actual' | 'pendiente' | null },
    { label: 'Documentación', href: `${base}/hub/documentacion.html`, tag: 'pendiente' as 'actual' | 'pendiente' | null },
  ];
}

const demoPiece = {
  code: 'CP-AR-008741925',
  product: 'Encomienda nacional',
  recipient: 'María Fernández',
  address: 'Av. Rivadavia 3250, CABA',
  branch: 'Sucursal 018 — Caballito',
  stockSince: '22/08/2026 · 09:42',
};

const UNIDADES_NEGOCIO = [
  'Sucursal 018 — Caballito',
  'Sucursal 004 — Belgrano',
  'Sucursal 032 — San Isidro',
  'Sucursal 011 — La Plata',
  'Sucursal 007 — Rosario Centro',
];

const PERMISOS_DISPONIBLES = [
  'Gestionar entregas',
  'Ver historial',
  'Administrar usuarios',
  'Administrar roles',
  'Ver reportes',
];

type Rol = {
  id: string;
  nombre: string;
  descripcion: string;
  permisos: string[];
};

const initRoles: Rol[] = [
  {
    id: 'r1',
    nombre: 'Operador',
    descripcion: 'Gestiona entregas de piezas en su sucursal asignada.',
    permisos: ['Gestionar entregas', 'Ver historial'],
  },
  {
    id: 'r2',
    nombre: 'Administrador',
    descripcion: 'Administra usuarios, roles y unidades de negocio.',
    permisos: ['Administrar usuarios', 'Administrar roles', 'Ver reportes'],
  },
  {
    id: 'r3',
    nombre: 'Supervisor',
    descripcion: 'Consulta operaciones y trazabilidad, sin permisos de administración.',
    permisos: ['Ver historial', 'Ver reportes'],
  },
];

type Usuario = {
  id: string;
  nombre: string;
  usuario: string;
  email: string;
  dni: string;
  rolId: string;
  unidad: string;
  estado: 'Activo' | 'Inactivo';
};

const initUsuarios: Usuario[] = [
  { id: 'u1', nombre: 'Operador Demo', usuario: 'operador.demo', email: 'operador.demo@correoargentino.com.ar', dni: '30123456', rolId: 'r1', unidad: UNIDADES_NEGOCIO[0], estado: 'Activo' },
  { id: 'u2', nombre: 'Claudia Benitez', usuario: 'c.benitez', email: 'c.benitez@correoargentino.com.ar', dni: '27884511', rolId: 'r2', unidad: UNIDADES_NEGOCIO[1], estado: 'Activo' },
  { id: 'u3', nombre: 'Cristian Bergamasco', usuario: 'c.bergamasco', email: 'c.bergamasco@correoargentino.com.ar', dni: '25998234', rolId: 'r3', unidad: UNIDADES_NEGOCIO[1], estado: 'Activo' },
  { id: 'u4', nombre: 'Marina Sosa', usuario: 'm.sosa', email: 'm.sosa@correoargentino.com.ar', dni: '33221198', rolId: 'r1', unidad: UNIDADES_NEGOCIO[2], estado: 'Activo' },
  { id: 'u5', nombre: 'Julián Peralta', usuario: 'j.peralta', email: 'j.peralta@correoargentino.com.ar', dni: '31456782', rolId: 'r1', unidad: UNIDADES_NEGOCIO[3], estado: 'Inactivo' },
];

const emptyUsuarioForm = {
  nombre: '',
  usuario: '',
  email: '',
  dni: '',
  rolId: initRoles[0].id,
  unidad: UNIDADES_NEGOCIO[0],
  estado: 'Activo' as Usuario['estado'],
};

const emptyRolForm = {
  nombre: '',
  descripcion: '',
  permisos: [] as string[],
};

type HistorialItem = {
  id: string;
  pieza: string;
  fecha: string;
  resultado: 'Entregada' | 'No entregada';
  motivo?: string;
  operadorId: string;
  unidad: string;
};

const initHistorial: HistorialItem[] = [
  { id: 'h1', pieza: 'CP-AR-008741925', fecha: '24/08/2026 · 11:12', resultado: 'Entregada', operadorId: 'u1', unidad: UNIDADES_NEGOCIO[0] },
  { id: 'h2', pieza: 'CP-AR-004412870', fecha: '24/08/2026 · 10:47', resultado: 'No entregada', motivo: 'Rechazo del destinatario', operadorId: 'u1', unidad: UNIDADES_NEGOCIO[0] },
  { id: 'h3', pieza: 'CP-AR-009937712', fecha: '24/08/2026 · 09:58', resultado: 'Entregada', operadorId: 'u4', unidad: UNIDADES_NEGOCIO[2] },
  { id: 'h4', pieza: 'CP-AR-001125630', fecha: '23/08/2026 · 17:21', resultado: 'Entregada', operadorId: 'u4', unidad: UNIDADES_NEGOCIO[2] },
  { id: 'h5', pieza: 'CP-AR-007765310', fecha: '23/08/2026 · 16:03', resultado: 'No entregada', motivo: 'Documentación insuficiente', operadorId: 'u5', unidad: UNIDADES_NEGOCIO[3] },
  { id: 'h6', pieza: 'CP-AR-003390045', fecha: '23/08/2026 · 14:40', resultado: 'Entregada', operadorId: 'u1', unidad: UNIDADES_NEGOCIO[0] },
  { id: 'h7', pieza: 'CP-AR-006654421', fecha: '22/08/2026 · 12:15', resultado: 'Entregada', operadorId: 'u4', unidad: UNIDADES_NEGOCIO[2] },
  { id: 'h8', pieza: 'CP-AR-002298871', fecha: '22/08/2026 · 09:30', resultado: 'No entregada', motivo: 'Pieza observada', operadorId: 'u1', unidad: UNIDADES_NEGOCIO[0] },
];

export default function Home() {
  // --- Sesión ---
  const [roles, setRoles] = useState<Rol[]>(initRoles);
  const [usuarios, setUsuarios] = useState<Usuario[]>(initUsuarios);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [loginUsuario, setLoginUsuario] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const [page, setPage] = useState<Page>('entrega');

  // --- Estado del flujo de entrega ---
  const [step, setStep] = useState<Step>(1);
  const [pieceCode, setPieceCode] = useState('');
  const [pieceFound, setPieceFound] = useState(false);
  const [searchError, setSearchError] = useState('');
  const [result, setResult] = useState<DeliveryResult>('');
  const [receiverName, setReceiverName] = useState('');
  const [documentNumber, setDocumentNumber] = useState('');
  const [relationship, setRelationship] = useState('');
  const [reason, setReason] = useState('');
  const [description, setDescription] = useState('');
  const [photoReady, setPhotoReady] = useState(false);
  const [signatureReady, setSignatureReady] = useState(false);
  const [formError, setFormError] = useState('');
  const [showReceipt, setShowReceipt] = useState(false);

  // --- Estado del historial de entregas ---
  const [historial] = useState<HistorialItem[]>(initHistorial);
  const [historialSearch, setHistorialSearch] = useState('');
  const [historialFiltro, setHistorialFiltro] = useState<'todas' | 'Entregada' | 'No entregada'>('todas');

  // --- Estado de administración de usuarios y roles ---
  const [userSearch, setUserSearch] = useState('');
  const [userModal, setUserModal] = useState<{ mode: 'create' | 'edit'; id?: string } | null>(null);
  const [userForm, setUserForm] = useState(emptyUsuarioForm);
  const [roleModal, setRoleModal] = useState<{ mode: 'create' | 'edit'; id?: string } | null>(null);
  const [roleForm, setRoleForm] = useState(emptyRolForm);

  // --- Navegación hacia el hub ---
  const [hubNavOpen, setHubNavOpen] = useState(false);

  const currentUser = usuarios.find((u) => u.id === currentUserId) ?? null;
  const currentRole = currentUser ? roles.find((r) => r.id === currentUser.rolId) ?? null : null;

  const permisos = currentRole?.permisos ?? [];
  const canEntrega = permisos.includes('Gestionar entregas');
  const canHistorial = permisos.includes('Ver historial');
  const canUsuarios = permisos.includes('Administrar usuarios');
  const canRoles = permisos.includes('Administrar roles');

  const isDelivered = result === 'entregada';
  const requiredReady = useMemo(() => {
    if (!result || !description || !photoReady) return false;
    if (isDelivered) return Boolean(receiverName && documentNumber && relationship && signatureReady);
    return Boolean(reason);
  }, [description, documentNumber, isDelivered, photoReady, reason, receiverName, relationship, result, signatureReady]);

  function searchPiece(event: FormEvent) {
    event.preventDefault();
    if (!pieceCode.trim()) {
      setSearchError('Ingresá el código de la pieza.');
      return;
    }
    setSearchError('');
    setPieceFound(true);
  }

  function continueToConfirmation(event: FormEvent) {
    event.preventDefault();
    if (!requiredReady) {
      setFormError('Completá todos los campos visibles y las evidencias obligatorias.');
      return;
    }
    setFormError('');
    setStep(3);
  }

  function resetFlow() {
    setStep(1); setPieceCode(''); setPieceFound(false); setResult('');
    setReceiverName(''); setDocumentNumber(''); setRelationship(''); setReason('');
    setDescription(''); setPhotoReady(false); setSignatureReady(false);
  }

  function goToPage(target: Page) {
    setPage(target);
    if (target === 'entrega') resetFlow();
  }

  function landingPageFor(rol: Rol | null): Page {
    if (!rol) return 'entrega';
    if (rol.permisos.includes('Gestionar entregas')) return 'entrega';
    if (rol.permisos.includes('Administrar usuarios')) return 'usuarios';
    if (rol.permisos.includes('Administrar roles')) return 'roles';
    if (rol.permisos.includes('Ver historial')) return 'historial';
    return 'entrega';
  }

  function handleLogin(event: FormEvent) {
    event.preventDefault();
    const match = usuarios.find((u) => u.usuario.toLowerCase() === loginUsuario.trim().toLowerCase());
    if (!match) {
      setLoginError('Usuario o contraseña incorrectos.');
      return;
    }
    if (match.estado === 'Inactivo') {
      setLoginError('El usuario está inactivo. Contactá a un administrador.');
      return;
    }
    if (!loginPassword.trim()) {
      setLoginError('Ingresá la contraseña.');
      return;
    }
    setLoginError('');
    setCurrentUserId(match.id);
    setPage(landingPageFor(roles.find((r) => r.id === match.rolId) ?? null));
    setLoginPassword('');
  }

  function quickLogin(u: Usuario) {
    setCurrentUserId(u.id);
    setPage(landingPageFor(roles.find((r) => r.id === u.rolId) ?? null));
    setLoginUsuario('');
    setLoginPassword('');
    setLoginError('');
  }

  function handleLogout() {
    setCurrentUserId(null);
    setLoginUsuario('');
    setLoginPassword('');
    setLoginError('');
    resetFlow();
    setPage('entrega');
  }

  function rolNombre(rolId: string) {
    return roles.find((r) => r.id === rolId)?.nombre ?? 'Sin rol';
  }

  function usuarioNombre(usuarioId: string) {
    return usuarios.find((u) => u.id === usuarioId)?.nombre ?? 'Usuario desconocido';
  }

  const historialVisible = historial.filter((h) => {
    if (currentUser && canEntrega && !canUsuarios) {
      if (h.operadorId !== currentUser.id) return false;
    }
    if (historialFiltro !== 'todas' && h.resultado !== historialFiltro) return false;
    const q = historialSearch.trim().toLowerCase();
    if (!q) return true;
    return (
      h.pieza.toLowerCase().includes(q) ||
      usuarioNombre(h.operadorId).toLowerCase().includes(q) ||
      h.unidad.toLowerCase().includes(q)
    );
  });

  const usuariosFiltrados = usuarios.filter((u) => {
    const q = userSearch.trim().toLowerCase();
    if (!q) return true;
    return (
      u.nombre.toLowerCase().includes(q) ||
      u.usuario.toLowerCase().includes(q) ||
      u.email.toLowerCase().includes(q) ||
      rolNombre(u.rolId).toLowerCase().includes(q)
    );
  });

  function openCreateUser() {
    setUserForm(emptyUsuarioForm);
    setUserModal({ mode: 'create' });
  }

  function openEditUser(u: Usuario) {
    setUserForm({ nombre: u.nombre, usuario: u.usuario, email: u.email, dni: u.dni, rolId: u.rolId, unidad: u.unidad, estado: u.estado });
    setUserModal({ mode: 'edit', id: u.id });
  }

  function saveUser(event: FormEvent) {
    event.preventDefault();
    if (!userForm.nombre || !userForm.usuario || !userForm.email || !userForm.dni) return;
    if (userModal?.mode === 'edit' && userModal.id) {
      setUsuarios((prev) => prev.map((u) => (u.id === userModal.id ? { ...u, ...userForm } : u)));
    } else {
      const id = `u${Date.now()}`;
      setUsuarios((prev) => [...prev, { id, ...userForm }]);
    }
    setUserModal(null);
  }

  function toggleUserEstado(id: string) {
    setUsuarios((prev) => prev.map((u) => (u.id === id ? { ...u, estado: u.estado === 'Activo' ? 'Inactivo' : 'Activo' } : u)));
  }

  function openCreateRole() {
    setRoleForm(emptyRolForm);
    setRoleModal({ mode: 'create' });
  }

  function openEditRole(r: Rol) {
    setRoleForm({ nombre: r.nombre, descripcion: r.descripcion, permisos: r.permisos });
    setRoleModal({ mode: 'edit', id: r.id });
  }

  function toggleRoleFormPermiso(permiso: string) {
    setRoleForm((prev) => ({
      ...prev,
      permisos: prev.permisos.includes(permiso) ? prev.permisos.filter((p) => p !== permiso) : [...prev.permisos, permiso],
    }));
  }

  function saveRole(event: FormEvent) {
    event.preventDefault();
    if (!roleForm.nombre) return;
    if (roleModal?.mode === 'edit' && roleModal.id) {
      setRoles((prev) => prev.map((r) => (r.id === roleModal.id ? { ...r, ...roleForm } : r)));
    } else {
      const id = `r${Date.now()}`;
      setRoles((prev) => [...prev, { id, ...roleForm }]);
    }
    setRoleModal(null);
  }

  function usuariosPorRol(rolId: string) {
    return usuarios.filter((u) => u.rolId === rolId).length;
  }

  const pageTitles: Record<Page, string> = {
    entrega: 'Entrega en sucursal',
    historial: 'Historial de entregas',
    usuarios: 'Administración de usuarios',
    roles: 'Roles y perfiles',
  };

  const hubLinks = getHubLinks();

  const hubNav = (
    <div className="hub-nav">
      {hubNavOpen && (
        <div className="hub-nav-menu" role="menu">
          <p className="hub-nav-menu-title">Centro del proyecto</p>
          {hubLinks.map((link) => (
            <a
              key={link.label}
              className={link.tag === 'actual' ? 'hub-nav-item current' : 'hub-nav-item'}
              href={link.href}
              onClick={(e) => { if (link.href === '#') e.preventDefault(); }}
            >
              <span>{link.label}</span>
              {link.tag === 'actual' && <span className="hub-nav-tag current">Actual</span>}
              {link.tag === 'pendiente' && <span className="hub-nav-tag">Próximamente</span>}
            </a>
          ))}
        </div>
      )}
      <button
        className="hub-nav-toggle"
        type="button"
        aria-label="Navegación del hub"
        aria-expanded={hubNavOpen}
        onClick={() => setHubNavOpen((v) => !v)}
      >
        ⌂
      </button>
    </div>
  );

  // --- Pantalla de login ---
  if (!currentUser || !currentRole) {
    const usuariosPrueba = roles
      .map((r) => usuarios.find((u) => u.rolId === r.id && u.estado === 'Activo'))
      .filter((u): u is Usuario => Boolean(u));
    return (
      <>
      <main className="login-shell">
        <section className="panel login-card">
          <div className="brand-mark" aria-hidden="true" style={{ margin: '0 auto 18px' }}>CA</div>
          <p className="eyebrow" style={{ textAlign: 'center' }}>Correo Argentino · Prototipo funcional</p>
          <h2 style={{ textAlign: 'center', margin: '4px 0 26px' }}>Entrega en sucursal</h2>
          <form onSubmit={handleLogin}>
            <div className="form-grid" style={{ gridTemplateColumns: '1fr' }}>
              <label className="field"><span>Usuario <b>*</b></span><input value={loginUsuario} onChange={(e) => setLoginUsuario(e.target.value)} placeholder="Ej.: operador.demo" autoFocus /></label>
              <label className="field"><span>Contraseña <b>*</b></span><input type="password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} placeholder="••••••••" /></label>
            </div>
            {loginError && <p className="error" role="alert">{loginError}</p>}
            <div className="action-bar centered" style={{ marginTop: '22px' }}>
              <button className="button primary" type="submit" style={{ width: '100%' }}>Ingresar</button>
            </div>
          </form>
          <div className="login-users">
            <p className="section-number">Accesos de prueba (wireframe)</p>
            {usuariosPrueba.map((u) => (
              <button key={u.id} className="button secondary" type="button" onClick={() => quickLogin(u)}>
                Ingresar como {rolNombre(u.rolId)}
              </button>
            ))}
          </div>
          <p className="modal-footnote" style={{ marginTop: '20px' }}>Cualquier contraseña es válida en este prototipo. Sin conexión real con T&amp;T, Mosaic ni Office Track.</p>
        </section>
      </main>
      {hubNav}
      </>
    );
  }

  return (
    <>
    <main className="app-shell">
      <header className="topbar">
        <div className="brand-mark" aria-hidden="true">CA</div>
        <div><p className="eyebrow">Correo Argentino · Prototipo funcional</p><h1>{pageTitles[page]}</h1></div>
        <div className="topbar-actions">
          <div className="user-chip">
            <span className="avatar">{currentUser.nombre.split(' ').map((n) => n[0]).slice(0, 2).join('')}</span>
            <span><strong>{currentUser.nombre}</strong><small>{rolNombre(currentUser.rolId)} · {currentUser.unidad.split('—')[0].trim()}</small></span>
          </div>
          <button className="link-button" type="button" onClick={handleLogout}>Cerrar sesión</button>
        </div>
      </header>

      <div className="workspace">
        <aside className="sidebar">
          <nav aria-label="Navegación principal">
            {(canEntrega || canHistorial) && (
              <>
                <p className="nav-label">Operación</p>
                {canEntrega && <button className={page === 'entrega' ? 'nav-item active' : 'nav-item'} type="button" onClick={() => goToPage('entrega')}><span>01</span> Nueva entrega</button>}
                {canHistorial && <button className={page === 'historial' ? 'nav-item active' : 'nav-item'} type="button" onClick={() => goToPage('historial')}><span>02</span> Historial</button>}
              </>
            )}
            {(canUsuarios || canRoles) && (
              <>
                <p className={canEntrega || canHistorial ? 'nav-label spaced' : 'nav-label'}>Administración</p>
                {canUsuarios && <button className={page === 'usuarios' ? 'nav-item active' : 'nav-item'} type="button" onClick={() => goToPage('usuarios')}><span>03</span> Usuarios</button>}
                {canRoles && <button className={page === 'roles' ? 'nav-item active' : 'nav-item'} type="button" onClick={() => goToPage('roles')}><span>04</span> Roles</button>}
              </>
            )}
            {!canEntrega && !canHistorial && !canUsuarios && !canRoles && (
              <p className="modal-footnote">Tu rol ({rolNombre(currentUser.rolId)}) todavía no tiene módulos disponibles en este wireframe.</p>
            )}
          </nav>
          <div className="prototype-note"><strong>Wireframe v0.1</strong><p>Datos ficticios. Sin conexión real con T&amp;T, Mosaic, Office Track ni RDU.</p></div>
        </aside>

        <section className="content">
          {!((page === 'entrega' && canEntrega) || (page === 'historial' && canHistorial) || (page === 'usuarios' && canUsuarios) || (page === 'roles' && canRoles)) && (
            <>
              <div className="page-heading"><div><p className="eyebrow">Sin acceso</p><h2>Ningún módulo disponible todavía</h2></div></div>
              <section className="panel">
                <div className="panel-header"><div><p className="section-number">ROL: {rolNombre(currentUser.rolId).toUpperCase()}</p><h3>Este rol no tiene pantallas asignadas en este wireframe</h3><p>Reportes está fuera del alcance de este prototipo. Pedile a un administrador que ajuste tus permisos si esperabas ver otra cosa.</p></div></div>
              </section>
            </>
          )}
          {page === 'entrega' && canEntrega && (
            <>
              <div className="page-heading"><div><p className="eyebrow">Flujo operativo</p><h2>Nueva entrega de pieza</h2></div><span className="status-badge">Sesión activa</span></div>
              <ol className="stepper" aria-label="Progreso de la entrega">
                {['Buscar pieza', 'Datos de entrega', 'Confirmar', 'Resultado'].map((label, index) => {
                  const value = (index + 1) as Step;
                  return <li key={label} className={step === value ? 'current' : step > value ? 'done' : ''}><span>{step > value ? '✓' : value}</span><small>{label}</small></li>;
                })}
              </ol>

              {step === 1 && (
                <section className="panel" aria-labelledby="search-title">
                  <div className="panel-header"><div><p className="section-number">PASO 1 DE 4</p><h3 id="search-title">Buscar pieza para entregar</h3><p>Ingresá manualmente el identificador impreso en la pieza.</p></div></div>
                  <form className="search-row" onSubmit={searchPiece}>
                    <label className="field grow"><span>Código de pieza <b>*</b></span><input value={pieceCode} onChange={(e) => { setPieceCode(e.target.value); setPieceFound(false); }} placeholder="Ej.: CP-AR-008741925" autoFocus /></label>
                    <button className="button primary" type="submit">Buscar pieza</button>
                  </form>
                  <button className="text-action" type="button" onClick={() => { setPieceCode(demoPiece.code); setPieceFound(true); setSearchError(''); }}>Usar una pieza de prueba</button>
                  {searchError && <p className="error" role="alert">{searchError}</p>}
                  {pieceFound && (
                    <div className="piece-card">
                      <div className="piece-card-title"><div><p className="eyebrow">Pieza localizada</p><h4>{demoPiece.code}</h4></div><span className="status-badge dark">En guarda</span></div>
                      <dl className="data-grid">
                        <div><dt>Producto</dt><dd>{demoPiece.product}</dd></div><div><dt>Destinatario</dt><dd>{demoPiece.recipient}</dd></div>
                        <div><dt>Domicilio</dt><dd>{demoPiece.address}</dd></div><div><dt>Sucursal</dt><dd>{demoPiece.branch}</dd></div>
                        <div><dt>Ingreso a guarda</dt><dd>{demoPiece.stockSince}</dd></div><div><dt>Estado</dt><dd>Disponible para entrega</dd></div>
                      </dl>
                      <div className="action-bar"><button className="button secondary" type="button" onClick={() => setPieceFound(false)}>Cancelar</button><button className="button primary" type="button" onClick={() => setStep(2)}>Iniciar entrega</button></div>
                    </div>
                  )}
                </section>
              )}

              {step === 2 && (
                <form className="panel" onSubmit={continueToConfirmation}>
                  <div className="panel-header split"><div><p className="section-number">PASO 2 DE 4</p><h3>Registrar resultado y evidencias</h3><p>Todos los campos visibles son obligatorios en este prototipo.</p></div><button className="link-button" type="button" onClick={() => setStep(1)}>Cambiar pieza</button></div>
                  <div className="context-strip"><span><b>Pieza</b> {demoPiece.code}</span><span><b>Destinatario</b> {demoPiece.recipient}</span></div>
                  <fieldset className="choice-group"><legend>Resultado de la gestión <b>*</b></legend><label className={result === 'entregada' ? 'selected' : ''}><input type="radio" name="result" checked={result === 'entregada'} onChange={() => setResult('entregada')} /> Pieza entregada</label><label className={result === 'no-entregada' ? 'selected' : ''}><input type="radio" name="result" checked={result === 'no-entregada'} onChange={() => setResult('no-entregada')} /> Pieza no entregada</label></fieldset>

                  {isDelivered && <div className="form-section"><h4>Persona que recibe</h4><div className="form-grid"><label className="field"><span>Nombre y apellido <b>*</b></span><input value={receiverName} onChange={(e) => setReceiverName(e.target.value)} /></label><label className="field"><span>DNI / documento <b>*</b></span><input value={documentNumber} onChange={(e) => setDocumentNumber(e.target.value)} inputMode="numeric" /></label><label className="field full"><span>Relación con el destinatario <b>*</b></span><select value={relationship} onChange={(e) => setRelationship(e.target.value)}><option value="">Seleccionar</option><option>Destinatario</option><option>Familiar</option><option>Autorizado</option><option>Otro</option></select></label></div></div>}
                  {result === 'no-entregada' && <div className="form-section"><h4>Motivo de no entrega</h4><label className="field"><span>Motivo <b>*</b></span><select value={reason} onChange={(e) => setReason(e.target.value)}><option value="">Seleccionar</option><option>Documentación insuficiente</option><option>Rechazo del destinatario</option><option>Pieza observada</option><option>Otro</option></select></label></div>}

                  {result && <div className="form-section"><h4>Detalle y evidencias</h4><label className="field"><span>Descripción de la gestión <b>*</b></span><textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Describí brevemente lo ocurrido" /></label><div className="evidence-grid"><div className={photoReady ? 'evidence ready' : 'evidence'}><div className="evidence-icon">□</div><div><strong>Fotografía <b>*</b></strong><p>{photoReady ? 'Evidencia adjuntada' : 'Pendiente de captura o carga'}</p></div><button className="button secondary small" type="button" onClick={() => setPhotoReady(!photoReady)}>{photoReady ? 'Quitar' : 'Simular captura'}</button></div>{isDelivered && <div className={signatureReady ? 'evidence ready' : 'evidence'}><div className="evidence-icon">✎</div><div><strong>Firma digital <b>*</b></strong><p>{signatureReady ? 'Firma registrada' : 'Pendiente de firma'}</p></div><button className="button secondary small" type="button" onClick={() => setSignatureReady(!signatureReady)}>{signatureReady ? 'Borrar' : 'Simular firma'}</button></div>}</div></div>}
                  {formError && <p className="error" role="alert">{formError}</p>}
                  <div className="action-bar"><button className="button secondary" type="button" onClick={() => setStep(1)}>Volver</button><button className="button primary" type="submit">Revisar entrega</button></div>
                </form>
              )}

              {step === 3 && (
                <section className="panel">
                  <div className="panel-header"><div><p className="section-number">PASO 3 DE 4</p><h3>Confirmar la gestión</h3><p>Revisá la información antes de enviarla.</p></div></div>
                  <div className="review-box"><dl className="review-list"><div><dt>Pieza</dt><dd>{demoPiece.code}</dd></div><div><dt>Resultado</dt><dd>{isDelivered ? 'Entregada' : 'No entregada'}</dd></div>{isDelivered ? <><div><dt>Recibe</dt><dd>{receiverName}</dd></div><div><dt>Documento</dt><dd>{documentNumber}</dd></div><div><dt>Relación</dt><dd>{relationship}</dd></div></> : <div><dt>Motivo</dt><dd>{reason}</dd></div>}<div><dt>Descripción</dt><dd>{description}</dd></div><div><dt>Evidencias</dt><dd>Fotografía{isDelivered ? ' y firma digital' : ''}</dd></div></dl></div>
                  <div className="notice"><strong>Acción simulada</strong><p>Al confirmar, la solución deberá registrar la auditoría, actualizar los sistemas definidos y generar el RDU cuando corresponda.</p></div>
                  <div className="action-bar"><button className="button secondary" type="button" onClick={() => setStep(2)}>Corregir datos</button><button className="button primary" type="button" onClick={() => setStep(4)}>Confirmar y enviar</button></div>
                </section>
              )}

              {step === 4 && (
                <section className="panel result-panel">
                  <div className="result-symbol">✓</div><p className="section-number">PASO 4 DE 4</p><h3>Gestión registrada correctamente</h3><p>La pieza <b>{demoPiece.code}</b> quedó marcada como <b>{isDelivered ? 'entregada' : 'no entregada'}</b>.</p>
                  <div className="integration-list"><div><span>01</span><p><b>Registro de auditoría</b><small>Operador, sucursal, fecha y evidencias</small></p><strong>OK</strong></div><div><span>02</span><p><b>Actualización de T&amp;T / Mosaic</b><small>Comportamiento pendiente de definición</small></p><strong>SIMULADO</strong></div><div><span>03</span><p><b>Generación de RDU</b><small>Regla definitiva pendiente</small></p><strong>SIMULADO</strong></div></div>
                  <div className="action-bar centered"><button className="button secondary" type="button" onClick={() => setShowReceipt(true)}>Ver comprobante</button><button className="button primary" type="button" onClick={resetFlow}>Gestionar otra pieza</button></div>
                </section>
              )}
            </>
          )}

          {page === 'historial' && canHistorial && (
            <>
              <div className="page-heading"><div><p className="eyebrow">Operación</p><h2>Historial de entregas</h2></div><span className="count-pill">{historialVisible.length} gestiones</span></div>
              <section className="panel">
                <div className="panel-header">
                  <div><p className="section-number">HISTORIAL</p><h3>Gestiones registradas{canEntrega && !canUsuarios ? ' por vos' : ''}</h3><p>Datos ficticios de referencia. No refleja información real de T&amp;T, Mosaic ni Office Track.</p></div>
                </div>

                <div className="toolbar">
                  <label className="field"><span>Buscar</span><input value={historialSearch} onChange={(e) => setHistorialSearch(e.target.value)} placeholder="Pieza, operador o sucursal" /></label>
                  <fieldset className="choice-group" style={{ margin: 0 }}>
                    <legend>Resultado</legend>
                    <label className={historialFiltro === 'todas' ? 'selected' : ''}><input type="radio" name="historialFiltro" checked={historialFiltro === 'todas'} onChange={() => setHistorialFiltro('todas')} /> Todas</label>
                    <label className={historialFiltro === 'Entregada' ? 'selected' : ''}><input type="radio" name="historialFiltro" checked={historialFiltro === 'Entregada'} onChange={() => setHistorialFiltro('Entregada')} /> Entregadas</label>
                    <label className={historialFiltro === 'No entregada' ? 'selected' : ''}><input type="radio" name="historialFiltro" checked={historialFiltro === 'No entregada'} onChange={() => setHistorialFiltro('No entregada')} /> No entregadas</label>
                  </fieldset>
                </div>

                <div className="table-wrap">
                  <table>
                    <thead>
                      <tr>
                        <th>Pieza</th>
                        <th>Fecha</th>
                        <th>Resultado</th>
                        <th>Operador</th>
                        <th>Unidad de negocio</th>
                      </tr>
                    </thead>
                    <tbody>
                      {historialVisible.length === 0 && (
                        <tr className="empty-row"><td colSpan={5}>No hay gestiones que coincidan con la búsqueda.</td></tr>
                      )}
                      {historialVisible.map((h) => (
                        <tr key={h.id}>
                          <td><strong>{h.pieza}</strong>{h.motivo && <><br /><small style={{ color: 'var(--muted)' }}>{h.motivo}</small></>}</td>
                          <td>{h.fecha}</td>
                          <td><span className={h.resultado === 'Entregada' ? 'status-dot' : 'status-dot inactive'}>{h.resultado}</span></td>
                          <td>{usuarioNombre(h.operadorId)}</td>
                          <td>{h.unidad}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            </>
          )}

          {page === 'usuarios' && canUsuarios && (
            <>
              <div className="page-heading"><div><p className="eyebrow">Administración</p><h2>Usuarios</h2></div><span className="count-pill">{usuarios.length} usuarios</span></div>
              <section className="panel">
                <div className="panel-header split">
                  <div><p className="section-number">ABM DE USUARIOS</p><h3>Usuarios nominales por unidad de negocio</h3><p>Cada operador se identifica con una cuenta individual, evitando el uso de usuarios genéricos.</p></div>
                  <button className="button primary" type="button" onClick={openCreateUser}>+ Nuevo usuario</button>
                </div>

                <div className="toolbar">
                  <label className="field"><span>Buscar</span><input value={userSearch} onChange={(e) => setUserSearch(e.target.value)} placeholder="Nombre, usuario, email o rol" /></label>
                </div>

                <div className="table-wrap">
                  <table>
                    <thead>
                      <tr>
                        <th>Nombre</th>
                        <th>Usuario</th>
                        <th>Rol</th>
                        <th>Unidad de negocio</th>
                        <th>Estado</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {usuariosFiltrados.length === 0 && (
                        <tr className="empty-row"><td colSpan={6}>No se encontraron usuarios para la búsqueda.</td></tr>
                      )}
                      {usuariosFiltrados.map((u) => (
                        <tr key={u.id}>
                          <td><strong>{u.nombre}</strong><br /><small style={{ color: 'var(--muted)' }}>{u.email}</small></td>
                          <td>{u.usuario}</td>
                          <td><span className="role-badge">{rolNombre(u.rolId)}</span></td>
                          <td>{u.unidad}</td>
                          <td><span className={u.estado === 'Activo' ? 'status-dot' : 'status-dot inactive'}>{u.estado}</span></td>
                          <td>
                            <div className="row-actions">
                              <button className="button secondary small" type="button" onClick={() => openEditUser(u)}>Editar</button>
                              <button className="button secondary small" type="button" onClick={() => toggleUserEstado(u.id)}>{u.estado === 'Activo' ? 'Desactivar' : 'Activar'}</button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            </>
          )}

          {page === 'roles' && canRoles && (
            <>
              <div className="page-heading"><div><p className="eyebrow">Administración</p><h2>Roles y perfiles</h2></div><span className="count-pill">{roles.length} roles</span></div>
              <section className="panel">
                <div className="panel-header split">
                  <div><p className="section-number">ABM DE ROLES</p><h3>Roles y permisos del sistema</h3><p>Cada usuario se asocia a un rol que determina sus permisos dentro de la aplicación.</p></div>
                  <button className="button primary" type="button" onClick={openCreateRole}>+ Nuevo rol</button>
                </div>

                <div className="table-wrap">
                  <table>
                    <thead>
                      <tr>
                        <th>Rol</th>
                        <th>Descripción</th>
                        <th>Permisos</th>
                        <th>Usuarios</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {roles.map((r) => (
                        <tr key={r.id}>
                          <td><strong>{r.nombre}</strong></td>
                          <td style={{ maxWidth: 260 }}>{r.descripcion}</td>
                          <td>{r.permisos.length ? r.permisos.join(', ') : '—'}</td>
                          <td>{usuariosPorRol(r.id)}</td>
                          <td>
                            <div className="row-actions">
                              <button className="button secondary small" type="button" onClick={() => openEditRole(r)}>Editar</button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            </>
          )}
        </section>
      </div>

      {showReceipt && <div className="modal-backdrop" role="presentation" onMouseDown={() => setShowReceipt(false)}><section className="modal receipt" role="dialog" aria-modal="true" aria-labelledby="receipt-title" onMouseDown={(e) => e.stopPropagation()}><button className="modal-close" onClick={() => setShowReceipt(false)} aria-label="Cerrar">×</button><p className="eyebrow">Comprobante provisorio</p><h2 id="receipt-title">Gestión de pieza</h2><dl className="receipt-data"><div><dt>Pieza</dt><dd>{demoPiece.code}</dd></div><div><dt>Resultado</dt><dd>{isDelivered ? 'Entregada' : 'No entregada'}</dd></div><div><dt>Operador</dt><dd>{currentUser.nombre}</dd></div><div><dt>Sucursal</dt><dd>{currentUser.unidad}</dd></div></dl><p className="modal-footnote">Formato, numeración e impresión quedan pendientes de definición.</p><button className="button primary" onClick={() => setShowReceipt(false)}>Cerrar comprobante</button></section></div>}

      {userModal && (
        <div className="modal-backdrop" role="presentation" onMouseDown={() => setUserModal(null)}>
          <section className="modal" role="dialog" aria-modal="true" aria-labelledby="user-modal-title" onMouseDown={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setUserModal(null)} aria-label="Cerrar">×</button>
            <p className="eyebrow">{userModal.mode === 'edit' ? 'Editar usuario' : 'Nuevo usuario'}</p>
            <h2 id="user-modal-title">{userModal.mode === 'edit' ? 'Editar datos del usuario' : 'Alta de usuario nominal'}</h2>
            <form onSubmit={saveUser}>
              <div className="form-grid">
                <label className="field full"><span>Nombre y apellido <b>*</b></span><input value={userForm.nombre} onChange={(e) => setUserForm({ ...userForm, nombre: e.target.value })} autoFocus /></label>
                <label className="field"><span>Usuario (login) <b>*</b></span><input value={userForm.usuario} onChange={(e) => setUserForm({ ...userForm, usuario: e.target.value })} /></label>
                <label className="field"><span>DNI <b>*</b></span><input value={userForm.dni} onChange={(e) => setUserForm({ ...userForm, dni: e.target.value })} inputMode="numeric" /></label>
                <label className="field full"><span>Email <b>*</b></span><input type="email" value={userForm.email} onChange={(e) => setUserForm({ ...userForm, email: e.target.value })} /></label>
                <label className="field"><span>Rol <b>*</b></span><select value={userForm.rolId} onChange={(e) => setUserForm({ ...userForm, rolId: e.target.value })}>{roles.map((r) => <option key={r.id} value={r.id}>{r.nombre}</option>)}</select></label>
                <label className="field"><span>Unidad de negocio <b>*</b></span><select value={userForm.unidad} onChange={(e) => setUserForm({ ...userForm, unidad: e.target.value })}>{UNIDADES_NEGOCIO.map((u) => <option key={u} value={u}>{u}</option>)}</select></label>
                <label className="field full"><span>Estado</span><select value={userForm.estado} onChange={(e) => setUserForm({ ...userForm, estado: e.target.value as Usuario['estado'] })}><option>Activo</option><option>Inactivo</option></select></label>
              </div>
              <div className="action-bar"><button className="button secondary" type="button" onClick={() => setUserModal(null)}>Cancelar</button><button className="button primary" type="submit">Guardar usuario</button></div>
            </form>
          </section>
        </div>
      )}

      {roleModal && (
        <div className="modal-backdrop" role="presentation" onMouseDown={() => setRoleModal(null)}>
          <section className="modal" role="dialog" aria-modal="true" aria-labelledby="role-modal-title" onMouseDown={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setRoleModal(null)} aria-label="Cerrar">×</button>
            <p className="eyebrow">{roleModal.mode === 'edit' ? 'Editar rol' : 'Nuevo rol'}</p>
            <h2 id="role-modal-title">{roleModal.mode === 'edit' ? 'Editar rol y permisos' : 'Alta de rol'}</h2>
            <form onSubmit={saveRole}>
              <label className="field"><span>Nombre del rol <b>*</b></span><input value={roleForm.nombre} onChange={(e) => setRoleForm({ ...roleForm, nombre: e.target.value })} autoFocus /></label>
              <div className="form-section">
                <h4>Descripción</h4>
                <label className="field"><span>Descripción</span><textarea value={roleForm.descripcion} onChange={(e) => setRoleForm({ ...roleForm, descripcion: e.target.value })} placeholder="Alcance del rol dentro del sistema" /></label>
              </div>
              <div className="form-section">
                <h4>Permisos</h4>
                <div className="permiso-grid">
                  {PERMISOS_DISPONIBLES.map((permiso) => (
                    <label className="permiso-item" key={permiso}>
                      <input type="checkbox" checked={roleForm.permisos.includes(permiso)} onChange={() => toggleRoleFormPermiso(permiso)} />
                      {permiso}
                    </label>
                  ))}
                </div>
              </div>
              <div className="action-bar"><button className="button secondary" type="button" onClick={() => setRoleModal(null)}>Cancelar</button><button className="button primary" type="submit">Guardar rol</button></div>
            </form>
          </section>
        </div>
      )}
    </main>
    {hubNav}
    </>
  );
}
