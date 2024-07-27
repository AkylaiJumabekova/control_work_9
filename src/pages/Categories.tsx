import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout/Layout';
import AddCategoryModal from '../components/Modal/AddCategoryModal';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { fetchCategories } from '../store/categoriesThunks';

const Categories: React.FC = () => {
    const dispatch = useAppDispatch();
    const categories = useAppSelector(state => state.categories.items);
    const isLoading = useAppSelector(state => state.categories.isLoading);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    return (
        <Layout>
            <h1>Categories</h1>
            <button className="btn btn-primary mb-2" onClick={() => setShowModal(true)}>
                Add Category
            </button>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <ul className="list-group">
                    {categories.map((category) => (
                        <li key={category.id} className="list-group-item d-flex justify-content-between align-items-center">
                            <span>{category.name} ({category.type})</span>
                        </li>
                    ))}
                </ul>
            )}
            <AddCategoryModal show={showModal} onClose={() => setShowModal(false)} />
        </Layout>
    );
};

export default Categories;
