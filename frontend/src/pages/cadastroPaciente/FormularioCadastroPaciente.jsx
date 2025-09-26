export default function FormularioCadastroPaciente({ paciente, setPaciente, handleSubmit }) {
    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label>Nº do SUS:</label>
                <input
                    type="text"
                    value={paciente.sus}
                    disabled
                />
            </div>

            <div className="form-group">
                <label>Nome Completo:</label>
                <input
                    type="text"
                    value={paciente.nome}
                    onChange={(e) => setPaciente({ ...paciente, nome: e.target.value })}
                    disabled={!!paciente.paciente_id}
                    required
                />
            </div>

            <div className="form-group">
                <label>Data de Nascimento:</label>
                <input
                    type="date"
                    value={paciente.data_nascimento}
                    onChange={(e) => setPaciente({ ...paciente, data_nascimento: e.target.value })}
                    disabled={!!paciente.paciente_id}
                    required
                />
            </div>

            <div className="form-group">
                <label>Sexo:</label>
                <select
                    value={paciente.sexo}
                    onChange={(e) => setPaciente({ ...paciente, sexo: e.target.value })}
                    disabled={!!paciente.paciente_id}
                    required
                >
                    <option value="">Selecione</option>
                    <option value="MASCULINO">Masculino</option>
                    <option value="FEMININO">Feminino</option>
                </select>
            </div>

            <div className="form-group">
                <label>Prioridade de Atendimento:</label>
                <select
                    value={paciente.prioridade}
                    onChange={(e) => setPaciente({ ...paciente, prioridade: e.target.value })}
                    required
                >
                    <option value="EMERGENCIA">Emergência (Vermelho)</option>
                    <option value="MUITO_URGENTE">Muito Urgente (Laranja)</option>
                    <option value="URGENTE">Urgente (Amarelo)</option>
                    <option value="POUCO_URGENTE">Pouco Urgente (Verde)</option>
                    <option value="NAO_URGENTE">Não Urgente (Azul)</option>
                </select>
            </div>

            <button type="submit">Cadastrar Paciente na Fila</button>
        </form>
    )
}