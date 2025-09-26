import { useState } from 'react'
import './CadastroPaciente.css'

import { notificacao } from '../../utils/notificacao'

import BuscarPaciente from '../../components/BuscarPacienteBySus'
import FormularioCadastroPaciente from './FormularioCadastroPaciente'
import CadastroPacienteService from '../../api/CadastroPacienteService'


const estadoInicialPaciente = {
    sus: '',
    nome: '',
    data_nascimento: '',
    sexo: '',
    prioridade: 'NAO_URGENTE',
    paciente_id: null,
}

export default function CadastroPaciente() {
    const [paciente, setPaciente] = useState(estadoInicialPaciente);

    const handlePacienteEncontrado = (pacienteEncontrado, susPesquisado) => {
        if (pacienteEncontrado) {
            setPaciente({
                sus: susPesquisado || '',
                nome: pacienteEncontrado.nome || '',
                data_nascimento: pacienteEncontrado.data_nascimento
                    ? pacienteEncontrado.data_nascimento.split('T')[0]
                    : '',
                sexo: pacienteEncontrado.sexo || '',
                paciente_id: pacienteEncontrado.id,
                prioridade: 'NAO_URGENTE',
            })
            
            notificacao('Paciente encontrado! Defina a prioridade.')
        } else {
            setPaciente({
                ...estadoInicialPaciente,
                sus: susPesquisado
            })
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        try {
            //console.log(paciente)
            await CadastroPacienteService.cadastrarPaciente(paciente)

            notificacao('Paciente cadastrado na fila com sucesso!')

            setPaciente(estadoInicialPaciente)

            //onBackToMenu()
        } catch (error) {
            notificacao(error.response?.data.message || 'Erro ao cadastrar paciente.', 'error')
        }
    }

    return (
        <section className='container-cadastro container'>
            <h1>Cadastro de Paciente na Fila</h1>

            <BuscarPaciente onPacienteEncontrado={handlePacienteEncontrado} />

            {/* {
                (StatusBusca.ENCONTRADO === statusBusca && <p>Paciente encontrado</p>) ||

                (StatusBusca.NAO_ENCONTRADO === statusBusca && <p>Paciente não encontrado</p> )
            } */}
            
            {/* <hr /> */}

            <FormularioCadastroPaciente 
                paciente={paciente} 
                setPaciente={setPaciente} 
                handleSubmit={handleSubmit}
            />
        </section>
    )
}