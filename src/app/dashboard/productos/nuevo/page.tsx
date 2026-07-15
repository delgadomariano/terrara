'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { createProduct } from '@/app/actions';

export default function NuevoProducto() {
  const [images, setImages] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (images.length >= 4) {
      alert('Solo puedes subir hasta 4 fotos por producto.');
      return;
    }

    try {
      setIsUploading(true);
      const formData = new FormData();
      formData.append('file', file);
      
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) throw new Error('Falló la subida de imagen');
      
      const data = await response.json();
      setImages(prev => [...prev, data.url]);
    } catch (error) {
      console.error(error);
      alert('Hubo un error al subir la imagen.');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div>
      <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '32px' }}>
        <Link href="/dashboard/productos" style={{ color: 'var(--text-muted)' }}>← Volver</Link>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '32px' }}>Nuevo Producto</h1>
      </div>
      
      <form action={createProduct} className="glass-panel" style={{ padding: '32px', borderRadius: '16px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Nombre del producto</label>
            <input 
              type="text" 
              name="name"
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-color)' }}
              required
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Precio ($)</label>
            <input 
              type="number" 
              name="price"
              min="0"
              step="0.01"
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-color)' }}
              required
            />
          </div>
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Descripción</label>
          <textarea 
            name="description"
            rows={4}
            style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-color)' }}
          ></textarea>
        </div>

        <div style={{ padding: '24px', backgroundColor: '#f9fafb', borderRadius: '8px', border: '1px dashed var(--border-color)' }}>
          <h3 style={{ marginBottom: '16px', fontSize: '18px', color: 'var(--primary-color)' }}>Galería de Imágenes (Hasta 4 fotos)</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '16px' }}>
            Sube fotos de tu producto. La primera foto será la miniatura del catálogo.
          </p>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '16px' }}>
            {images.map((img, index) => (
              <div key={index} style={{ position: 'relative', aspectRatio: '1', backgroundColor: '#e2e8e4', borderRadius: '8px', overflow: 'hidden' }}>
                <img src={img} alt={`Producto ${index + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <button 
                  type="button" 
                  onClick={() => removeImage(index)}
                  style={{ position: 'absolute', top: '4px', right: '4px', background: 'rgba(0,0,0,0.6)', color: 'white', border: 'none', borderRadius: '50%', width: '24px', height: '24px', cursor: 'pointer', fontSize: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  ✕
                </button>
                {index === 0 && (
                  <span style={{ position: 'absolute', bottom: '4px', left: '4px', background: 'var(--primary-color)', color: 'white', fontSize: '10px', padding: '2px 6px', borderRadius: '4px' }}>Principal</span>
                )}
              </div>
            ))}
            
            {images.length < 4 && (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
                style={{ aspectRatio: '1', backgroundColor: 'transparent', border: '2px dashed var(--border-color)', borderRadius: '8px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--text-muted)' }}
              >
                <span style={{ fontSize: '24px', marginBottom: '4px' }}>+</span>
                <span style={{ fontSize: '12px' }}>{isUploading ? 'Subiendo...' : 'Agregar Foto'}</span>
              </button>
            )}
          </div>
          
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleImageUpload}
            style={{ display: 'none' }}
            accept="image/*"
          />
          
          {/* Inputs ocultos para pasar los datos al backend */}
          <input type="hidden" name="thumbnail" value={images[0] || ''} />
          <input type="hidden" name="images" value={images.join(',')} />

          <div style={{ marginTop: '24px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', fontSize: '14px' }}>Video de YouTube (Opcional)</label>
            <input 
              type="url" 
              name="videoUrl"
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-color)' }}
              placeholder="Ej: https://www.youtube.com/watch?v=..."
            />
          </div>
        </div>

        <button type="submit" className="btn-primary" style={{ alignSelf: 'flex-start', marginTop: '16px' }} disabled={images.length === 0}>
          Publicar Producto
        </button>
        {images.length === 0 && <p style={{ color: '#ef4444', fontSize: '14px' }}>Sube al menos una foto para publicar.</p>}
      </form>
    </div>
  );
}
