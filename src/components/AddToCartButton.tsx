'use client';

import { useCart } from './CartContext';

interface AddToCartButtonProps {
  product: {
    id: string;
    name: string;
    price: number;
    thumbnail: string;
  };
  style?: React.CSSProperties;
}

export default function AddToCartButton({ product, style }: AddToCartButtonProps) {
  const { addToCart } = useCart();

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigating to product detail if wrapped in a link
    addToCart(product);
  };

  return (
    <button 
      onClick={handleAdd}
      className="btn-primary" 
      style={{ padding: '12px 24px', fontSize: '16px', zIndex: 10, position: 'relative', width: '100%', cursor: 'pointer', ...style }}
    >
      Agregar al Carrito
    </button>
  );
}
