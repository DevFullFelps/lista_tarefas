import React, { useEffect } from 'react';
import { auth, googleProvider, signInWithPopup } from './firebase';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const signInWithGoogle = async () => {
            try {
                await new Promise(resolve => setTimeout(resolve, 500)); // Pequeno atraso
                const result = await signInWithPopup(auth, googleProvider);
                console.log("Usuário autenticado:", result.user);
                navigate('/todo');
            } catch (error) {
                console.error("Erro ao autenticar com o Google:", error);
            }
        };
    
        signInWithGoogle();
    }, [navigate]);
    

    return <p>Redirecionando para autenticação...</p>;
};

export default Auth;
