import { useNavigate } from "react-router-dom";
import { ConcursoForm } from "../components/ConcursoForm";
import { useAviso } from "../context/AvisoContext";
import { useDados } from "../context/DadosContext";
import { useConcursoAtual } from "../hooks/useConcursoAtual";

export function DadosConcurso() {
  const { concurso } = useConcursoAtual();
  const { atualizarConcurso, removerConcurso } = useDados();
  const aviso = useAviso();
  const navegar = useNavigate();
  const { id: _id, disciplinas: _d, ...inicial } = concurso;
  void _id; void _d;

  return (
    <>
      <div className="pagina-cabecalho">
        <div>
          <h1>Dados do concurso</h1>
          <p>Informações gerais, datas e a meta de horas por semana que alimenta a divisão por peso.</p>
        </div>
        {concurso.urlEdital && (
          <a className="btn" href={concurso.urlEdital} target="_blank" rel="noreferrer">Abrir edital</a>
        )}
      </div>
      <section className="painel">
        <ConcursoForm
          key={concurso.id}
          inicial={inicial}
          rotulo="Salvar alterações"
          onSalvar={(dados) => {
            atualizarConcurso(concurso.id, dados);
            aviso.ok("Dados salvos");
          }}
        />
      </section>
      <section className="painel" style={{ marginTop: 20 }}>
        <div className="painel-cabecalho">
          <div>
            <h2>Excluir concurso</h2>
            <p>Apaga também disciplinas, conteúdos, cronograma e registros de estudo deste concurso. Não dá para desfazer.</p>
          </div>
          <button
            className="btn perigo"
            onClick={() => {
              if (window.confirm(`Excluir "${concurso.titulo}" e tudo que está dentro dele?`)) {
                removerConcurso(concurso.id);
                navegar("/");
              }
            }}
          >
            Excluir este concurso
          </button>
        </div>
      </section>
    </>
  );
}
