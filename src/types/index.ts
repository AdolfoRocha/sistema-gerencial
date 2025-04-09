export interface Invoice {
  id: string;
  number: string;
  amount: number;
  status: 'paid' | 'pending';
  dueDate: string;
  client: string;
}

export interface Tax {
  id: string;
  type: string;
  amount: number;
  dueDate: string;
  status: 'paid' | 'pending';
}

export interface Document {
  id: string;
  name: string;
  type: string;
  uploadDate: string;
  size: string;
}

export interface MonthlyRevenue {
  month: string;
  amount: number;
}