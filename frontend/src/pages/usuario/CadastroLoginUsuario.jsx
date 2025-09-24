import FormularioCadastroUsuario from '../../components/FormularioCadastroUsuario'
import FormularioLoginUsuario from '../../components/FormularioLoginUsuario'

import './CadastroLoginUsuario.css'


export default function CadastroLoginUsuario({onBackToMenu}) {
    return (
        <main className="container">
            <a href="/" className="back-button">Voltar ao Menu</a>

            <section className="cadastro-usuario">
                <h1>Cadastrar Usuario</h1>

                <FormularioCadastroUsuario onBackToMenu={onBackToMenu} />
            </section>

            <section className="login-usuario">
                <h1>Login de Usuario</h1>

                <FormularioLoginUsuario onBackToMenu={onBackToMenu} />
            </section>
        </main>
    )
}