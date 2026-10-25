import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from './App';

describe('Prueba inicial del proyecto', () => {
    it('se ejecuta correctamente', () => {
        const { container } = render(<App />);
        expect(container).toBeDefined();
    });
});