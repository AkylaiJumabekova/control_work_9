import React, { useState, useEffect } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { addCategory, updateCategory } from '../../store/categoriesThunks';
import Modal from './Modal';
import { Category } from '../../types';

interface Props {
    show: boolean;
    onClose: () => void;
    category?: Category | null;
}

const AddCategoryModal: React.FC<Props> = ({ show, onClose, category }) => {
    const dispatch = useAppDispatch();
    const [name, setName] = useState('');
    const [type, setType] = useState<'income' | 'expense'>('income');

    useEffect(() => {
        if (category) {
            setName(category.name);
            setType(category.type);
        } else {
            setName('');
            setType('income');
        }
    }, [category]);

    const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        if (value === 'income' || value === 'expense') {
            setType(value);
        }
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const newCategory: Category = {
            id: category ? category.id : Date.now().toString(),
            name,
            type,
        };
        try {
            if (category) {
                await dispatch(updateCategory(newCategory)).unwrap();
            } else {
                await dispatch(addCategory(newCategory)).unwrap();
            }
            onClose();
        } catch (error) {
            console.error('Failed to save category:', error);
        }
    };

    return (
        <Modal show={show} title={category ? "Edit Category" : "Add Category"} onClose={onClose}>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        className="form-control"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
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
                <button type="submit" className="btn btn-primary mt-2">
                    {category ? "Save" : "Add"}
                </button>
            </form>
        </Modal>
    );
};

export default AddCategoryModal;
