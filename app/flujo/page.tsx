import Link from 'next/link';

export default function FlujoPage() {
  return (
    <main className="placeholder-shell">
      <section className="placeholder-card">
        <div className="placeholder-icon" aria-hidden="true">🗺️</div>
        <span className="hub-tag pending">Próximamente</span>
        <h2>Flujo de navegación</h2>
        <p>Acá vamos a mostrar el diagrama de pantallas y relaciones del prototipo: cómo se conecta cada rol con sus módulos disponibles. Todavía no está construido.</p>
        <Link className="placeholder-back" href="/">← Volver al centro del proyecto</Link>
      </section>
    </main>
  );
}
