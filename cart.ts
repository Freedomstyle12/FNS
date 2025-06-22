import { useState, useEffect } from 'react';

export function useCart() {
  const [cartCount, setCartCount] = useState(0);

  const updateCartCount = (count: number) => {
    setCartCount(count);
  };

  return {
    cartCount,
    updateCartCount,
  };
}

export function generateSessionId(): string {
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15);
}

export function getSessionId(): string {
  let sessionId = localStorage.getItem('sessionId');
  if (!sessionId) {
    sessionId = generateSessionId();
    localStorage.setItem('sessionId', sessionId);
  }
  return sessionId;
}
