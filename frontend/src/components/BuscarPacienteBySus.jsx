import { useState } from "react";
import pacienteService from "../api/PacienteService";
import { toast } from "react-toastify";

function BuscarPacienteBySus({ onPacienteEncontrado }) {
  const [sus, setSus] = useState("");
  const [paciente, setPaciente] = useState(null);
  const [loading, setLoading] = useState(false);

  const buscarPaciente = async () => {
    if (!sus) {
      toast.warn("Digite um número de SUS válido");
      return;
    }

    setLoading(true);
    try {
      const response = await pacienteService.getPacienteBySus(sus);

      setPaciente(response.data);

      if (onPacienteEncontrado) onPacienteEncontrado(response.data);
    } catch (error) {
      console.error("Erro ao buscar paciente:", error);
      toast.error("Paciente não encontrado ou erro no servidor");
      setPaciente(null);

      if (onPacienteEncontrado) onPacienteEncontrado(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-group">
      <h2>Buscar Paciente por SUS</h2>
      <input
        type="text"
        value={sus}
        onChange={(e) => setSus(e.target.value)}
        placeholder="Digite o número do SUS"
      />
      <button onClick={buscarPaciente} disabled={loading}>
        {loading ? "Buscando..." : "Buscar"}
      </button>
    </div>
  );
}

export default BuscarPacienteBySus;