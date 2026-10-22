import { useMemo, useState } from "react";
import { AdicionarConteudosModal, EditarConteudoModal } from "../components/ConteudoModal";
import { CORES, DisciplinaModal } from "../components/DisciplinaModal";
import { IcoCheck, IcoLapis, IcoLixeira, IcoMais, IcoSeta } from "../components/Icones";
import { useAviso } from "../context/AvisoContext";
import { useDados } from "../context/DadosContext";
import { useConcursoAtual } from "../hooks/useConcursoAtual";
import type { Conteudo, ConteudoStatus, Disciplina } from "../types";
import { contarConteudos, listarConteudos } from "../utils/estatisticas";

const proximo: Record<ConteudoStatus, ConteudoStatus> = { pendente: "em_estudo", em_estudo: "concluido", concluido: "pendente" };
const rotuloStatus: Record<ConteudoStatus, string> = { pendente: "Pendente", em_estudo: "Em estudo", concluido: "Concluído" };

const filtrar = (nos: Conteudo[], q: string): Conteudo[] =>
  nos.flatMap((n) => {
    const filhos = filtrar(n.filhos, q);
    return n.titulo.toLowerCase().includes(q) || filhos.length ? [{ ...n, filhos }] : [];
  });

type Alvo =
  | { tipo: "disciplina"; disciplina?: Disciplina }
  | { tipo: "adicionar"; disciplina: Disciplina; pai: Conteudo | null }
  | { tipo: "editar"; conteudo: Conteudo };

