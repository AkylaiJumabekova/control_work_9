import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../axiosApi';
import { Category } from '../types';
import { RootState } from '../app/store';

export const fetchCategories = createAsyncThunk<Category[], void, { state: RootState }>(
    'categories/fetchCategories',
    async () => {
        const response = await axiosApi.get<Record<string, Category>>('/categories.json');
        const categories = response.data
            ? Object.keys(response.data).map((key) => ({
                ...response.data[key],
                id: key,
            }))
            : [];
        return categories;
    }
);

export const addCategory = createAsyncThunk<Category, Category, { state: RootState }>(
    'categories/addCategory',
    async (category) => {
        const response = await axiosApi.post('/categories.json', category);
        return { ...category, id: response.data.name };
    }
);

export const updateCategory = createAsyncThunk<Category, Category, { state: RootState }>(
    'categories/updateCategory',
    async (category) => {
        await axiosApi.put(`/categories/${category.id}.json`, category);
        return category;
    }
);

export const deleteCategory = createAsyncThunk<string, string, { state: RootState }>(
    'categories/deleteCategory',
    async (categoryId) => {
        await axiosApi.delete(`/categories/${categoryId}.json`);
        return categoryId;
    }
);
