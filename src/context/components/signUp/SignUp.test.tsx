import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import SignUp from './SignUp';

describe('Pruebas unitarias de SignUp', () => {
    it('debe renderizar el formulario correctamente', () => {
        render(<SignUp />);
        // Verifica que los inputs o botones estén presentes
        expect(screen.getByRole('button')).toBeDefined();
    });

    it('debe simular el evento de clic en el botón', () => {
        render(<SignUp />);
        const button = screen.getByRole('button');
        fireEvent.click(button);
        expect(button).toBeDefined();
    });
});