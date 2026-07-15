import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getPostBySlug } from '@/app/actions';
import EditForm from './EditForm';

export default async function EditarPost({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const post = await getPostBySlug(resolvedParams.slug);

  if (!post) {
    notFound();
  }

  return (
    <div>
      <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '32px' }}>
        <Link href="/dashboard/blog" style={{ color: 'var(--text-muted)' }}>← Volver</Link>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '32px' }}>Editar Nota</h1>
      </div>
      
      <EditForm post={post} />
    </div>
  );
}
