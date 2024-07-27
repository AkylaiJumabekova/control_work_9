import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CategoriesState, Category } from '../types';
import { fetchCategories, addCategory, updateCategory, deleteCategory } from './categoriesThunks';

const initialState: CategoriesState = {
    items: [],
    isLoading: false,
    isAdding: false,
};

const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategories.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchCategories.fulfilled, (state, action: PayloadAction<Category[]>) => {
                state.isLoading = false;
                state.items = action.payload;
            })
            .addCase(fetchCategories.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(addCategory.pending, (state) => {
                state.isAdding = true;
            })
            .addCase(addCategory.fulfilled, (state, action: PayloadAction<Category>) => {
                state.isAdding = false;
                state.items.push(action.payload);
            })
            .addCase(addCategory.rejected, (state) => {
                state.isAdding = false;
            })
            .addCase(updateCategory.fulfilled, (state, action: PayloadAction<Category>) => {
                const index = state.items.findIndex(category => category.id === action.payload.id);
                if (index !== -1) {
                    state.items[index] = action.payload;
                }
            })
            .addCase(deleteCategory.fulfilled, (state, action: PayloadAction<string>) => {
                const index = state.items.findIndex(category => category.id === action.payload);
                if (index !== -1) {
                    state.items.splice(index, 1);
                }
            });
    },
});

export const categoriesReducer = categoriesSlice.reducer;
