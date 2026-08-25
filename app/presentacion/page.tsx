import Link from 'next/link';

export default function PresentacionPage() {
  return (
    <main className="placeholder-shell">
      <section className="placeholder-card">
        <div className="placeholder-icon" aria-hidden="true">🎞️</div>
        <span className="hub-tag pending">Próximamente</span>
        <h2>Presentación</h2>
        <p>Acá va a vivir un recorrido paginado del flujo completo, con capturas del prototipo, a modo de instructivo. Todavía no está construido.</p>
        <Link className="placeholder-back" href="/">← Volver al centro del proyecto</Link>
      </section>
    </main>
  );
}
