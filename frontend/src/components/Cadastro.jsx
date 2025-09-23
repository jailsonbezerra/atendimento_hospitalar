import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Cadastro.css";

import BuscarPacienteBySus from "./BuscarPacienteBySus";

import CadastroPacienteService from "../api/CadastroPacienteService";

function Cadastro() {
  const [cadastroPaciente, setCadastroPaciente] = useState({
    sus: "",
    nome: "",
    data_nascimento: "",
    sexo: "",
    prioridade: "nao_urgente",
    paciente_id: '',
  });

  const notify = (msg, type = "success") => {
    type === "success" ? toast.success(msg) : toast.error(msg);
  };

  const handlePacienteEncontrado = (paciente) => {
    if (paciente) {
      setCadastroPaciente({
        sus: paciente.sus || "",
        nome: paciente.nome || "",
        data_nascimento: paciente.data_nascimento ? new Date(paciente.data_nascimento).toISOString().split('T')[0] : "",
        sexo: paciente.sexo || "",
        prioridade: paciente.prioridade || "nao_urgente",
        paciente_id: paciente.id || "",
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await CadastroPacienteService.cadastrarPaciente({
        prioridade: cadastroPaciente.prioridade,
        paciente_id: cadastroPaciente.paciente_id,
      });
      notify("Paciente cadastrado com sucesso!");
      setCadastroPaciente({
        sus: "",
        nome: "",
        data_nascimento: "",
        sexo: "",
        prioridade: "",
        paciente_id: '',
      });
    } catch (error) {
      console.error("Erro ao cadastrar paciente:", error);
      notify("Erro ao cadastrar paciente", "error");
    }
  };

  return (
    <div className="container">
      <a href="/" className="back-button">Voltar ao Menu</a>
      <h1>Cadastro de Paciente</h1>

      {/* Componente de busca */}
      <BuscarPacienteBySus onPacienteEncontrado={handlePacienteEncontrado} />

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nome Completo:</label>
          <input
            type="text"
            value={cadastroPaciente.nome}
            onChange={(e) =>
              setCadastroPaciente({ ...cadastroPaciente, nome: e.target.value })
            }
            required
          />
        </div>

        <div className="form-group">
          <label>Data de Nascimento:</label>
          <input
            type="date"
            value={cadastroPaciente.data_nascimento}
            onChange={(e) =>
              setCadastroPaciente({
                ...cadastroPaciente,
                data_nascimento: e.target.value,
              })
            }
            required
          />
        </div>

        <div className="form-group">
          <label>Sexo:</label>
          <select
            value={cadastroPaciente.sexo}
            onChange={(e) =>
              setCadastroPaciente({ ...cadastroPaciente, sexo: e.target.value })
            }
            required
          >
            <option value="">Selecione</option>
            <option value={"masculino".toLocaleUpperCase()}>Masculino</option>
            <option value={"feminino".toLocaleUpperCase()}>Feminino</option>
          </select>
        </div>

        <div className="form-group">
          <label>Prioridade de Atendimento:</label>
          <select
            value={cadastroPaciente.prioridade}
            onChange={(e) =>
              setCadastroPaciente({
                ...cadastroPaciente,
                prioridade: e.target.value,
              })
            }
            required
          >
            <option value="emergencia">Emergência (Vermelho)</option>
            <option value="muito_urgente">Muito Urgente (Laranja)</option>
            <option value="urgente">Urgente (Amarelo)</option>
            <option value="pouco_urgente">Pouco Urgente (Verde)</option>
            <option value="nao_urgente">Não Urgente (Azul)</option>
          </select>
        </div>

        <button type="submit">Cadastrar Paciente</button>
        <ToastContainer autoClose={2500} theme="light" />
      </form>
    </div>
  );
}

export default Cadastro;