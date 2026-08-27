import Link from 'next/link';
import { DOCS, GRUPOS } from './docs';

export const metadata = {
  title: 'Documentación — Entrega HH SUC',
};

export default function DocumentacionPage() {
  return (
    <div className="hub-shell">
      <header className="hub-header">
        <img className="hub-logo" src="/logo-correo-argentino.svg" alt="Correo Argentino" />
        <div>
          <p className="eyebrow">Correo Argentino</p>
          <h1>Documentación</h1>
        </div>
        <Link className="doc-header-back" href="/">← Centro del proyecto</Link>
      </header>

      <main className="hub-main">
        <section className="hub-hero">
          <div>
            <p className="eyebrow" style={{ margin: '0 0 6px' }}>Entrega de piezas en sucursal</p>
            <h2>Documentación funcional</h2>
            <p>
              Las dos propuestas de solución están documentadas <strong>en igualdad de
              jerarquía</strong>: ninguna está descartada. Cada documento distingue lo que
              dicen las fuentes de lo que interpretó el equipo.
            </p>
          </div>
        </section>

        {GRUPOS.map((grupo) => (
          <section key={grupo} className="doc-group">
            <h3 className="doc-group-title">{grupo}</h3>
            <div className="doc-list">
              {DOCS.filter((d) => d.grupo === grupo).map((doc) => (
                <Link key={doc.slug} className="doc-card" href={`/documentacion/${doc.slug}`}>
                  <div className="doc-card-top">
                    <h4>{doc.titulo}</h4>
                    {doc.estado && <span className="hub-tag pending">{doc.estado}</span>}
                  </div>
                  <p>{doc.descripcion}</p>
                  <span className="hub-card-link">Leer <span className="arrow">→</span></span>
                </Link>
              ))}
            </div>
          </section>
        ))}

        <section className="doc-sources">
          <h3 className="doc-group-title">Fuentes</h3>
          <ul>
            <li>
              <strong>Dos ideas como propuestas</strong> — fuente de verdad principal.
              Define las dos alternativas.
            </li>
            <li>
              <strong>Diagrama del proceso tentativo</strong> — fuente de verdad. Documenta
              la mecánica de la Propuesta 2.
            </li>
            <li>
              <strong>GC01</strong> — <em>deprecado</em>. Documento de la etapa inicial; ya
              no es fuente de verdad, pero se conserva porque explica huecos que las dos
              propuestas no cubren.
            </li>
          </ul>
        </section>
      </main>

      <footer className="hub-footer">
        <strong>Trazabilidad:</strong> estas páginas se generan a partir de los archivos
        Markdown en <code>Documents/</code>, que son la fuente editable. Datos ficticios en
        todos los módulos.
      </footer>
    </div>
  );
}
