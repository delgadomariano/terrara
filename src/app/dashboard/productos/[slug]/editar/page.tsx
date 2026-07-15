import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getProductBySlug } from '@/app/actions';
import EditProductForm from './EditProductForm';

export default async function EditarProducto({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const product = await getProductBySlug(resolvedParams.slug);

  if (!product) {
    notFound();
  }

  return (
    <div>
      <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '32px' }}>
        <Link href="/dashboard/productos" style={{ color: 'var(--text-muted)' }}>← Volver</Link>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '32px' }}>Editar Producto</h1>
      </div>
      
      <EditProductForm product={product} />
    </div>
  );
}
