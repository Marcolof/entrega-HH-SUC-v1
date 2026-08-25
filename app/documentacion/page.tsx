import Link from 'next/link';

export default function DocumentacionPage() {
  return (
    <main className="placeholder-shell">
      <section className="placeholder-card">
        <div className="placeholder-icon" aria-hidden="true">📄</div>
        <span className="hub-tag pending">Próximamente</span>
        <h2>Documentación</h2>
        <p>Acá se va a listar la documentación funcional del proyecto (análisis funcional, arquitectura provisoria y demás) generada a partir de <code>Documents/*.md</code>. Todavía no está construido el listado ni la conversión a HTML.</p>
        <Link className="placeholder-back" href="/">← Volver al centro del proyecto</Link>
      </section>
    </main>
  );
}
