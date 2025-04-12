
export interface Component {
  id: string;
  name: string;
  totalQuantity: number;
  availableQuantity: number;
  description?: string;
  expectedRestock?: Date;
  imageUrl?: string;
}

export interface LendingRecord {
  id: string;
  rollNumber: string;
  componentId: string;
  componentName: string;
  quantity: number;
  borrowDate: Date;
  returnDate: Date | null;
  purpose?: string;
  status: 'pending' | 'approved' | 'rejected' | 'returned' | 'return-pending';
}

export interface Student {
  rollNumber: string;
  name?: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'borrow-request' | 'return-request';
  lendingId: string;
  date: Date;
  read: boolean;
}
