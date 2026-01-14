import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

describe('Simple Test', () => {
    it('should verify that true is true', () => {
        expect(true).toBe(true);
    });

    it('should be able to render a simple element', () => {
        render(<div data-testid="test-div">Hello World</div>);
        const element = screen.getByTestId('test-div');
        expect(element).toBeInTheDocument();
        expect(element).toHaveTextContent('Hello World');
    });
});
