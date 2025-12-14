export interface Sweet {
  id: string;
  name: string;
  category: SweetCategory;
  price: number;
  quantity: number;
  image?: string;
  description?: string;
}

export type SweetCategory = 
  | 'chocolate'
  | 'candy'
  | 'gummy'
  | 'lollipop'
  | 'cookie'
  | 'cake'
  | 'other';

export const SWEET_CATEGORIES: { value: SweetCategory; label: string; emoji: string }[] = [
  { value: 'chocolate', label: 'Chocolate', emoji: '🍫' },
  { value: 'candy', label: 'Candy', emoji: '🍬' },
  { value: 'gummy', label: 'Gummy', emoji: '🐻' },
  { value: 'lollipop', label: 'Lollipop', emoji: '🍭' },
  { value: 'cookie', label: 'Cookie', emoji: '🍪' },
  { value: 'cake', label: 'Cake', emoji: '🎂' },
  { value: 'other', label: 'Other', emoji: '✨' },
];

export interface SweetFilters {
  name?: string;
  category?: SweetCategory;
  minPrice?: number;
  maxPrice?: number;
}

export interface User {
  id: string;
  email: string;
  role: 'admin' | 'user';
  name?: string;
}
