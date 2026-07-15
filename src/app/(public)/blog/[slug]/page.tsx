import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getPostBySlug } from '@/app/actions';

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const post = await getPostBySlug(resolvedParams.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="container section">
      <Link href="/blog" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', marginBottom: '32px', textDecoration: 'none', fontWeight: '500' }}>
        ← Volver al blog
      </Link>
      
      <article className="glass-panel" style={{ padding: '0', overflow: 'hidden', borderRadius: '24px' }}>
        {post.imageUrl && (
          <div style={{ width: '100%', height: '400px', backgroundColor: '#e2e8e4' }}>
            <img 
              src={post.imageUrl} 
              alt={post.title} 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
            />
          </div>
        )}
        
        <div style={{ padding: '48px', maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ marginBottom: '32px', textAlign: 'center' }}>
            <span style={{ display: 'inline-block', backgroundColor: 'rgba(212, 163, 115, 0.2)', color: 'var(--accent-color)', padding: '6px 16px', borderRadius: 'var(--radius-full)', fontSize: '14px', fontWeight: '600', marginBottom: '16px' }}>
              {new Date(post.createdAt).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
            </span>
            <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '48px', color: 'var(--primary-color)', lineHeight: '1.2' }}>
              {post.title}
            </h1>
          </div>
          
          <div 
            className="prose"
            style={{ 
              fontSize: '18px', 
              lineHeight: '1.8', 
              color: 'var(--text-color)',
            }}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      </article>
    </div>
  );
}
