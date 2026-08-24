'use client';

import { FormEvent, useMemo, useState } from 'react';

type Step = 1 | 2 | 3 | 4;
type DeliveryResult = 'entregada' | 'no-entregada' | '';

const demoPiece = {
  code: 'CP-AR-008741925',
  product: 'Encomienda nacional',
  recipient: 'María Fernández',
  address: 'Av. Rivadavia 3250, CABA',
  branch: 'Sucursal 018 — Caballito',
  stockSince: '22/08/2026 · 09:42',
};

export default function Home() {
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
  const [showSummary, setShowSummary] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);

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
    setDescription(''); setPhotoReady(false); setSignatureReady(false); setShowSummary(false);
  }

  return (
    <main className="app-shell">
      <header className="topbar">
        <div className="brand-mark" aria-hidden="true">CA</div>
        <div><p className="eyebrow">Correo Argentino · Prototipo funcional</p><h1>Entrega en sucursal</h1></div>
        <div className="topbar-actions">
          <button className="link-button" type="button" onClick={() => setShowSummary(true)}>Ayuda del proceso</button>
          <div className="user-chip"><span className="avatar">OP</span><span><strong>Operador Demo</strong><small>Sucursal 018</small></span></div>
        </div>
      </header>

      <div className="workspace">
        <aside className="sidebar">
          <nav aria-label="Navegación principal">
            <p className="nav-label">Operación</p>
            <button className="nav-item active" type="button" onClick={resetFlow}><span>01</span> Nueva entrega</button>
            <button className="nav-item" type="button" disabled title="Fuera del alcance de este wireframe"><span>02</span> Historial · próximo</button>
            <p className="nav-label spaced">Administración</p>
            <button className="nav-item" type="button" disabled title="Fuera del alcance de este wireframe"><span>03</span> Usuarios · próximo</button>
            <button className="nav-item" type="button" disabled title="Fuera del alcance de este wireframe"><span>04</span> Roles · próximo</button>
          </nav>
          <div className="prototype-note"><strong>Wireframe v0.1</strong><p>Datos ficticios. Sin conexión real con T&amp;T, Mosaic, Office Track ni RDU.</p></div>
        </aside>

        <section className="content">
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
        </section>
      </div>

      {showSummary && <div className="modal-backdrop" role="presentation" onMouseDown={() => setShowSummary(false)}><section className="modal" role="dialog" aria-modal="true" aria-labelledby="help-title" onMouseDown={(e) => e.stopPropagation()}><button className="modal-close" onClick={() => setShowSummary(false)} aria-label="Cerrar">×</button><p className="eyebrow">Referencia funcional</p><h2 id="help-title">Flujo propuesto</h2><ol><li>El operador se identifica con un usuario personal.</li><li>Busca manualmente la pieza en guarda.</li><li>Registra el resultado, la descripción y las evidencias.</li><li>Revisa y confirma la operación.</li><li>El sistema audita e informa a las integraciones.</li></ol><p className="modal-footnote">Este wireframe reemplaza el uso de usuarios genéricos de la referencia actual por trazabilidad individual.</p><button className="button primary" onClick={() => setShowSummary(false)}>Entendido</button></section></div>}
      {showReceipt && <div className="modal-backdrop" role="presentation" onMouseDown={() => setShowReceipt(false)}><section className="modal receipt" role="dialog" aria-modal="true" aria-labelledby="receipt-title" onMouseDown={(e) => e.stopPropagation()}><button className="modal-close" onClick={() => setShowReceipt(false)} aria-label="Cerrar">×</button><p className="eyebrow">Comprobante provisorio</p><h2 id="receipt-title">Gestión de pieza</h2><dl className="receipt-data"><div><dt>Pieza</dt><dd>{demoPiece.code}</dd></div><div><dt>Resultado</dt><dd>{isDelivered ? 'Entregada' : 'No entregada'}</dd></div><div><dt>Operador</dt><dd>Operador Demo</dd></div><div><dt>Sucursal</dt><dd>018 — Caballito</dd></div></dl><p className="modal-footnote">Formato, numeración e impresión quedan pendientes de definición.</p><button className="button primary" onClick={() => setShowReceipt(false)}>Cerrar comprobante</button></section></div>}
    </main>
  );
}
