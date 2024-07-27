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