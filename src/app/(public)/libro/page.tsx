export default function Libro() {
  return (
    <div className="container section" style={{ display: 'flex', alignItems: 'center', minHeight: '70vh' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '48px', color: 'var(--primary-color)', marginBottom: '24px', lineHeight: '1.1' }}>
            Domina el Arte de los Terrarios
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '18px', marginBottom: '32px', lineHeight: '1.8' }}>
            Mi libro digital te guiará paso a paso desde la elección del recipiente hasta el mantenimiento de tu ecosistema. Más de 100 páginas de puro conocimiento práctico, fotos inspiradoras y secretos de jardinería.
          </p>
          <div style={{ display: 'flex', gap: '16px' }}>
            <a href="https://amazon.com" target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ padding: '16px 32px', fontSize: '18px' }}>
              Comprar en Amazon 📖
            </a>
          </div>
        </div>
        <div style={{ backgroundColor: '#e2e8e4', height: '400px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontSize: '100px' }}>📘</span>
        </div>
      </div>
    </div>
  );
}
