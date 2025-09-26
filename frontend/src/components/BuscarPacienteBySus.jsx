import { useState } from 'react'
import './BuscarPacienteBySus.css'

import { notificacao } from '../utils/notificacao'

import pacienteService from '../api/PacienteService'


export default function BuscarPaciente({ onPacienteEncontrado }) {
    const [sus, setSus] = useState('')

    const handleSubmit = async (event) => {
        event.preventDefault()

        if (!sus) {
            notificacao('Digite um número de SUS válido', 'error')

            return
        }
        try {
            const response = await pacienteService.getPacienteBySus(sus)

            if (onPacienteEncontrado) {
                onPacienteEncontrado(response.data, sus)
            }
        } catch (error) {
            notificacao('Paciente não cadastrado.', 'info')

            if (onPacienteEncontrado) {
                onPacienteEncontrado(null, sus);
            }
        }
    }

    return (
        <section className='busca-paciente'>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Verificar número do SUS</label>
                    <input
                        type='text'
                        value={sus}
                        onChange={(e) => setSus(e.target.value)}
                        placeholder='Digite o número do SUS'
                    />
                </div>

                <button type='submit'>Verificar</button>
            </form>
        </section>
    )
}