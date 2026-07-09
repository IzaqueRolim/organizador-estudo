import { useEffect, useState, type FormEvent } from "react";
import { useConcurso } from "../hooks/useConcurso";
import type { ConcursoDraft, NivelConcurso } from "../types/concurso";

const niveis: Array<{ value: NivelConcurso; label: string }> = [
  { value: "fundamental", label: "Fundamental" },
  { value: "medio", label: "Medio" },
  { value: "tecnico", label: "Tecnico" },
  { value: "superior", label: "Superior" },
  { value: "outro", label: "Outro" },
];

export function ConcursoForm() {
  const { concurso, updateConcurso, resetConcurso } = useConcurso();
  const [form, setForm] = useState<ConcursoDraft>(() => ({
    titulo: concurso.titulo,
    orgao: concurso.orgao,
    banca: concurso.banca,
    cargo: concurso.cargo,
    nivel: concurso.nivel,
    vagas: concurso.vagas,
    salario: concurso.salario,
    dataProva: concurso.dataProva,
    dataInscricaoInicio: concurso.dataInscricaoInicio,
    dataInscricaoFim: concurso.dataInscricaoFim,
    urlEdital: concurso.urlEdital,
    observacoes: concurso.observacoes,
  }));

  useEffect(() => {
    setForm({
      titulo: concurso.titulo,
      orgao: concurso.orgao,
      banca: concurso.banca,
      cargo: concurso.cargo,
      nivel: concurso.nivel,
      vagas: concurso.vagas,
      salario: concurso.salario,
      dataProva: concurso.dataProva,
      dataInscricaoInicio: concurso.dataInscricaoInicio,
      dataInscricaoFim: concurso.dataInscricaoFim,
      urlEdital: concurso.urlEdital,
      observacoes: concurso.observacoes,
    });
  }, [concurso]);

  const updateField = <K extends keyof ConcursoDraft>(
    field: K,
    value: ConcursoDraft[K],
  ) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    updateConcurso(form);
  };

  const handleReset = () => {
    if (window.confirm("Deseja limpar todos os dados deste concurso?")) {
      resetConcurso();
    }
  };

  return (
    <form className="formGrid" onSubmit={handleSubmit}>
      <label>
        Nome do concurso
        <input
          required
          value={form.titulo}
          onChange={(event) => updateField("titulo", event.target.value)}
          placeholder="Ex.: TJ, Receita Federal, Prefeitura"
        />
      </label>

      <label>
        Orgao
        <input
          value={form.orgao}
          onChange={(event) => updateField("orgao", event.target.value)}
          placeholder="Instituicao responsavel"
        />
      </label>

      <label>
        Banca
        <input
          value={form.banca}
          onChange={(event) => updateField("banca", event.target.value)}
          placeholder="Ex.: Cebraspe, FGV, FCC"
        />
      </label>

      <label>
        Cargo
        <input
          value={form.cargo}
          onChange={(event) => updateField("cargo", event.target.value)}
          placeholder="Cargo pretendido"
        />
      </label>

      <label>
        Nivel
        <select
          value={form.nivel}
          onChange={(event) =>
            updateField("nivel", event.target.value as NivelConcurso)
          }
        >
          {niveis.map((nivel) => (
            <option key={nivel.value} value={nivel.value}>
              {nivel.label}
            </option>
          ))}
        </select>
      </label>

      <label>
        Vagas
        <input
          min={0}
          type="number"
          value={form.vagas}
          onChange={(event) => updateField("vagas", Number(event.target.value))}
        />
      </label>

      <label>
        Salario
        <input
          min={0}
          step="0.01"
          type="number"
          value={form.salario}
          onChange={(event) =>
            updateField("salario", Number(event.target.value))
          }
        />
      </label>

      <label>
        Data da prova
        <input
          type="date"
          value={form.dataProva}
          onChange={(event) => updateField("dataProva", event.target.value)}
        />
      </label>

      <label>
        Inicio da inscricao
        <input
          type="date"
          value={form.dataInscricaoInicio}
          onChange={(event) =>
            updateField("dataInscricaoInicio", event.target.value)
          }
        />
      </label>

      <label>
        Fim da inscricao
        <input
          type="date"
          value={form.dataInscricaoFim}
          onChange={(event) =>
            updateField("dataInscricaoFim", event.target.value)
          }
        />
      </label>

      <label className="span2">
        Link do edital
        <input
          type="url"
          value={form.urlEdital ?? ""}
          onChange={(event) => updateField("urlEdital", event.target.value)}
          placeholder="https://..."
        />
      </label>

      <label className="span2">
        Observacoes
        <textarea
          rows={4}
          value={form.observacoes ?? ""}
          onChange={(event) => updateField("observacoes", event.target.value)}
          placeholder="Notas importantes, etapas, provas discursivas..."
        />
      </label>

      <div className="formActions span2">
        <button type="submit" className="primaryButton">
          Salvar concurso
        </button>
        <button type="button" className="ghostButton danger" onClick={handleReset}>
          Limpar dados
        </button>
      </div>
    </form>
  );
}
