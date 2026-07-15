import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getProductBySlug } from '@/app/actions';
import AddToCartButton from '@/components/AddToCartButton';
import ProductCarousel from '@/components/ProductCarousel';

export default async function ProductDetail({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const product = await getProductBySlug(resolvedParams.slug);

  if (!product) {
    notFound();
  }

  // Combine thumbnail and images to create the full image list
  const images = [];
  if (product.thumbnail) images.push(product.thumbnail);
  if (product.images && product.images.length > 0) {
    product.images.forEach(img => {
      if (img.url !== product.thumbnail) {
        images.push(img.url);
      }
    });
  }

  const videoUrl = product.videos && product.videos.length > 0 ? product.videos[0].url : null;

  return (
    <div className="container section">
      <Link href="/tienda" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', marginBottom: '32px', textDecoration: 'none', fontWeight: '500' }}>
        ← Volver a la Tienda
      </Link>
      
      <div className="glass-panel" style={{ padding: '32px', borderRadius: '24px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '48px', alignItems: 'start' }}>
        
        {/* Left Column: Carousel */}
        <div>
          <ProductCarousel images={images} videoUrl={videoUrl} />
        </div>
        
        {/* Right Column: Product Info */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '40px', color: 'var(--primary-color)', lineHeight: '1.2', marginBottom: '16px' }}>
            {product.name}
          </h1>
          
          <div style={{ fontSize: '32px', fontWeight: '700', color: 'var(--accent-color)', marginBottom: '24px' }}>
            ${product.price.toFixed(2)}
          </div>
          
          <div style={{ marginBottom: '32px' }}>
            <h3 style={{ fontSize: '18px', marginBottom: '8px', fontWeight: '600' }}>Descripción</h3>
            <p style={{ color: 'var(--text-color)', lineHeight: '1.6', fontSize: '16px', whiteSpace: 'pre-wrap' }}>
              {product.description || 'Este producto no tiene descripción detallada.'}
            </p>
          </div>
          
          <div style={{ marginTop: 'auto', paddingTop: '32px', borderTop: '1px solid var(--border-color)' }}>
            <div style={{ width: '100%' }}>
              <AddToCartButton product={{ id: product.id, name: product.name, price: product.price, thumbnail: product.thumbnail || '' }} />
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginTop: '16px', textAlign: 'center' }}>
              Garantía de satisfacción Terrara 🌱
            </p>
          </div>
        </div>
        
      </div>
    </div>
  );
}
