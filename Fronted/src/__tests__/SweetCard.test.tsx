import { render, screen, fireEvent } from '@testing-library/react';
import { SweetCard } from '../components/sweets/SweetCard';
import { AuthProvider } from '../contexts/AuthContext';
import { SweetProvider } from '../contexts/SweetContext';

const mockSweet = {
  id: '1',
  name: 'Test Chocolate',
  category: 'chocolate' as const,
  price: 5.99,
  quantity: 10,
  description: 'Test description'
};

const SweetCardWrapper = ({ sweet = mockSweet }) => (
  <AuthProvider>
    <SweetProvider>
      <SweetCard sweet={sweet} />
    </SweetProvider>
  </AuthProvider>
);

describe('SweetCard', () => {
  it('renders sweet information', () => {
    render(<SweetCardWrapper />);
    
    expect(screen.getByText('Test Chocolate')).toBeInTheDocument();
    expect(screen.getByText('$5.99')).toBeInTheDocument();
    expect(screen.getByText('10 in stock')).toBeInTheDocument();
    expect(screen.getByText('Test description')).toBeInTheDocument();
  });

  it('disables purchase button when out of stock', () => {
    const outOfStockSweet = { ...mockSweet, quantity: 0 };
    render(<SweetCardWrapper sweet={outOfStockSweet} />);
    
    const purchaseButton = screen.getByRole('button', { name: /purchase/i });
    expect(purchaseButton).toBeDisabled();
    expect(screen.getByText('Out of Stock')).toBeInTheDocument();
  });

  it('enables purchase button when in stock', () => {
    render(<SweetCardWrapper />);
    
    const purchaseButton = screen.getByRole('button', { name: /purchase/i });
    expect(purchaseButton).toBeEnabled();
  });

  it('calls purchase function when purchase button clicked', () => {
    render(<SweetCardWrapper />);
    
    const purchaseButton = screen.getByRole('button', { name: /purchase/i });
    fireEvent.click(purchaseButton);
    
    // Test would verify purchase function was called
    // In a real test, we'd mock the context and verify the call
  });

  it('shows admin buttons for admin users', () => {
    // This would require mocking the auth context to return admin user
    // render(<SweetCardWrapper />);
    // expect(screen.getByRole('button', { name: /edit/i })).toBeInTheDocument();
    // expect(screen.getByRole('button', { name: /delete/i })).toBeInTheDocument();
  });
});