import './styles/SectionButton.css';
import { Link } from "react-router-dom";

const SectionButton = () =>{
    return(
        <section className='section-button'>
            <Link to="/todo" className="button-create">Crie sua Lista</Link> 
               
        </section>
    )
}

export default SectionButton;