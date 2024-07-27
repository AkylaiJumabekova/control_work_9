import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { addTransaction, updateTransaction } from '../../store/transactionsThunks';
import { fetchCategories } from '../../store/categoriesThunks';
import Modal from './Modal';
import { Category, Transaction } from '../../types';
import dayjs from 'dayjs';

interface Props {
    show: boolean;
    onClose: () => void;
    transaction?: Transaction | null;
}

const AddTransactionModal: React.FC<Props> = ({ show, onClose, transaction }) => {
    const dispatch = useAppDispatch();
    const categories = useAppSelector(state => state.categories.items);
    const [type, setType] = useState<'income' | 'expense'>('income');
    const [category, setCategory] = useState('');
    const [amount, setAmount] = useState(0);

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    useEffect(() => {
        if (transaction) {
            setType(transaction.type);
            setCategory(transaction.category);
            setAmount(transaction.amount);
        } else {
            setType('income');
            setCategory('');
            setAmount(0);
        }
    }, [transaction]);

    const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setType(event.target.value as 'income' | 'expense');
    };

    const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setCategory(event.target.value);
    };

    const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAmount(Number(event.target.value));
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const newTransaction: Transaction = {
            id: transaction ? transaction.id : Math.random().toString(36).substr(2, 9),
            category,
            amount,
            type,
            createdAt: transaction ? transaction.createdAt : dayjs().format('YYYY-MM-DDTHH:mm:ss[Z]'),
        };
        try {
            if (transaction) {
                await dispatch(updateTransaction(newTransaction)).unwrap();
            } else {
                await dispatch(addTransaction(newTransaction)).unwrap();
            }
            onClose();
        } catch (error) {
            console.error('Failed to save transaction:', error);
        }
    };

    return (
        <Modal show={show} title={transaction ? "Edit Transaction" : "Add Transaction"} onClose={onClose}>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="type">Type</label>
                    <select
                        id="type"
                        className="form-control"
                        value={type}
                        onChange={handleTypeChange}
                    >
                        <option value="income">Income</option>
                        <option value="expense">Expense</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="category">Category</label>
                    <select
                        id="category"
                        className="form-control"
                        value={category}
                        onChange={handleCategoryChange}
                    >
                        {categories.map((cat: Category) => (
                            cat.type === type && <option key={cat.id} value={cat.id}>{cat.name}</option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="amount">Amount</label>
                    <input
                        type="number"
                        id="amount"
                        className="form-control"
                        value={amount}
                        onChange={handleAmountChange}
                    />
                </div>
                <button type="submit" className="btn btn-primary mt-2">
                    {transaction ? "Save" : "Add"}
                </button>
            </form>
        </Modal>
    );
};

export default AddTransactionModal;
