import React from 'react';

import { Header } from './components/header';
import { Footer } from './components/footer/Footer';

function App() {
    return (
        <>
            <Header />
            <main className="main">
                <input type="text" />
            </main>
            <Footer />
        </>
    );
}

export default App;
