import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Sweet, SweetFilters } from '@/types/sweet';
import { mockSweets } from '@/lib/mock-data';
import { toast } from 'sonner';

interface SweetContextType {
  sweets: Sweet[];
  filters: SweetFilters;
  filteredSweets: Sweet[];
  setFilters: (filters: SweetFilters) => void;
  addSweet: (sweet: Omit<Sweet, 'id'>) => void;
  updateSweet: (id: string, updates: Partial<Sweet>) => void;
  deleteSweet: (id: string) => void;
  purchaseSweet: (id: string) => boolean;
  restockSweet: (id: string, quantity: number) => void;
}

const SweetContext = createContext<SweetContextType | undefined>(undefined);

export const SweetProvider = ({ children }: { children: ReactNode }) => {
  const [sweets, setSweets] = useState<Sweet[]>(mockSweets);
  const [filters, setFilters] = useState<SweetFilters>({});

  const filteredSweets = sweets.filter((sweet) => {
    if (filters.name && !sweet.name.toLowerCase().includes(filters.name.toLowerCase())) {
      return false;
    }
    if (filters.category && sweet.category !== filters.category) {
      return false;
    }
    if (filters.minPrice !== undefined && sweet.price < filters.minPrice) {
      return false;
    }
    if (filters.maxPrice !== undefined && sweet.price > filters.maxPrice) {
      return false;
    }
    return true;
  });

  const addSweet = (sweetData: Omit<Sweet, 'id'>) => {
    const newSweet: Sweet = {
      ...sweetData,
      id: `sweet-${Date.now()}`,
    };
    setSweets((prev) => [...prev, newSweet]);
    toast.success(`${newSweet.name} added to inventory!`);
  };

  const updateSweet = (id: string, updates: Partial<Sweet>) => {
    setSweets((prev) =>
      prev.map((sweet) => (sweet.id === id ? { ...sweet, ...updates } : sweet))
    );
    toast.success('Sweet updated successfully!');
  };

  const deleteSweet = (id: string) => {
    const sweet = sweets.find((s) => s.id === id);
    setSweets((prev) => prev.filter((sweet) => sweet.id !== id));
    toast.success(`${sweet?.name || 'Sweet'} removed from inventory`);
  };

  const purchaseSweet = (id: string): boolean => {
    const sweet = sweets.find((s) => s.id === id);
    if (!sweet || sweet.quantity <= 0) {
      toast.error('This item is out of stock');
      return false;
    }

    setSweets((prev) =>
      prev.map((s) => (s.id === id ? { ...s, quantity: s.quantity - 1 } : s))
    );
    toast.success(`Purchased ${sweet.name}! 🎉`);
    return true;
  };

  const restockSweet = (id: string, quantity: number) => {
    setSweets((prev) =>
      prev.map((sweet) =>
        sweet.id === id ? { ...sweet, quantity: sweet.quantity + quantity } : sweet
      )
    );
    const sweet = sweets.find((s) => s.id === id);
    toast.success(`Restocked ${sweet?.name} with ${quantity} units`);
  };

  return (
    <SweetContext.Provider
      value={{
        sweets,
        filters,
        filteredSweets,
        setFilters,
        addSweet,
        updateSweet,
        deleteSweet,
        purchaseSweet,
        restockSweet,
      }}
    >
      {children}
    </SweetContext.Provider>
  );
};

export const useSweets = () => {
  const context = useContext(SweetContext);
  if (context === undefined) {
    throw new Error('useSweets must be used within a SweetProvider');
  }
  return context;
};
