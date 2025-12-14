import { Sweet, User } from '@/types/sweet';

export const mockSweets: Sweet[] = [
  {
    id: '1',
    name: 'Belgian Dark Chocolate',
    category: 'chocolate',
    price: 750,
    quantity: 25,
    description: 'Rich and creamy dark chocolate imported from Belgium',
  },
  {
    id: '2',
    name: 'Rainbow Gummy Bears',
    category: 'gummy',
    price: 420,
    quantity: 50,
    description: 'Colorful assorted gummy bears in six fruity flavors',
  },
  {
    id: '3',
    name: 'Strawberry Swirl Lollipop',
    category: 'lollipop',
    price: 210,
    quantity: 100,
    description: 'Classic strawberry flavored swirl lollipop',
  },
  {
    id: '4',
    name: 'Vanilla Dream Cookie',
    category: 'cookie',
    price: 335,
    quantity: 0,
    description: 'Soft-baked vanilla cookies with white chocolate chips',
  },
  {
    id: '5',
    name: 'Sour Watermelon Strips',
    category: 'candy',
    price: 290,
    quantity: 75,
    description: 'Tangy sour watermelon flavored candy strips',
  },
  {
    id: '6',
    name: 'Red Velvet Cupcake',
    category: 'cake',
    price: 500,
    quantity: 15,
    description: 'Moist red velvet cupcake with cream cheese frosting',
  },
  {
    id: '7',
    name: 'Caramel Sea Salt Truffle',
    category: 'chocolate',
    price: 1080,
    quantity: 20,
    description: 'Luxurious caramel truffles with a hint of sea salt',
  },
  {
    id: '8',
    name: 'Tropical Fruit Gummies',
    category: 'gummy',
    price: 460,
    quantity: 40,
    description: 'Exotic fruit shaped gummies with tropical flavors',
  },
];

export const mockUser: User = {
  id: 'user-1',
  email: 'demo@sweetshop.com',
  role: 'admin',
  name: 'Sweet Shop Admin',
};
