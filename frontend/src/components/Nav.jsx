import './Nav.css'


export default function Nav({ onNavigate, isLoggedIn, usuario, onLogout }) {
    return (
        <header className="main-header">
            <a onClick={() => onNavigate('home')} style={{ cursor: 'pointer' }}>
                Voltar ao Menu
            </a>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span>{usuario.email}</span>
                <div
                    className='circle'
                    style={{ backgroundColor: isLoggedIn ? '#0f0' : '#f00', width: '10px', height: '10px', borderRadius: '50%' }}
                ></div>

                {isLoggedIn && usuario ? (
                    <>
                        <a onClick={() => onLogout()} style={{ cursor: 'pointer' }}>Sair</a>
                    </>
                ) : (
                    <a onClick={() => onNavigate('usuario')} style={{ cursor: 'pointer' }}>Login</a>
                )}
            </div>
        </header>
    )
}