import Link from 'next/link';
import { getProducts } from '@/app/actions';

export default async function ProductosDashboard() {
  const products = await getProducts();

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '32px' }}>Gestión de Productos</h1>
        <Link href="/dashboard/productos/nuevo" className="btn-primary">
          + Nuevo Producto
        </Link>
      </div>
      
      {products.length === 0 ? (
        <div className="glass-panel" style={{ padding: '24px', borderRadius: '16px' }}>
          <p style={{ color: 'var(--text-muted)' }}>No tienes productos activos en la tienda.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {products.map(product => (
            <div key={product.id} className="glass-panel" style={{ padding: '16px 24px', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                {product.thumbnail ? (
                  <img src={product.thumbnail} alt={product.name} style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '8px' }} />
                ) : (
                  <div style={{ width: '60px', height: '60px', backgroundColor: '#eee', borderRadius: '8px' }}></div>
                )}
                <div>
                  <h3 style={{ fontWeight: '600' }}>{product.name}</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>${product.price.toFixed(2)}</p>
                </div>
              </div>
              
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <span style={{ fontSize: '12px', padding: '4px 12px', borderRadius: '16px', backgroundColor: '#e2e8e4', color: 'var(--primary-color)' }}>
                  {product.published ? 'Publicado' : 'Borrador'}
                </span>
                <Link href={`/dashboard/productos/${product.slug}/editar`} style={{ padding: '6px 12px', border: '1px solid var(--border-color)', borderRadius: '8px', fontSize: '14px' }}>
                  Editar
                </Link>
                <form action={async () => {
                  'use server';
                  const { deleteProduct } = await import('@/app/actions');
                  await deleteProduct(product.id);
                }}>
                  <button type="submit" style={{ padding: '6px 12px', border: '1px solid #fca5a5', color: '#ef4444', backgroundColor: '#fef2f2', borderRadius: '8px', fontSize: '14px', cursor: 'pointer' }}>
                    Borrar
                  </button>
                </form>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
