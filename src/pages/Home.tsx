import React from 'react';
import Layout from '../components/Layout/Layout';

const Home: React.FC = () => {
    return (
        <Layout>
            <h1>Personal Budget App</h1>
            <div>
                <h2>Total: 0 KGS</h2>
            </div>
            <div>
                <h3>Transactions</h3>
                <ul>
                    {}
                </ul>
            </div>
        </Layout>
    );
};

export default Home;
