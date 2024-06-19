// Importar dependências
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './bootstrap';
import Example from './components/Example';
import TwoFactorAuthentication from './components/TwoFactorAuthentication';
import UserProfile from './components/UserProfile';

// Definir o componente App com as rotas
function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Example />} />
                <Route path="/profile" element={<UserProfile />} />
                <Route path="/two-factor-authentication" element={<TwoFactorAuthentication />} />
                {/* Adicione outras rotas conforme necessário */}
            </Routes>
        </Router>
    );
}

// Renderizar o componente App no elemento root
if (document.getElementById('root')) {
    ReactDOM.render(<App />, document.getElementById('root'));
}
