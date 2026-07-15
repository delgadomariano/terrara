'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/components/CartContext';

export default function CarritoPage() {
  const { items, removeFromCart, clearCart, totalPrice, totalItems } = useCart();
  const [orderPlaced, setOrderPlaced] = useState(false);

  const handleCheckout = () => {
    // In a real app, this would integrate with Mercado Pago
    // For now, we simulate a successful order placement
    clearCart();
    setOrderPlaced(true);
  };

  if (orderPlaced) {
    return (
      <div className="container section" style={{ textAlign: 'center', minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ fontSize: '64px', marginBottom: '24px' }}>🎉</div>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '40px', color: 'var(--primary-color)', marginBottom: '16px' }}>
          ¡Orden Recibida!
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '18px', maxWidth: '500px', marginBottom: '32px' }}>
          Hemos registrado tu pedido temporalmente. Próximamente integraremos la pasarela de pagos para finalizar este proceso.
        </p>
        <Link href="/tienda" className="btn-primary" style={{ padding: '12px 24px', textDecoration: 'none' }}>
          Volver a la Tienda
        </Link>
      </div>
    );
  }

  return (
    <div className="container section">
      <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '40px', color: 'var(--primary-color)', marginBottom: '32px' }}>
        Tu Carrito
      </h1>

      {items.length === 0 ? (
        <div className="glass-panel" style={{ padding: '48px', textAlign: 'center', borderRadius: '16px' }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>🛒</div>
          <h3 style={{ fontSize: '24px', marginBottom: '16px' }}>Tu carrito está vacío</h3>
          <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>
            Aún no has agregado ningún producto a tu carrito de compras.
          </p>
          <Link href="/tienda" className="btn-primary" style={{ padding: '12px 24px', textDecoration: 'none', display: 'inline-block' }}>
            Explorar Tienda
          </Link>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px', alignItems: 'start' }}>
          
          {/* Listado de Productos */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {items.map((item) => (
              <div key={item.id} className="glass-panel" style={{ padding: '16px', borderRadius: '16px', display: 'flex', gap: '24px', alignItems: 'center' }}>
                <div style={{ width: '100px', height: '100px', borderRadius: '8px', overflow: 'hidden', backgroundColor: '#e2e8e4', flexShrink: 0 }}>
                  {item.thumbnail ? (
                    <img src={item.thumbnail} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px' }}>🪴</div>
                  )}
                </div>
                
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '4px' }}>{item.name}</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Cantidad: {item.quantity}</p>
                </div>
                
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '18px', fontWeight: '700', color: 'var(--primary-color)', marginBottom: '8px' }}>
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    style={{ background: 'none', border: 'none', color: '#ef4444', fontSize: '14px', cursor: 'pointer', textDecoration: 'underline' }}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Resumen de Compra */}
          <div className="glass-panel" style={{ padding: '32px', borderRadius: '16px', position: 'sticky', top: '100px' }}>
            <h3 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '24px', borderBottom: '1px solid var(--border-color)', paddingBottom: '16px' }}>
              Resumen
            </h3>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', fontSize: '16px' }}>
              <span style={{ color: 'var(--text-muted)' }}>Productos ({totalItems}):</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px', fontSize: '16px' }}>
              <span style={{ color: 'var(--text-muted)' }}>Envío:</span>
              <span>Por calcular</span>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '32px', fontSize: '20px', fontWeight: '700', borderTop: '1px solid var(--border-color)', paddingTop: '16px' }}>
              <span>Total:</span>
              <span style={{ color: 'var(--accent-color)' }}>${totalPrice.toFixed(2)}</span>
            </div>
            
            <button 
              onClick={handleCheckout}
              className="btn-primary" 
              style={{ width: '100%', padding: '16px', fontSize: '18px', borderRadius: '8px', cursor: 'pointer' }}
            >
              Simular Compra
            </button>
            <p style={{ textAlign: 'center', fontSize: '12px', color: 'var(--text-muted)', marginTop: '16px' }}>
              Mercado Pago se integrará próximamente.
            </p>
          </div>
          
        </div>
      )}
    </div>
  );
}
