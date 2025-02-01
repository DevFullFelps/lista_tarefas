// Auth.js
import React, { useState } from 'react';
import { auth, googleProvider, signInWithPopup, signOut } from './firebase'; // Certifique-se de que está importando corretamente
import { useNavigate } from 'react-router-dom';


const Auth = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null); // Estado para armazenar o usuário autenticado

    // Função para fazer login com o Google
    const signInWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider); // Autenticação via popup
            const user = result.user; // Obter o usuário autenticado
            console.log("Usuário autenticado:", user);
            setUser(user); // Armazena o usuário no estado
            navigate('/todo'); // Redireciona para a página /todo após o login
        } catch (error) {
            console.error("Erro ao autenticar com o Google:", error);
        }
    };

    // Função para deslogar
    const handleSignOut = async () => {
        try {
            await signOut(auth); // Realiza o logout
            setUser(null); // Limpa o estado do usuário
            navigate('/'); // Redireciona para a página inicial após o logout
        } catch (error) {
            console.error("Erro ao deslogar:", error);
        }
    };
    const handleLogout = async () => {
            try {
                await signOut(auth); // Faz logout do Firebase
                navigate('/'); // Redireciona para a página principal após o logout
            } catch (error) {
                console.error("Erro ao deslogar:", error);
            }
        };

    return (
        <div style={{ textAlign: 'center', padding: '50px' }}>
            {user ? (
                <div>
                    <h2>Bem-vindo, {user.displayName}</h2>
                    <button 
                        onClick={handleSignOut} 
                        style={{
                            padding: '10px 20px',
                            backgroundColor: '#f44336', // Cor vermelha para logout
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            fontSize: '16px',
                            cursor: 'pointer',
                        }}
                    >
                        Logout
                    </button>
                </div>
            ) : (
                <div>
                    <h2>Entrar</h2>
                    <button 
                        onClick={signInWithGoogle} 
                        style={{
                            padding: '10px 20px',
                            backgroundColor: '#4285F4', // Cor do Google
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            fontSize: '16px',
                            cursor: 'pointer',
                        }}
                    >
                        Login com Google
                    </button>
                    <button 
                        onClick={handleLogout} 
                        style={{
                            padding: '10px 20px',
                            backgroundColor: '#428523', // Cor do Google
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            fontSize: '16px',
                            cursor: 'pointer',
                        }}
                    >
                        Voltar para Inicio
                    </button>
                </div>
            )}
        </div>
    );
};

export default Auth;
