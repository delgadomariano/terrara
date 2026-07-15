import Link from 'next/link';
import { getProducts } from '@/app/actions';
import AddToCartButton from '@/components/AddToCartButton';

export default async function Tienda() {
  const products = await getProducts();

  return (
    <div className="container section">
      <div style={{ textAlign: 'center', marginBottom: '48px' }}>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '48px', color: 'var(--primary-color)', marginBottom: '16px' }}>
          Nuestra Tienda
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '18px', maxWidth: '600px', margin: '0 auto' }}>
          Encuentra los mejores terrarios, macetas de diseño e implementos de jardinería para transformar tu espacio.
        </p>
      </div>

      {products.length === 0 ? (
        <div style={{ textAlign: 'center', color: 'var(--text-muted)' }}>
          <p>Pronto publicaremos nuestros primeros productos...</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '32px' }}>
          {products.map(product => (
            <Link href={`/tienda/${product.slug}`} key={product.id} style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="glass-panel hover-lift" style={{ borderRadius: '16px', overflow: 'hidden', display: 'flex', flexDirection: 'column', height: '100%' }}>
                <div style={{ height: '280px', backgroundColor: '#e2e8e4', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                  {product.thumbnail ? (
                    <img src={product.thumbnail} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <span style={{ fontSize: '48px' }}>🪴</span>
                  )}
                </div>
                <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '20px', marginBottom: '8px' }}>{product.name}</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '16px', height: '44px', overflow: 'hidden' }}>
                    {product.description || 'Sin descripción'}
                  </p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                    <span style={{ fontSize: '20px', fontWeight: '700', color: 'var(--primary-color)' }}>${product.price.toFixed(2)}</span>
                    <AddToCartButton product={{ id: product.id, name: product.name, price: product.price, thumbnail: product.thumbnail || '' }} />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
