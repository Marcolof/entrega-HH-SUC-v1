import Link from 'next/link';
import { notFound } from 'next/navigation';
import { marked } from 'marked';
import { DOCS, getDoc, readDoc } from '../docs';

export function generateStaticParams() {
  return DOCS.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const doc = getDoc(slug);
  return { title: doc ? `${doc.titulo} — Entrega HH SUC` : 'Documento no encontrado' };
}

export default async function DocumentoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const doc = getDoc(slug);
  if (!doc) notFound();

  /* Contenido propio del repositorio, no entrada de usuario. */
  const html = await marked.parse(readDoc(doc.file));

  const indice = DOCS.findIndex((d) => d.slug === slug);
  const anterior = indice > 0 ? DOCS[indice - 1] : null;
  const siguiente = indice < DOCS.length - 1 ? DOCS[indice + 1] : null;

  return (
    <div className="hub-shell">
      <header className="hub-header">
        <div className="hub-logo" aria-hidden="true">CA</div>
        <div>
          <p className="eyebrow">Documentación</p>
          <h1>{doc.titulo}</h1>
        </div>
        <Link className="doc-header-back" href="/documentacion">← Todos los documentos</Link>
      </header>

      <main className="doc-main">
        <article className="doc-body" dangerouslySetInnerHTML={{ __html: html }} />

        <nav className="doc-pager" aria-label="Navegación entre documentos">
          {anterior ? (
            <Link className="doc-pager-link" href={`/documentacion/${anterior.slug}`}>
              <span className="eyebrow">Anterior</span>
              <strong>{anterior.titulo}</strong>
            </Link>
          ) : <span />}
          {siguiente && (
            <Link className="doc-pager-link next" href={`/documentacion/${siguiente.slug}`}>
              <span className="eyebrow">Siguiente</span>
              <strong>{siguiente.titulo}</strong>
            </Link>
          )}
        </nav>
      </main>

      <footer className="hub-footer">
        <strong>Fuente editable:</strong> <code>Documents/{doc.file}</code>
      </footer>
    </div>
  );
}
