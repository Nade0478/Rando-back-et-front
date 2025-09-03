import { validateEmail, validateHikeData } from '../../utils/validators'; // Adaptez

describe('Validation Utils', () => {
  describe('validateEmail', () => {
    test('validates correct email format', () => {
      expect(validateEmail('test@example.com')).toBe(true);
      expect(validateEmail('user.name@domain.co.uk')).toBe(true);
    });

    test('rejects invalid email format', () => {
      expect(validateEmail('invalid-email')).toBe(false);
      expect(validateEmail('')).toBe(false);
      expect(validateEmail('test@')).toBe(false);
    });
  });

  describe('validateHikeData', () => {
    test('validates complete hike data', () => {
      const validHike = {
        name: 'Test Hike',
        description: 'A beautiful hike',
        latitude: 48.1173,
        longitude: -1.6778,
        difficulty: 3
      };
      
      expect(validateHikeData(validHike)).toBe(true);
    });

    test('rejects incomplete hike data', () => {
      const incompleteHike = {
        name: 'Test Hike'
        // Missing required fields
      };
      
      expect(validateHikeData(incompleteHike)).toBe(false);
    });
  });
});