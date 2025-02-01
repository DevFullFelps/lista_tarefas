import './styles/SectionButton.css';
import { auth, googleProvider, signInWithPopup } from '../firebase';
import { useNavigate } from 'react-router-dom';


const SectionButton = () =>{
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

    return(
        <section className='section-button'>
           <button onClick={handleSignInWithGoogle} className="button-create">
                        Crie sua Lista
            </button>
               
        </section>
    )
}

export default SectionButton;