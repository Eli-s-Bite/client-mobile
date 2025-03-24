export interface Order {
  id: string;
  restaurant: string;
  status: 'ongoing' | 'done';
  total: number;
  date: string;
}

export const ORDERS: Order[] = [
  {
    id: '1',
    restaurant: 'Pizza Palace',
    status: 'ongoing',
    total: 24.99,
    date: '2025-03-23',
  },
  {
    id: '2',
    restaurant: 'Sushi Stop',
    status: 'done',
    total: 35.5,
    date: '2025-03-20',
  },
  {
    id: '3',
    restaurant: 'Burger Barn',
    status: 'ongoing',
    total: 15.75,
    date: '2025-03-23',
  },
  {
    id: '4',
    restaurant: 'Taco Town',
    status: 'done',
    total: 12.0,
    date: '2025-03-19',
  },
  {
    id: '5',
    restaurant: 'Taco Bell',
    status: 'done',
    total: 12.0,
    date: '2025-03-19',
  },
  {
    id: '6',
    restaurant: 'Grill Hav',
    status: 'done',
    total: 12.0,
    date: '2025-03-19',
  },
];
