'use client';

import Link from 'next/link';
import { useState } from 'react';
import { PRESENTACIONES } from './presentaciones';

export default function PresentacionPage() {
  const [seleccionada, setSeleccionada] = useState(PRESENTACIONES[0]?.slug ?? '');
  const actual = PRESENTACIONES.find((p) => p.slug === seleccionada) ?? PRESENTACIONES[0];

  return (
    <div className="hub-shell">
      <header className="hub-header">
        <div className="hub-logo" aria-hidden="true">CA</div>
        <div>
          <p className="eyebrow">Correo Argentino</p>
          <h1>Presentación</h1>
        </div>
        <Link className="doc-header-back" href="/">← Centro del proyecto</Link>
      </header>

      <main className="hub-main">
        <section className="hub-hero">
          <div>
            <p className="eyebrow" style={{ margin: '0 0 6px' }}>Entrega de piezas en sucursal</p>
            <h2>Presentaciones del proyecto</h2>
            <p>
              Recorridos navegables pensados para presentar el proyecto. Por ahora hay una
              sola presentación disponible; el selector ya está preparado para cuando se
              agreguen más.
            </p>
          </div>
        </section>

        {PRESENTACIONES.length === 0 ? (
          <section className="doc-sources">
            <p style={{ margin: 0 }}>Todavía no hay presentaciones cargadas.</p>
          </section>
        ) : (
          <section className="pres-picker">
            <label className="pres-picker-label" htmlFor="pres-select">
              Elegir presentación
            </label>
            <div className="pres-picker-row">
              <select
                id="pres-select"
                className="pres-select"
                value={seleccionada}
                onChange={(e) => setSeleccionada(e.target.value)}
              >
                {PRESENTACIONES.map((p) => (
                  <option key={p.slug} value={p.slug}>{p.titulo}</option>
                ))}
              </select>
              {actual && (
                <a className="button primary pres-open-btn" href={actual.archivo}>
                  Abrir presentación →
                </a>
              )}
            </div>

            {actual && (
              <article className="doc-card pres-preview">
                <div className="doc-card-top">
                  <h4>{actual.titulo}</h4>
                  <span className="hub-tag ready">{actual.slides} slides</span>
                </div>
                <p>{actual.descripcion}</p>
                <span className="count-pill">Actualizado {actual.fecha}</span>
              </article>
            )}
          </section>
        )}
      </main>

      <footer className="hub-footer">
        <strong>Formato:</strong> cada presentación es un documento HTML autocontenido en{' '}
        <code>public/presentaciones/</code>, con estilos propios separados de los del resto
        del proyecto. Datos ficticios en todos los módulos.
      </footer>
    </div>
  );
}
