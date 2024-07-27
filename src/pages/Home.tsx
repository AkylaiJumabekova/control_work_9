import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout/Layout';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { fetchTransactions, deleteTransaction } from '../store/transactionsThunks';
import dayjs from 'dayjs';
import ConfirmModal from '../components/Modal/ConfirmModal';

const Home: React.FC = () => {
    const dispatch = useAppDispatch();
    const transactions = useAppSelector(state => state.transactions.items);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [transactionIdToDelete, setTransactionIdToDelete] = useState<string | null>(null);

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

    const totalAmount = transactions.reduce((total: number, transaction: { amount: number }) => total + transaction.amount, 0);

    return (
        <Layout>
            <h1>Personal Budget App</h1>
            <div>
                <h2>Total: {totalAmount} KGS</h2>
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
                            <button className="btn btn-danger" onClick={() => handleDeleteClick(transaction.id)}>Delete</button>
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
        </Layout>
    );
};

export default Home;
