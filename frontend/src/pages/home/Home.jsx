import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faSearch, faMedkit, faFolderOpen, faUserAlt } from '@fortawesome/free-solid-svg-icons'

import './Home.css'


export default function Home({ onNavigate, usuario }) {
    return (
        <section className="menu-container">
            <h1>Home Page</h1>

            <div className="menu-grid">
                {
                    (usuario.papel === 'ATENDENTE' || usuario.papel === 'ADMIN') &&
                    <a className="menu-item" onClick={() => onNavigate('cadastro')}>
                        <FontAwesomeIcon icon={faUser} />
                        Cadastro Paciente
                    </a>
                }

                {
                    (usuario.papel === 'ATENDENTE' || usuario.papel === 'ADMIN') &&
                    <a className="menu-item" onClick={() => onNavigate('triagem')}>
                        <FontAwesomeIcon icon={faSearch} />
                        Triagem
                    </a>
                }

                {
                    (usuario.papel === 'MEDICO' || usuario.papel === 'ADMIN') &&
                    <a className="menu-item" onClick={() => onNavigate('atendimento')}>
                        <FontAwesomeIcon icon={faMedkit} />
                        Atendimento Médico
                    </a>
                }
                <a className="menu-item" onClick={() => onNavigate('display')}>
                    <FontAwesomeIcon icon={faFolderOpen} />
                    Display
                </a>

                <a className="menu-item" onClick={() => onNavigate('usuario')}>
                    <FontAwesomeIcon icon={faUserAlt} />
                    Login e cadastro de Usuário
                </a>
            </div>
        </section>
    )
}