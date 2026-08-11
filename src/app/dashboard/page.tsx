export default function DashboardHome() {
  return (
    <div>
      <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '32px', marginBottom: '8px' }}>
        Bienvenido todos al Dashboard
      </h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: '32px' }}>
        Resumen de tu plataforma Terrara.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px' }}>
        <div className="glass-panel" style={{ padding: '24px', borderRadius: '16px' }}>
          <h3 style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '8px' }}>Notas de Blog</h3>
          <p style={{ fontSize: '32px', fontWeight: '600', color: 'var(--primary-color)' }}>0</p>
        </div>
        <div className="glass-panel" style={{ padding: '24px', borderRadius: '16px' }}>
          <h3 style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '8px' }}>Productos Activos</h3>
          <p style={{ fontSize: '32px', fontWeight: '600', color: 'var(--primary-color)' }}>0</p>
        </div>
      </div>
    </div>
  );
}
