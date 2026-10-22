import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ConcursoForm, concursoVazio } from "../components/ConcursoForm";
import { IcoMais } from "../components/Icones";
import { Modal } from "../components/Modal";
import { useDados } from "../context/DadosContext";
import { contarConcurso } from "../utils/estatisticas";
import { diasAteProva, formatarData, hojeIso } from "../utils/datas";

export function Concursos() {
  const { concursos, criarConcurso } = useDados();
  const navegar = useNavigate();
  const [novo, setNovo] = useState(false);
  // provas mais próximas primeiro; as que já passaram e as sem data vão para o fim
  const hoje = hojeIso();
  const ordenados = [...concursos].sort((a, b) => {
    const chave = (c: typeof a) => (c.dataProva ? (c.dataProva >= hoje ? `0${c.dataProva}` : `2${c.dataProva}`) : "1");
    return chave(a).localeCompare(chave(b)) || a.titulo.localeCompare(b.titulo);
  });

  return (
    <>
      <div className="pagina-cabecalho">
        <div>
          <h1>Meus concursos</h1>
          <p>Escolha um concurso para estudar, planejar a semana ou ajustar o edital.</p>
        </div>
        <button className="btn principal" onClick={() => setNovo(true)}>
          <span style={{ width: 16, height: 16, display: "inline-flex" }}><IcoMais /></span> Novo concurso
        </button>
      </div>

      {concursos.length === 0 ? (
        <div className="vazio">
          <strong>Nenhum concurso cadastrado</strong>
          <span>Cadastre o primeiro concurso para montar o edital e a rotina de estudos.</span>
          <div className="acoes">
            <button className="btn principal" onClick={() => setNovo(true)}>Cadastrar concurso</button>
            <Link className="btn" to="/configuracoes">Importar dados que eu já tinha</Link>
          </div>
        </div>
      ) : (
        <section className="grade-cards" aria-label="Lista de concursos">
          {ordenados.map((c) => {
            const dias = diasAteProva(c.dataProva);
            const cont = contarConcurso(c);
            return (
              <article key={c.id} className="card-concurso">
                <header>
                  <div>
                    <h2>{c.titulo}</h2>
                    <p className="suave">{[c.cargo, c.banca].filter(Boolean).join(" · ") || "Sem cargo e banca informados"}</p>
                  </div>
                  <div className="contagem">
                    <strong>{dias === null ? "—" : Math.max(dias, 0)}</strong>
                    <span>{dias === null ? "sem data" : dias < 0 ? "prova passou" : "dias"}</span>
                  </div>
                </header>
                <div>
                  <div className="barra ok" role="progressbar" aria-valuenow={cont.percentual} aria-valuemin={0} aria-valuemax={100} aria-label={`Edital ${cont.percentual}% concluído`}>
                    <span style={{ width: `${cont.percentual}%` }} />
                  </div>
                  <p className="fraco" style={{ marginTop: 4 }}>{cont.percentual}% do edital concluído</p>
                </div>
                <dl>
                  <div><dt>Prova</dt><dd>{formatarData(c.dataProva)}</dd></div>
                  <div><dt>Disciplinas</dt><dd>{c.disciplinas.length}</dd></div>
                  <div><dt>Conteúdos</dt><dd>{cont.concluidos}/{cont.total}</dd></div>
                </dl>
                <footer>
                  <Link className="btn principal" to={`/c/${c.id}`}>Abrir</Link>
                  <Link className="btn" to={`/c/${c.id}/estudar`}>Estudar agora</Link>
                </footer>
              </article>
            );
          })}
        </section>
      )}

      {novo && (
        <Modal titulo="Novo concurso" descricao="Só o nome é obrigatório. O resto pode ser completado depois." onFechar={() => setNovo(false)} larga>
          <ConcursoForm
            inicial={concursoVazio}
            rotulo="Criar e abrir"
            onSalvar={(dados) => {
              const id = criarConcurso(dados);
              setNovo(false);
              navegar(`/c/${id}`);
            }}
          />
        </Modal>
      )}
    </>
  );
}
