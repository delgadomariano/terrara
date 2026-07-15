'use client';

import { useState, useRef } from 'react';
import TiptapEditor from '@/components/TiptapEditor';
import Link from 'next/link';
import { createPost } from '@/app/actions';

export default function NuevoPost() {
  const [content, setContent] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [coverImageUrl, setCoverImageUrl] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleCoverUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

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
      setCoverImageUrl(data.url);
    } catch (error) {
      console.error(error);
      alert('Hubo un error al subir la imagen de portada.');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '32px' }}>
        <Link href="/dashboard/blog" style={{ color: 'var(--text-muted)' }}>← Volver</Link>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '32px' }}>Nueva Nota</h1>
      </div>
      
      <form action={createPost} className="glass-panel" style={{ padding: '32px', borderRadius: '16px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Título de la nota</label>
          <input 
            type="text" 
            name="title"
            style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-color)' }}
            placeholder="Ej: Cómo cuidar un terrario cerrado..."
            required
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Imagen de Portada</label>
          
          {coverImageUrl ? (
            <div style={{ marginBottom: '16px', position: 'relative', width: 'fit-content' }}>
              <img src={coverImageUrl} alt="Portada" style={{ height: '200px', borderRadius: '8px', objectFit: 'cover' }} />
              <button 
                type="button" 
                onClick={() => setCoverImageUrl('')}
                style={{ position: 'absolute', top: '8px', right: '8px', background: 'rgba(0,0,0,0.5)', color: 'white', border: 'none', borderRadius: '50%', width: '28px', height: '28px', cursor: 'pointer' }}
              >
                ✕
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
                className="btn-primary"
                style={{ background: 'var(--accent-color)', padding: '8px 16px', fontSize: '14px' }}
              >
                {isUploading ? 'Subiendo...' : 'Seleccionar Imagen'}
              </button>
              <span style={{ color: 'var(--text-muted)', fontSize: '14px' }}>
                Recomendado: 1200x600px
              </span>
            </div>
          )}
          
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleCoverUpload}
            style={{ display: 'none' }}
            accept="image/*"
          />
          {/* Hidden input to pass the URL to the server action */}
          <input type="hidden" name="imageUrl" value={coverImageUrl} />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Contenido</label>
          <TiptapEditor content={content} onChange={setContent} />
          {/* Hidden input to pass Tiptap content to FormData */}
          <input type="hidden" name="content" value={content} />
        </div>

        <button type="submit" className="btn-primary" style={{ alignSelf: 'flex-start', marginTop: '16px' }}>
          Publicar Nota
        </button>
      </form>
    </div>
  );
}
