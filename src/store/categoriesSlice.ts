import { createSlice } from '@reduxjs/toolkit';
import { CategoriesState } from '../types';
import { fetchCategories, addCategory } from './categoriesThunks';

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
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.isLoading = false;
                state.items = action.payload;
            })
            .addCase(fetchCategories.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(addCategory.pending, (state) => {
                state.isAdding = true;
            })
            .addCase(addCategory.fulfilled, (state, action) => {
                state.isAdding = false;
                state.items.push(action.payload); 
            })
            .addCase(addCategory.rejected, (state) => {
                state.isAdding = false;
            });
    },
});

export const categoriesReducer = categoriesSlice.reducer;
