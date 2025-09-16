// src/tests/services/token.test.js

import tokenService from '../../auth/Token';
import jwtDecode from 'jwt-decode';

// Mock de jwt-decode
jest.mock('jwt-decode', () => ({
    __esModule: true,
    default: jest.fn()
}));

// Mock du localStorage
const mockLocalStorage = {
    getItem: jest.fn(),
    removeItem: jest.fn(),
    setItem: jest.fn(),
};
Object.defineProperty(window, 'localStorage', { value: mockLocalStorage });

// Mock de window.location
Object.defineProperty(window, 'location', {
    value: { href: '', pathname: '/' },
    writable: true,
});

describe('🔐 Token Service Tests', () => {
    
    beforeEach(() => {
        jest.clearAllMocks();
        window.location.href = '';
        window.location.pathname = '/';
    });

    describe('✅ Tests de base', () => {
        test('getToken doit récupérer le token du localStorage', () => {
            mockLocalStorage.getItem.mockReturnValue('mock-token');
            
            const result = tokenService.getToken();
            
            expect(mockLocalStorage.getItem).toHaveBeenCalledWith('access_token');
            expect(result).toBe('mock-token');
        });

        test('getToken doit retourner null si pas de token', () => {
            mockLocalStorage.getItem.mockReturnValue(null);
            
            const result = tokenService.getToken();
            
            expect(result).toBeNull();
        });
    });

    describe('🔍 Tests de décodage', () => {
        test('getDecodedToken doit décoder un token valide', () => {
            const mockDecoded = { exp: Math.floor(Date.now() / 1000) + 3600, email: 'test@example.com' };
            mockLocalStorage.getItem.mockReturnValue('valid-token');
            jwtDecode.mockReturnValue(mockDecoded);
            
            const result = tokenService.getDecodedToken();
            
            expect(jwtDecode).toHaveBeenCalledWith('valid-token');
            expect(result).toEqual(mockDecoded);
        });

        test('getDecodedToken doit gérer un token invalide', () => {
            mockLocalStorage.getItem.mockReturnValue('invalid-token');
            jwtDecode.mockImplementation(() => {
                throw new Error('Invalid token');
            });
            
            const result = tokenService.getDecodedToken();
            
            expect(result).toBe(false);
            expect(mockLocalStorage.removeItem).toHaveBeenCalledWith('access_token');
        });
    });

    describe('⏰ Tests d\'expiration', () => {
        test('isTokenExpired doit détecter un token expiré', () => {
            const expiredToken = { exp: Math.floor(Date.now() / 1000) - 3600 }; // Expiré il y a 1h
            mockLocalStorage.getItem.mockReturnValue('expired-token');
            jwtDecode.mockReturnValue(expiredToken);
            
            const result = tokenService.isTokenExpired();
            
            expect(result).toBe(true);
        });

        test('isTokenExpired doit valider un token encore valide', () => {
            const validToken = { exp: Math.floor(Date.now() / 1000) + 3600 }; // Expire dans 1h
            mockLocalStorage.getItem.mockReturnValue('valid-token');
            jwtDecode.mockReturnValue(validToken);
            
            const result = tokenService.isTokenExpired();
            
            expect(result).toBe(false);
        });

        test('getExpiryTime doit supprimer un token expiré', () => {
            const expiredToken = { exp: Math.floor(Date.now() / 1000) - 3600 };
            mockLocalStorage.getItem.mockReturnValue('expired-token');
            jwtDecode.mockReturnValue(expiredToken);
            
            const result = tokenService.getExpiryTime();
            
            expect(result).toBe(false);
            expect(mockLocalStorage.removeItem).toHaveBeenCalledWith('access_token');
            expect(mockLocalStorage.removeItem).toHaveBeenCalledWith('user');
        });

        test('getExpiryTime doit valider un token encore valide', () => {
            const validToken = { exp: Math.floor(Date.now() / 1000) + 3600 };
            mockLocalStorage.getItem.mockReturnValue('valid-token');
            jwtDecode.mockReturnValue(validToken);
            
            const result = tokenService.getExpiryTime();
            
            expect(result).toBe(true);
            expect(mockLocalStorage.removeItem).not.toHaveBeenCalled();
        });
    });

    describe('👤 Tests des données utilisateur', () => {
        beforeEach(() => {
            const validToken = { 
                exp: Math.floor(Date.now() / 1000) + 3600,
                email: 'test@example.com',
                roles: '["ROLE_USER"]'
            };
            mockLocalStorage.getItem.mockReturnValue('valid-token');
            jwtDecode.mockReturnValue(validToken);
        });

        test('getEmail doit retourner l\'email de l\'utilisateur', () => {
            const result = tokenService.getEmail();
            
            expect(result).toBe('test@example.com');
        });

        test('getRoles doit retourner les rôles de l\'utilisateur', () => {
            const result = tokenService.getRoles();
            
            expect(result).toBe('ROLE_USER');
        });

        test('loggedAndAdmin doit détecter un utilisateur admin', () => {
            const adminToken = { 
                exp: Math.floor(Date.now() / 1000) + 3600,
                email: 'admin@example.com',
                roles: '["ROLE_ADMIN"]'
            };
            jwtDecode.mockReturnValue(adminToken);
            
            const result = tokenService.loggedAndAdmin();
            
            expect(result).toBe(true);
        });

        test('loggedAndAdmin doit retourner false pour un utilisateur normal', () => {
            const result = tokenService.loggedAndAdmin();
            
            expect(result).toBe(false);
        });
    });

    describe('🚪 Tests de déconnexion automatique', () => {
        test('handleTokenExpiration doit déconnecter si token expiré', () => {
            const expiredToken = { exp: Math.floor(Date.now() / 1000) - 3600 };
            mockLocalStorage.getItem.mockReturnValue('expired-token');
            jwtDecode.mockReturnValue(expiredToken);
            
            const result = tokenService.handleTokenExpiration();
            
            expect(result).toBe(true);
            expect(mockLocalStorage.removeItem).toHaveBeenCalledWith('access_token');
            expect(mockLocalStorage.removeItem).toHaveBeenCalledWith('user');
            expect(mockLocalStorage.removeItem).toHaveBeenCalledWith('preferences');
            expect(window.location.href).toBe('/login');
        });

        test('handleTokenExpiration ne doit pas déconnecter si token valide', () => {
            const validToken = { exp: Math.floor(Date.now() / 1000) + 3600 };
            mockLocalStorage.getItem.mockReturnValue('valid-token');
            jwtDecode.mockReturnValue(validToken);
            
            const result = tokenService.handleTokenExpiration();
            
            expect(result).toBe(false);
            expect(mockLocalStorage.removeItem).not.toHaveBeenCalled();
            expect(window.location.href).toBe('');
        });
    });

    describe('⏱️ Tests de vérification périodique', () => {
        test('startTokenExpirationCheck doit démarrer une vérification périodique', () => {
            jest.useFakeTimers();
            const expiredToken = { exp: Math.floor(Date.now() / 1000) - 3600 };
            mockLocalStorage.getItem.mockReturnValue('expired-token');
            jwtDecode.mockReturnValue(expiredToken);
            
            const intervalId = tokenService.startTokenExpirationCheck();
            
            // Avancer de 5 minutes
            jest.advanceTimersByTime(5 * 60 * 1000);
            
            expect(mockLocalStorage.removeItem).toHaveBeenCalledWith('access_token');
            expect(window.location.href).toBe('/login');
            
            clearInterval(intervalId);
            jest.useRealTimers();
        });
    });

    describe('📊 Tests utilitaires', () => {
        test('getTimeUntilExpiration doit calculer le temps restant', () => {
            const futureTime = Math.floor(Date.now() / 1000) + 1800; // Dans 30 minutes
            const validToken = { exp: futureTime };
            mockLocalStorage.getItem.mockReturnValue('valid-token');
            jwtDecode.mockReturnValue(validToken);
            
            const result = tokenService.getTimeUntilExpiration();
            
            expect(result).toBeGreaterThan(1700); // Environ 30 minutes
            expect(result).toBeLessThan(1800);
        });

        test('isAuthenticated doit retourner true pour un utilisateur connecté', () => {
            const validToken = { exp: Math.floor(Date.now() / 1000) + 3600 };
            mockLocalStorage.getItem.mockReturnValue('valid-token');
            jwtDecode.mockReturnValue(validToken);
            
            const result = tokenService.isAuthenticated();
            
            expect(result).toBe(true);
        });

        test('isAuthenticated doit retourner false pour un token expiré', () => {
            const expiredToken = { exp: Math.floor(Date.now() / 1000) - 3600 };
            mockLocalStorage.getItem.mockReturnValue('expired-token');
            jwtDecode.mockReturnValue(expiredToken);
            
            const result = tokenService.isAuthenticated();
            
            expect(result).toBe(false);
        });
    });
});