export function Edital() {
  const { concurso } = useConcursoAtual();
  const d = useDados();
  const aviso = useAviso();
  const [alvo, setAlvo] = useState<Alvo | null>(null);
  const [busca, setBusca] = useState("");
  const [fechadas, setFechadas] = useState<Set<string>>(new Set());
  const [nosFechados, setNosFechados] = useState<Set<string>>(new Set());

  const q = busca.trim().toLowerCase();
  const alternar = (conj: Set<string>, id: string) => {
    const novo = new Set(conj);
    if (novo.has(id)) novo.delete(id);
    else novo.add(id);
    return novo;
  };

  const total = useMemo(
    () => concurso.disciplinas.reduce((s, x) => s + listarConteudos(x.conteudos).length, 0),
    [concurso.disciplinas],
  );

  const renderNo = (no: Conteudo, disciplina: Disciplina) => {
    const tem = no.filhos.length > 0;
    const aberto = q ? true : !nosFechados.has(no.id);
    return (
      <li key={no.id}>
        <div className={`no-conteudo ${no.status}`}>
          <button
            type="button"
            className={`expansor${tem ? "" : " vazio-slot"}${aberto ? " aberto" : ""}`}
            onClick={() => setNosFechados(alternar(nosFechados, no.id))}
            aria-label={aberto ? "Recolher subtópicos" : "Mostrar subtópicos"}
            aria-expanded={tem ? aberto : undefined}
            tabIndex={tem ? 0 : -1}
          >
            <IcoSeta />
          </button>
          <button
            type="button"
            className={`status-btn ${no.status}`}
            onClick={() => d.definirStatus(no.id, proximo[no.status], true)}
            title={`${rotuloStatus[no.status]} — clique para mudar`}
            aria-label={`${no.titulo}: ${rotuloStatus[no.status]}. Clique para mudar.`}
          >
            {no.status === "concluido" && <IcoCheck />}
          </button>
          <div className="texto">
            <span className="titulo">{no.titulo}</span>
            {no.observacao && <small>{no.observacao}</small>}
          </div>
          <div className="acoes-no">
            <button type="button" className="btn fantasma icone" title="Adicionar subtópico" aria-label={`Adicionar subtópico em ${no.titulo}`}
              onClick={() => setAlvo({ tipo: "adicionar", disciplina, pai: no })}><span style={{ width: 15, height: 15, display: "inline-flex" }}><IcoMais /></span></button>
            <button type="button" className="btn fantasma icone" title="Editar" aria-label={`Editar ${no.titulo}`}
              onClick={() => setAlvo({ tipo: "editar", conteudo: no })}><span style={{ width: 15, height: 15, display: "inline-flex" }}><IcoLapis /></span></button>
            <button type="button" className="btn fantasma icone perigo" title="Excluir" aria-label={`Excluir ${no.titulo}`}
              onClick={() => {
                if (window.confirm(`Excluir "${no.titulo}"${tem ? " e seus subtópicos" : ""}?`)) d.removerConteudo(no.id);
              }}><span style={{ width: 15, height: 15, display: "inline-flex" }}><IcoLixeira /></span></button>
          </div>
        </div>
        {tem && aberto && <ul>{no.filhos.map((f) => renderNo(f, disciplina))}</ul>}
      </li>
    );
  };

  return (
    <>
      <div className="pagina-cabecalho">
        <div>
          <h1>Edital</h1>
          <p>Disciplinas e conteúdos do edital. Clique no círculo para marcar o andamento: pendente, em estudo, concluído.</p>
        </div>
        <button className="btn principal" onClick={() => setAlvo({ tipo: "disciplina" })}>
          <span style={{ width: 16, height: 16, display: "inline-flex" }}><IcoMais /></span> Nova disciplina
        </button>
      </div>

      {concurso.disciplinas.length > 0 && (
        <div className="barra-ferramentas">
          <input type="search" placeholder="Buscar conteúdo" aria-label="Buscar conteúdo" value={busca} onChange={(e) => setBusca(e.target.value)} />
          <button className="btn pequeno" onClick={() => { setFechadas(new Set()); setNosFechados(new Set()); }}>Expandir tudo</button>
          <button className="btn pequeno" onClick={() => {
            setFechadas(new Set(concurso.disciplinas.map((x) => x.id)));
          }}>Recolher disciplinas</button>
          <span className="fraco">{total} conteúdos no total</span>
        </div>
      )}

      {concurso.disciplinas.length === 0 ? (
        <div className="vazio">
          <strong>O edital ainda está vazio</strong>
          <span>Comece pelas disciplinas. Depois cole a lista de conteúdos de cada uma — um por linha.</span>
          <button className="btn principal" onClick={() => setAlvo({ tipo: "disciplina" })}>Adicionar primeira disciplina</button>
        </div>
      ) : (
        concurso.disciplinas.map((disc) => {
          const cont = contarConteudos(disc.conteudos);
          const visiveis = q ? filtrar(disc.conteudos, q) : disc.conteudos;
          if (q && visiveis.length === 0) return null;
          const aberta = q ? true : !fechadas.has(disc.id);
          return (
            <section key={disc.id} className="disciplina-bloco" style={{ ["--cor" as string]: disc.cor }}>
              <div className="disciplina-topo">
                <div className="titulo">
                  <button type="button" className="recolher" onClick={() => setFechadas(alternar(fechadas, disc.id))} aria-expanded={aberta}>
                    {disc.nome}
                  </button>
                  <div className="meta">
                    <span>Peso {disc.peso}</span>
                    <span>{cont.concluidos}/{cont.total} concluídos</span>
                    {cont.emEstudo > 0 && <span>{cont.emEstudo} em estudo</span>}
                  </div>
                </div>
                <div className="progresso">
                  <div className="barra ok" role="progressbar" aria-valuenow={cont.percentual} aria-valuemin={0} aria-valuemax={100} aria-label={`${disc.nome}: ${cont.percentual}%`}>
                    <span style={{ width: `${cont.percentual}%` }} />
                  </div>
                </div>
                <div className="acoes">
                  <button className="btn pequeno" onClick={() => setAlvo({ tipo: "adicionar", disciplina: disc, pai: null })}>Adicionar conteúdos</button>
                  <button className="btn pequeno fantasma" onClick={() => setAlvo({ tipo: "disciplina", disciplina: disc })}>Editar</button>
                  <button className="btn pequeno fantasma perigo" onClick={() => {
                    if (window.confirm(`Excluir a disciplina "${disc.nome}" e todos os seus conteúdos?`)) d.removerDisciplina(disc.id);
                  }}>Excluir</button>
                </div>
              </div>
              {aberta && (
                visiveis.length === 0 ? (
                  <div style={{ padding: 16, borderTop: "1px solid var(--linha)" }}>
                    <div className="vazio pequeno">
                      Nenhum conteúdo nesta disciplina.
                      <button className="btn principal pequeno" onClick={() => setAlvo({ tipo: "adicionar", disciplina: disc, pai: null })}>Colar conteúdos do edital</button>
                    </div>
                  </div>
                ) : (
                  <ul className="arvore">{visiveis.map((n) => renderNo(n, disc))}</ul>
                )
              )}
            </section>
          );
        })
      )}

      {alvo?.tipo === "disciplina" && (
        <DisciplinaModal
          disciplina={alvo.disciplina}
          corSugerida={CORES[concurso.disciplinas.length % CORES.length]}
          onFechar={() => setAlvo(null)}
          onSalvar={(dados) => {
            if (alvo.disciplina) d.atualizarDisciplina(alvo.disciplina.id, dados);
            else d.addDisciplina(concurso.id, dados);
            setAlvo(null);
          }}
        />
      )}
      {alvo?.tipo === "adicionar" && (
        <AdicionarConteudosModal
          contexto={alvo.pai ? `Subtópicos de “${alvo.pai.titulo}”` : `Conteúdos de ${alvo.disciplina.nome}`}
          onFechar={() => setAlvo(null)}
          onAdicionar={(titulos) => {
            d.addConteudosEmLote(alvo.disciplina.id, alvo.pai?.id ?? null, titulos);
            aviso.ok(`${titulos.length} ${titulos.length === 1 ? "conteúdo adicionado" : "conteúdos adicionados"}`);
            setAlvo(null);
          }}
        />
      )}
      {alvo?.tipo === "editar" && (
        <EditarConteudoModal
          titulo={alvo.conteudo.titulo}
          observacao={alvo.conteudo.observacao}
          onFechar={() => setAlvo(null)}
          onSalvar={(dados) => {
            d.atualizarConteudo(alvo.conteudo.id, dados);
            setAlvo(null);
          }}
        />
      )}
    </>
  );
}
