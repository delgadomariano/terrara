'use client';

import { useState } from 'react';

interface ProductCarouselProps {
  images: string[];
  videoUrl?: string | null;
}

export default function ProductCarousel({ images, videoUrl }: ProductCarouselProps) {
  const mediaItems = [...images];
  
  let videoEmbedUrl = '';
  if (videoUrl) {
    // Extract video ID for YouTube embed
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = videoUrl.match(regExp);
    if (match && match[2].length === 11) {
      videoEmbedUrl = `https://www.youtube.com/embed/${match[2]}`;
      mediaItems.push(videoEmbedUrl);
    }
  }

  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Main View */}
      <div style={{ width: '100%', aspectRatio: '1', backgroundColor: '#e2e8e4', borderRadius: '16px', overflow: 'hidden', position: 'relative' }}>
        {mediaItems.length === 0 ? (
          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: '64px' }}>🪴</span>
          </div>
        ) : videoEmbedUrl && activeIndex === mediaItems.length - 1 ? (
          <iframe 
            width="100%" 
            height="100%" 
            src={videoEmbedUrl} 
            title="YouTube video player" 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen
            style={{ position: 'absolute', top: 0, left: 0 }}
          ></iframe>
        ) : (
          <img 
            src={mediaItems[activeIndex]} 
            alt="Producto" 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
          />
        )}
      </div>

      {/* Thumbnails */}
      {mediaItems.length > 1 && (
        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '8px' }}>
          {mediaItems.map((item, index) => {
            const isVideo = videoEmbedUrl && index === mediaItems.length - 1;
            const isActive = activeIndex === index;
            
            return (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                style={{
                  width: '80px',
                  height: '80px',
                  flexShrink: 0,
                  border: isActive ? '2px solid var(--primary-color)' : '2px solid transparent',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  position: 'relative',
                  padding: 0,
                  backgroundColor: '#e2e8e4'
                }}
              >
                {isVideo ? (
                  <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#000', color: '#fff' }}>
                    ▶
                  </div>
                ) : (
                  <img src={item} alt={`Miniatura ${index + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
