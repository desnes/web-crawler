import { render, screen } from '@testing-library/react';
import { NewsCard } from './NewsCard';  // Con llaves
import { describe, it, expect } from 'vitest';

describe('NewsCard Component', () => {
  const mockItem = {
    number: 1,
    title: 'Test Title',
    points: 100,
    comments: 42,
    url: 'https://example.com',
  };

  it('renderiza correctamente el título y los puntos', () => {
    render(<NewsCard item={mockItem} />);
    
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('100 points')).toBeInTheDocument();
    expect(screen.getByText('42 comments')).toBeInTheDocument();
  });

  it('el enlace tiene el href correcto', () => {
    render(<NewsCard item={mockItem} />);
    const link = screen.getByRole('link');
    
    expect(link).toHaveAttribute('href', 'https://example.com');
    expect(link).toHaveAttribute('target', '_blank');
  });
});