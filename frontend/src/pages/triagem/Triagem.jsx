import { useState, useEffect } from 'react'
import './Triagem.css'

import { notificacao } from '../../utils/notificacao'
import pacienteService from '../../api/PacienteService'

import FormularioTriagem from './FormularioTriagem'
import ListaPacientes from '../../components/ListaPacientes'


export default function Triagem() {
    const [pacientes, setPacientes] = useState([])
    const [modalAberto, setModalAberto] = useState(false)
    const [cadastradoPaciente, setCadastradoPaciente] = useState({})

    useEffect(() => {
        carregarPacientes()

        console.log(pacientes)
    }, [])

    const carregarPacientes = async () => {
        try {
            const response = await pacienteService.getPacientesByPrioridade('aguardando', 'aguardando')

            setPacientes(response.data)
        } catch (error) {
            notificacao('error', 'Erro ao carregar pacientes')
        }
    }

    const iniciarTriagem = async (cadastrado) => {
        try {
            notificacao(`Triagem iniciada para o paciente ${cadastrado.paciente.nome}`, 'success')

            setCadastradoPaciente(cadastrado)

            await pacienteService.updateStatus(cadastrado.id, { status_triagem: 'em_andamento' })

            setModalAberto(true)
        } catch (error) {
            notificacao('erro ao iniciar triagem', 'error')

            setModalAberto(false)
        }
    }

    const closeModal = async (cadastrado) => {
        setModalAberto(false)

        await pacienteService.updateStatus(cadastrado.id, { status_triagem: 'aguardando' })

        setCadastradoPaciente({})

        setModalAberto(false)
    }

    return (
        <section className='triagem-container'>
            <h1>Pacientes para Triagem</h1>

            <ListaPacientes pacientes={pacientes} onTriagem={iniciarTriagem} />

            {modalAberto &&
                <div className='modal'>
                    <section className='modal-content'>
                        <button onClick={() => closeModal(cadastradoPaciente)}>X</button>
                        <FormularioTriagem onModal={setModalAberto} cadastradoPaciente={cadastradoPaciente} carregarPacientes={carregarPacientes} />
                    </section>
                </div>
            }
        </section>
    )
}