import Link from 'next/link';
import { getPosts } from '@/app/actions';

export default async function BlogDashboard() {
  const posts = await getPosts();

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '32px' }}>Gestión de Blog</h1>
        <Link href="/dashboard/blog/nuevo" className="btn-primary">
          + Nueva Nota
        </Link>
      </div>
      
      {posts.length === 0 ? (
        <div className="glass-panel" style={{ padding: '24px', borderRadius: '16px' }}>
          <p style={{ color: 'var(--text-muted)' }}>Aún no hay notas publicadas.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {posts.map(post => (
            <div key={post.id} className="glass-panel" style={{ padding: '16px 24px', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3 style={{ fontWeight: '600' }}>{post.title}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>
                  {new Date(post.createdAt).toLocaleDateString()}
                </p>
              </div>
              
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <span style={{ fontSize: '12px', padding: '4px 12px', borderRadius: '16px', backgroundColor: '#e2e8e4', color: 'var(--primary-color)' }}>
                  {post.published ? 'Publicado' : 'Borrador'}
                </span>
                <Link href={`/dashboard/blog/${post.slug}/editar`} style={{ padding: '6px 12px', border: '1px solid var(--border-color)', borderRadius: '8px', fontSize: '14px' }}>
                  Editar
                </Link>
                <form action={async () => {
                  'use server';
                  const { deletePost } = await import('@/app/actions');
                  await deletePost(post.id);
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
