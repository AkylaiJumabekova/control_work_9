import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Transaction {
    id: string;
    category: string;
    amount: number;
    createdAt: string;
}

export interface TransactionsState {
    items: Transaction[];
}

const initialState: TransactionsState = {
    items: [],
};

const transactionsSlice = createSlice({
    name: 'transactions',
    initialState,
    reducers: {
        addTransaction: (state, action: PayloadAction<Transaction>) => {
            state.items.push(action.payload);
        },
        updateTransaction: (state, action: PayloadAction<Transaction>) => {
            const index = state.items.findIndex((transaction) => transaction.id === action.payload.id);
            if (index !== -1) {
                state.items[index] = action.payload;
            }
        },
        deleteTransaction: (state, action: PayloadAction<string>) => {
            const index = state.items.findIndex((transaction) => transaction.id === action.payload);
            if (index !== -1) {
                state.items.splice(index, 1);
            }
        },
    },
});

export const { addTransaction, updateTransaction, deleteTransaction } = transactionsSlice.actions;

export default transactionsSlice.reducer;
