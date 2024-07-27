import React from 'react';
import { NavLink } from 'react-router-dom';

const Toolbar: React.FC = () => {
    return (
        <nav className="navbar navbar-dark bg-primary">
            <div className="container-fluid">
                <NavLink to="/" className="navbar-brand">
                    Personal Budget App
                </NavLink>
                <ul className="navbar-nav d-flex flex-row gap-3 flex-nowrap">
                    <li className="nav-item">
                        <NavLink to="/" className="nav-link">
                            Home
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addTransactionModal">Add Transaction</button>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/categories" className="nav-link">
                            Categories
                        </NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Toolbar;
