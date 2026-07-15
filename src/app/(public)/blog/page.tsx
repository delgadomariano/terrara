import Link from 'next/link';
import { getPosts } from '@/app/actions';

export default async function Blog() {
  const posts = await getPosts();

  return (
    <div className="container section">
      <div style={{ textAlign: 'center', marginBottom: '48px' }}>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '48px', color: 'var(--primary-color)', marginBottom: '16px' }}>
          Blog de Terrara
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '18px', maxWidth: '600px', margin: '0 auto' }}>
          Consejos, guías e inspiración sobre el cuidado de plantas exóticas y la creación de terrarios.
        </p>
      </div>

      {posts.length === 0 ? (
        <div style={{ textAlign: 'center', color: 'var(--text-muted)' }}>
          <p>Pronto publicaremos nuestros primeros artículos...</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '32px' }}>
          {posts.map(post => (
            <div key={post.id} className="glass-panel hover-lift" style={{ borderRadius: '16px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
              <div style={{ height: '240px', backgroundColor: '#e2e8e4', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                {post.imageUrl ? (
                  <img src={post.imageUrl} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <span style={{ fontSize: '48px' }}>🌱</span>
                )}
              </div>
              <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
                  <span style={{ backgroundColor: 'rgba(212, 163, 115, 0.2)', color: 'var(--accent-color)', padding: '4px 12px', borderRadius: 'var(--radius-full)', fontSize: '12px', fontWeight: '600' }}>
                    {new Date(post.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '20px', marginBottom: '12px' }}>
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h3>
                <Link href={`/blog/${post.slug}`} style={{ color: 'var(--primary-color)', fontWeight: '600', fontSize: '14px', marginTop: 'auto' }}>Leer artículo →</Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
