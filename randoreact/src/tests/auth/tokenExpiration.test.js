// src/tests/auth/tokenExpiration.test.js

/**
 * Test simple pour la déconnexion automatique en cas de token expiré
 */

// Mock du localStorage
const mockLocalStorage = {
    getItem: jest.fn(),
    removeItem: jest.fn(),
    setItem: jest.fn(),
  };
  Object.defineProperty(window, 'localStorage', { value: mockLocalStorage });
  
  // Mock de window.location
  Object.defineProperty(window, 'location', {
    value: { href: '' },
    writable: true,
  });
  
  describe('🔐 Token Expiration - React', () => {
    
    beforeEach(() => {
      jest.clearAllMocks();
      window.location.href = '';
    });
  
    describe('✅ Tests de base', () => {
      test('Doit détecter un token expiré', () => {
        // Token expiré (septembre 2020)
        const expiredToken = createMockToken(1600000000);
        
        const result = isTokenExpired(expiredToken);
        
        expect(result).toBe(true);
      });
  
      test('Doit accepter un token valide', () => {
        // Token valide (futur)
        const validToken = createMockToken(Math.floor(Date.now() / 1000) + 3600);
        
        const result = isTokenExpired(validToken);
        
        expect(result).toBe(false);
      });
  
      test('Doit rejeter token null/vide', () => {
        expect(isTokenExpired(null)).toBe(true);
        expect(isTokenExpired('')).toBe(true);
        expect(isTokenExpired(undefined)).toBe(true);
      });
    });
  
    describe('🚪 Tests de déconnexion automatique', () => {
      test('Doit déconnecter si token expiré dans localStorage', () => {
        const expiredToken = createMockToken(1600000000);
        mockLocalStorage.getItem.mockReturnValue(expiredToken);
        
        const result = checkAuthAndLogout();
        
        expect(result).toBe(false);
        expect(mockLocalStorage.removeItem).toHaveBeenCalledWith('token');
        expect(mockLocalStorage.removeItem).toHaveBeenCalledWith('user');
        expect(window.location.href).toBe('/login');
      });
  
      test('Doit maintenir la connexion si token valide', () => {
        const validToken = createMockToken(Math.floor(Date.now() / 1000) + 3600);
        mockLocalStorage.getItem.mockReturnValue(validToken);
        
        const result = checkAuthAndLogout();
        
        expect(result).toBe(true);
        expect(mockLocalStorage.removeItem).not.toHaveBeenCalled();
        expect(window.location.href).toBe('');
      });
  
      test('Doit déconnecter si pas de token', () => {
        mockLocalStorage.getItem.mockReturnValue(null);
        
        const result = checkAuthAndLogout();
        
        expect(result).toBe(false);
        expect(window.location.href).toBe('/login');
      });
    });
  });
  
  // 🔧 Fonctions utilitaires à tester
  function isTokenExpired(token) {
    if (!token) return true;
  
    try {
      const parts = token.split('.');
      if (parts.length !== 3) return true;
  
      const payload = JSON.parse(atob(parts[1]));
      const currentTime = Date.now() / 1000;
  
      return payload.exp < currentTime;
    } catch (error) {
      return true;
    }
  }
  
  function checkAuthAndLogout() {
    const token = localStorage.getItem('token');
    
    if (!token || isTokenExpired(token)) {
      // Déconnexion
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
      return false;
    }
    
    return true;
  }
  
  // 🛠️ Helper pour créer des tokens de test
  function createMockToken(expirationTimestamp) {
    const header = btoa(JSON.stringify({ typ: 'JWT', alg: 'HS256' }));
    const payload = btoa(JSON.stringify({ 
      exp: expirationTimestamp,
      user_id: 1,
      email: 'test@example.com'
    }));
    const signature = 'mock-signature';
    
    return `${header}.${payload}.${signature}`;
  }