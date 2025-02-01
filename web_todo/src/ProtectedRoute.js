import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { auth } from './firebase';

const ProtectedRoute = ({ children }) => {
    const [loading, setLoading] = useState(true); // Estado para monitorar o carregamento da autenticação
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((currentUser) => {
            setUser(currentUser);
            setLoading(false); // Termina o carregamento após verificar o estado de autenticação
        });

        return () => unsubscribe(); // Limpa o listener quando o componente for desmontado
    }, []);

    // Durante o carregamento, não renderize nada
    if (loading) {
        return <div>Loading...</div>;
    }

    // Se não houver usuário, redireciona para a página de login
    if (!user) {
        return <Navigate to="/auth" />;
    }

    // Caso contrário, renderiza os filhos
    return children;
};

export default ProtectedRoute;
