import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout/Layout';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { fetchTransactions, deleteTransaction } from '../store/transactionsThunks';
import dayjs from 'dayjs';
import ConfirmModal from '../components/Modal/ConfirmModal';
import AddTransactionModal from '../components/Modal/AddTransactionModal';

const Home: React.FC = () => {
    const dispatch = useAppDispatch();
    const transactions = useAppSelector(state => state.transactions.items);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [showAddEditModal, setShowAddEditModal] = useState(false);
    const [transactionIdToDelete, setTransactionIdToDelete] = useState<string | null>(null);
    const [selectedTransaction, setSelectedTransaction] = useState<any | null>(null);

    useEffect(() => {
        dispatch(fetchTransactions());
    }, [dispatch]);

    const handleDeleteClick = (id: string) => {
        setTransactionIdToDelete(id);
        setShowConfirmModal(true);
    };

    const handleDeleteConfirm = async () => {
        if (transactionIdToDelete) {
            await dispatch(deleteTransaction(transactionIdToDelete));
            setTransactionIdToDelete(null);
            setShowConfirmModal(false);
        }
    };

    const handleDeleteCancel = () => {
        setTransactionIdToDelete(null);
        setShowConfirmModal(false);
    };

    const handleAddEditClick = (transaction?: any) => {
        setSelectedTransaction(transaction || null);
        setShowAddEditModal(true);
    };

    const totalIncome = transactions.reduce((total, transaction) => {
        return transaction.type === 'income' ? total + transaction.amount : total;
    }, 0);

    const totalExpense = transactions.reduce((total, transaction) => {
        return transaction.type === 'expense' ? total + transaction.amount : total;
    }, 0);

    const totalAmount = totalIncome - totalExpense;

    return (
        <Layout>
            <h1>Personal Budget</h1>
            <div>
                <h2>Total: {totalAmount} KGS</h2>
                <h4>Income: {totalIncome} KGS</h4>
                <h4>Expense: {totalExpense} KGS</h4>
            </div>
            <div>
                <h3>Transactions</h3>
                <ul className="list-group">
                    {transactions.map((transaction: any) => (
                        <li key={transaction.id} className="list-group-item d-flex justify-content-between align-items-center">
                            <span>{dayjs(transaction.createdAt).format('DD.MM.YYYY HH:mm:ss')}</span>
                            <span>{transaction.category}</span>
                            <span className={transaction.type === 'income' ? 'text-success' : 'text-danger'}>
                                {transaction.type === 'income' ? '+' : '-'}{transaction.amount} KGS
                            </span>
                            <div>
                                <button className="btn btn-secondary mr-2" onClick={() => handleAddEditClick(transaction)}>Edit</button>
                                <button className="btn btn-danger" onClick={() => handleDeleteClick(transaction.id)}>Delete</button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            <ConfirmModal
                show={showConfirmModal}
                title="Confirm Delete"
                onClose={handleDeleteCancel}
                onConfirm={handleDeleteConfirm}
            />
            <AddTransactionModal
                show={showAddEditModal}
                onClose={() => setShowAddEditModal(false)}
                transaction={selectedTransaction}
            />
        </Layout>
    );
};

export default Home;
