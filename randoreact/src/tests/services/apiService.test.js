import { fetchHikes, createHike } from '../../services/apiService'; // Adaptez le chemin

// Mock fetch pour les tests
global.fetch = jest.fn();

describe('API Service', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  test('fetchHikes calls correct endpoint', async () => {
    const mockHikes = [
      { id: 1, name: 'Randonnée Test', difficulty: 2 }
    ];

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockHikes
    });

    const result = await fetchHikes();
    
    expect(fetch).toHaveBeenCalledWith(
      `${process.env.REACT_APP_API_URL}/hikes`,
      expect.objectContaining({
        method: 'GET'
      })
    );
    expect(result).toEqual(mockHikes);
  });

  test('handles API errors gracefully', async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      status: 500
    });

    await expect(fetchHikes()).rejects.toThrow();
  });
});