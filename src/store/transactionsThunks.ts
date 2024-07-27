import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../axiosApi';
import { Transaction } from '../types';
import { RootState } from '../app/store';

export const fetchTransactions = createAsyncThunk<Transaction[], void, { state: RootState }>(
    'transactions/fetchTransactions',
    async () => {
        const response = await axiosApi.get<Record<string, Transaction>>('/transactions.json');
        const transactions = response.data
            ? Object.keys(response.data).map((key) => ({
                ...response.data[key],
                id: key,
            }))
            : [];
        return transactions;
    }
);

export const addTransaction = createAsyncThunk<Transaction, Transaction, { state: RootState }>(
    'transactions/addTransaction',
    async (transaction) => {
        const response = await axiosApi.post('/transactions.json', transaction);
        return { ...transaction, id: response.data.name };
    }
);

export const deleteTransaction = createAsyncThunk<string, string, { state: RootState }>(
    'transactions/deleteTransaction',
    async (transactionId) => {
        await axiosApi.delete(`/transactions/${transactionId}.json`);
        return transactionId;
    }
);
