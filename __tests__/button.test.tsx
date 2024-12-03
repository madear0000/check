import { render, fireEvent, screen, cleanup } from '@testing-library/react';
import Button from '../src/button/button';
import { describe, it, expect, vi, afterEach } from 'vitest';
import React from 'react';

describe('check function', () => {
    afterEach(() => {
        cleanup();
    })
    it('should call onClick function when button is clicked', () => {
        const handleClick = vi.fn(); 
        render(<Button onClick={handleClick}>Click</Button>);

        const button = screen.getByRole('button', { name: /click/i }); 

        fireEvent.click(button); 
        expect(handleClick).toHaveBeenCalledTimes(1);
    });
    it('should check that button cannot be presed if it disabled', () => {
        const handleClick = vi.fn(); 
        render(<Button onClick={handleClick} isDisabled={true}>Click</Button>);

        const button = screen.getByRole('button', { name: /click/i }); 

        fireEvent.click(button); 
        expect(handleClick).toHaveBeenCalledTimes(0);
    });
});
