import './styles/Main.css';
import { Link } from "react-router-dom";

const Main = () => {
    return (
        <main className="main-container">
            <div className="content">
                <div className="text-section">
                    <h3>📌 Organize Seu Dia</h3>
                    <p>Mantenha suas tarefas organizadas e produtivas em um só lugar!</p>
                    <p>Uma lista simples e eficaz para acompanhar suas atividades diárias.</p>
                    <p>Crie, edite e conclua tarefas de forma prática e rápida!</p>
                    <Link to="/todo" className="button-create">Crie sua Lista</Link> 
                </div>
                <div className="image-section">
                    <img src="./img/fundo.PNG" alt="Imagem-tela" className="imagem-demo" />
                </div>
            </div>
        </main>
    );
};

export default Main;
