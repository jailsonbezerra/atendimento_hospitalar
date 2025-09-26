import './ListaPacientes.css'


export default function ListaPacientes({pacientes, onTriagem}) {
    return (
        <section>
            <table>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Prioridade</th>
                        <th>Status</th>
                        <th>Ação</th>
                    </tr>
                </thead>

                <tbody>
                    {pacientes.length > 0 ? (
                        pacientes.map((paciente) => (
                            <tr key={paciente.id} className={`prioridade-${paciente.prioridade.toLowerCase()}`}>
                                <td data-label='Nome'>{paciente.paciente.nome}</td>
                                <td data-label='Prioridade'>{paciente.prioridade}</td>
                                <td data-label='Status'>{paciente.status_triagem}</td>
                                <td data-label='Acao'>
                                    <button onClick={() => onTriagem(paciente)}>Iniciar triagem</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan='4'>Nenhum paciente aguardando triagem.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </section>
    )
}