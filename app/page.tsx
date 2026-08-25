import Link from 'next/link';

export default function HubHome() {
  return (
    <div className="hub-shell">
      <header className="hub-header">
        <div className="hub-logo" aria-hidden="true">CA</div>
        <div>
          <p className="eyebrow">Correo Argentino</p>
          <h1>Entrega HH SUC — Centro del proyecto</h1>
        </div>
      </header>

      <main className="hub-main">
        <section className="hub-hero">
          <div>
            <p className="eyebrow" style={{ margin: '0 0 6px' }}>Entrega de piezas en sucursal</p>
            <h2>Un solo lugar para navegar el proyecto</h2>
            <p>Desde acá se accede al prototipo funcional, al flujo de navegación, a la presentación del proceso y a la documentación funcional. El proyecto está en desarrollo: los módulos se van completando de forma incremental.</p>
          </div>
          <span className="hub-status">En desarrollo</span>
        </section>

        <section className="hub-grid" aria-label="Módulos del proyecto">
          <Link className="hub-card" href="/prototype">
            <div className="hub-card-top">
              <span className="hub-card-number">01</span>
              <span className="hub-tag ready">Disponible</span>
            </div>
            <span className="hub-card-icon" aria-hidden="true">🖥️</span>
            <h3>Prototipo navegable</h3>
            <p>Maqueta funcional con login, roles (Operador, Administrador, Supervisor), flujo de entrega, historial y administración de usuarios.</p>
            <span className="hub-card-link">Ver más <span className="arrow">→</span></span>
          </Link>

          <Link className="hub-card" href="/flujo">
            <div className="hub-card-top">
              <span className="hub-card-number">02</span>
              <span className="hub-tag pending">Próximamente</span>
            </div>
            <span className="hub-card-icon" aria-hidden="true">🗺️</span>
            <h3>Flujo de navegación</h3>
            <p>Diagrama de pantallas y relaciones del prototipo: cómo se conectan las secciones y los roles entre sí.</p>
            <span className="hub-card-link">Ver más <span className="arrow">→</span></span>
          </Link>

          <Link className="hub-card" href="/presentacion">
            <div className="hub-card-top">
              <span className="hub-card-number">03</span>
              <span className="hub-tag pending">Próximamente</span>
            </div>
            <span className="hub-card-icon" aria-hidden="true">🎞️</span>
            <h3>Presentación</h3>
            <p>Recorrido paginado del flujo completo con capturas del prototipo, a modo de instructivo.</p>
            <span className="hub-card-link">Ver más <span className="arrow">→</span></span>
          </Link>

          <Link className="hub-card" href="/documentacion">
            <div className="hub-card-top">
              <span className="hub-card-number">04</span>
              <span className="hub-tag pending">Próximamente</span>
            </div>
            <span className="hub-card-icon" aria-hidden="true">📄</span>
            <h3>Documentación</h3>
            <p>Análisis funcional, arquitectura provisoria y demás documentos de referencia del proyecto.</p>
            <span className="hub-card-link">Ver más <span className="arrow">→</span></span>
          </Link>
        </section>
      </main>

      <footer className="hub-footer">
        <strong>Referencia funcional:</strong> wireframe de escritorio para validar la entrega de piezas en sucursal con usuarios nominales, reemplazando el uso de usuarios genéricos. Datos ficticios en todos los módulos.
      </footer>
    </div>
  );
}
