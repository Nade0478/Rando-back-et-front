import React from 'react';

describe('App Component', () => {
  test('basic test passes', () => {
    expect(1 + 1).toBe(2);
  });
  
  test('can import React', () => {
    expect(React).toBeDefined();
  });
});