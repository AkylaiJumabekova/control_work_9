import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Category {
    id: string;
    type: 'income' | 'expense';
    name: string;
}

export interface CategoriesState {
    items: Category[];
}

const initialState: CategoriesState = {
    items: [],
};

const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        addCategory: (state, action: PayloadAction<Category>) => {
            state.items.push(action.payload);
        },
        updateCategory: (state, action: PayloadAction<Category>) => {
            const index = state.items.findIndex((category) => category.id === action.payload.id);
            if (index !== -1) {
                state.items[index] = action.payload;
            }
        },
        deleteCategory: (state, action: PayloadAction<string>) => {
            const index = state.items.findIndex((category) => category.id === action.payload);
            if (index !== -1) {
                state.items.splice(index, 1);
            }
        },
    },
});

export const { addCategory, updateCategory, deleteCategory } = categoriesSlice.actions;

export default categoriesSlice.reducer;
