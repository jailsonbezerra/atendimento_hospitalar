import { useState } from 'react'

import { notificacao } from '../../utils/notificacao'
import triagemService from '../../api/TriagemService'


const estadoInicialTriagem = {
    peso: 0,
    altura: 0,
    temperatura: 0,
    pressao: '0/0',
    prioridade: 'NAO_URGENTE',
    cadastro_id: '',
    atendente_id: '56078339-027d-487c-84de-d6ddd48b3b6d',
    data_inicio: new Date()
}

export default function FormularioTriagem({ onModal, cadastradoPaciente, carregarPacientes, atendente }) {
    const [triagem, setTriagem] = useState({
        ...estadoInicialTriagem,
        prioridade: cadastradoPaciente.prioridade,
        cadastro_id: cadastradoPaciente.id
    })

    const handleSubmit = async (event) => {
        event.preventDefault()

        try {
            await triagemService.createTriagem(triagem)
            
            notificacao('Triagem cadastrada com sucesso!')

            await carregarPacientes()
            
            onModal(false)
        } catch (error) {
            notificacao('Erro ao cadastrar triagem.', 'error')
        }
    }

    return (
        <form className='modal-content' onSubmit={handleSubmit}>
            <div className="form-group">
                <label>Peso:</label>
                <input
                    type='number'
                    step={0.01}
                    value={triagem.peso || 0}
                    onChange={(e) =>
                        setTriagem({ ...triagem, peso: parseFloat(e.target.value) })
                    }
                    required
                />
            </div>

            <div className="form-group">
                <label>altura:</label>
                <input
                    type='number'
                    step={0.01}
                    value={triagem.altura || 0}
                    onChange={(e) =>
                        setTriagem({ ...triagem, altura: parseFloat(e.target.value) })
                    }
                    required
                />
            </div>

            <div className="form-group">
                <label>Temperatura:</label>
                <input
                    type="number"
                    value={triagem.temperatura || 0}
                    onChange={(e) =>
                        setTriagem({ ...triagem, temperatura: parseInt(e.target.value) })
                    }
                    required
                />
            </div>

            <div className="form-group">
                <label>Pressão:</label>
                <input
                    type="text"
                    value={triagem.pressao || ''}
                    onChange={(e) =>
                        setTriagem({ ...triagem, pressao: e.target.value })
                    }
                    required
                />
            </div>

            <div className="form-group">
                <label>Prioridade de Atendimento:</label>
                <select
                    value={triagem.prioridade}
                    onChange={(e) => setTriagem({ ...triagem, prioridade: e.target.value })}
                    required
                >
                    <option value="EMERGENCIA">Emergência (Vermelho)</option>
                    <option value="MUITO_URGENTE">Muito Urgente (Laranja)</option>
                    <option value="URGENTE">Urgente (Amarelo)</option>
                    <option value="POUCO_URGENTE">Pouco Urgente (Verde)</option>
                    <option value="NAO_URGENTE">Não Urgente (Azul)</option>
                </select>
            </div>

            <button type='submit'>Cadastrar</button>
        </form>
    )
}