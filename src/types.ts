export interface Category {
    id: string;
    name: string;
    type: 'income' | 'expense';
}

export interface CategoriesState {
    items: Category[];
    isLoading: boolean;
    isAdding: boolean;
}

export interface Transaction {
    id: string;
    category: string;
    amount: number;
    type: 'income' | 'expense';
    createdAt: string;
}

export interface TransactionsState {
    items: Transaction[];
    isLoading: boolean;
    isAdding: boolean;
}
