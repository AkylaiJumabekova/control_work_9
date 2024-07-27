import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout/Layout';
import AddCategoryModal from '../components/Modal/AddCategoryModal';
import ConfirmModal from '../components/Modal/ConfirmModal';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { fetchCategories, deleteCategory } from '../store/categoriesThunks';
import { Category } from '../types';

const Categories: React.FC = () => {
    const dispatch = useAppDispatch();
    const categories = useAppSelector(state => state.categories.items);
    const isLoading = useAppSelector(state => state.categories.isLoading);
    const [showAddEditModal, setShowAddEditModal] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    const handleAddEditClick = (category?: Category) => {
        setSelectedCategory(category || null);
        setShowAddEditModal(true);
    };

    const handleDeleteClick = (category: Category) => {
        setSelectedCategory(category);
        setShowConfirmModal(true);
    };

    const handleConfirmDelete = async () => {
        if (selectedCategory) {
            await dispatch(deleteCategory(selectedCategory.id));
            setShowConfirmModal(false);
            setSelectedCategory(null);
        }
    };

    return (
        <Layout>
            <h1>Categories</h1>
            <button className="btn btn-primary mb-2" onClick={() => handleAddEditClick()}>
                Add Category
            </button>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <ul className="list-group">
                    {categories.map((category: Category) => (
                        <li key={category.id} className="list-group-item d-flex justify-content-between align-items-center">
                            <span>{category.name} ({category.type})</span>
                            <div>
                                <button className="btn btn-secondary mr-2" onClick={() => handleAddEditClick(category)}>Edit</button>
                                <button className="btn btn-danger" onClick={() => handleDeleteClick(category)}>Delete</button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
            <AddCategoryModal show={showAddEditModal} onClose={() => setShowAddEditModal(false)} category={selectedCategory} />
            <ConfirmModal show={showConfirmModal} title="Confirm Delete" onClose={() => setShowConfirmModal(false)} onConfirm={handleConfirmDelete} />
        </Layout>
    );
};

export default Categories;
