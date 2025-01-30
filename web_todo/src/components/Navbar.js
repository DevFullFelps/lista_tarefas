import './styles/Navbar.css';
import { FaLinkedin, FaInstagram, FaGithub  } from 'react-icons/fa';


const Navbar = () =>{
    return(
        <nav className='navbar'>
            <div className='area-imagem'>
                <img src='./img/navbar/dev_logo.png' alt='logo' className='navbar-imagem'></img>
                <h3>To Do List</h3>
            </div>
            <div className='social-links'>
                <ul>
                    <li>
                        <a
                        href='https://github.com/DevFullFelps'
                        target='_blank'
                        rel='noopener noreferrer'
                        className='icon-link'
                        >
                        <FaGithub />
                        </a>
                    </li>
                    <li>
                        <a
                        href='https://www.instagram.com/devfelps/'
                        target='_blank'
                        rel='noopener noreferrer'
                        className='icon-link'
                        >
                        <FaInstagram />
                        </a>
                    </li>
                    <li>
                        <a
                        href='https://www.linkedin.com/in/felipe-adriano-967b89312'
                        target='_blank'
                        rel='noopener noreferrer'
                        className='icon-link'
                        >
                        <FaLinkedin />
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar;