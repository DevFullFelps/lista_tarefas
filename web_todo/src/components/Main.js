import React from 'react';
import './styles/Main.css';
import { auth, googleProvider, signInWithPopup } from '../firebase';
import { useNavigate } from 'react-router-dom';

const Main = () => {
    const navigate = useNavigate();

    const handleSignInWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            console.log("Usuário autenticado:", result.user);
            navigate('/todo'); // Redireciona para a página de tarefas após a autenticação
        } catch (error) {
            console.error("Erro ao autenticar com o Google:", error);
        }
    };

    // Verifica se o usuário está autenticado, se sim, redireciona para a página de tarefas
    if (auth.currentUser) {
        navigate('/todo');
    }

    return (
        <main className="main-container">
            <div className="content">
                <div className="text-section">
                    <h3>📌 Organize Seu Dia</h3>
                    <p>Mantenha suas tarefas organizadas e produtivas em um só lugar!</p>
                    <p>Uma lista simples e eficaz para acompanhar suas atividades diárias.</p>
                    <p>Crie, edite e conclua tarefas de forma prática e rápida!</p>
                    <button onClick={handleSignInWithGoogle} className="button-create">
                        Crie sua Lista
                    </button>
                </div>
                <div className="image-section">
                    <img src="./img/fundo.PNG" alt="Imagem-tela" className="imagem-demo" />
                </div>
            </div>
        </main>
    );
};

export default Main;
