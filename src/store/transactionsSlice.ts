import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Transaction, TransactionsState } from '../types';
import { fetchTransactions, addTransaction, updateTransaction, deleteTransaction } from './transactionsThunks';

const initialState: TransactionsState = {
    items: [],
    isLoading: false,
    isAdding: false,
};

const transactionsSlice = createSlice({
    name: 'transactions',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTransactions.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchTransactions.fulfilled, (state, action: PayloadAction<Transaction[]>) => {
                state.isLoading = false;
                state.items = action.payload;
            })
            .addCase(fetchTransactions.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(addTransaction.pending, (state) => {
                state.isAdding = true;
            })
            .addCase(addTransaction.fulfilled, (state, action: PayloadAction<Transaction>) => {
                state.isAdding = false;
                state.items.push(action.payload);
            })
            .addCase(addTransaction.rejected, (state) => {
                state.isAdding = false;
            })
            .addCase(updateTransaction.fulfilled, (state, action: PayloadAction<Transaction>) => {
                const index = state.items.findIndex(transaction => transaction.id === action.payload.id);
                if (index !== -1) {
                    state.items[index] = action.payload;
                }
            })
            .addCase(deleteTransaction.fulfilled, (state, action: PayloadAction<string>) => {
                const index = state.items.findIndex(transaction => transaction.id === action.payload);
                if (index !== -1) {
                    state.items.splice(index, 1);
                }
            });
    },
});

export default transactionsSlice.reducer;
