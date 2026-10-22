import { useMemo, useState } from "react";
import { Link, NavLink, Outlet, useLocation, useMatch, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useDados } from "../context/DadosContext";
import { useTema } from "../hooks/useTema";
import { diasAteProva } from "../utils/datas";
import {
  IcoCalendario, IcoConfig, IcoGrafico, IcoInicio, IcoLista, IcoMenu, IcoPeso, IcoRelogio, IcoVoltar, Logo,
} from "./Icones";
import type { ContextoConcurso } from "../hooks/useConcursoAtual";

/** Moldura de todas as telas internas: menu lateral + conteúdo. */
export function Layout() {
  const { concursos, carregando, erroCarga, recarregar, dados } = useDados();
  const { user, sair } = useAuth();
  const { tema, alternar } = useTema();
  const concursoId = useMatch("/c/:concursoId/*")?.params.concursoId;
  const local = useLocation();
  const navegar = useNavigate();
  // o menu do celular fecha sozinho ao trocar de rota (aberto só vale para a rota em que foi aberto)
  const [menuEm, setMenuEm] = useState<string | null>(null);
  const aberta = menuEm === local.pathname;

  const concurso = concursos.find((c) => c.id === concursoId);

  const contexto = useMemo<ContextoConcurso | null>(
    () =>
      concurso
        ? {
            concurso,
            cronograma: dados.cronograma.filter((i) => i.concursoId === concurso.id),
            registros: dados.registros.filter((r) => r.concursoId === concurso.id),
          }
        : null,
    [concurso, dados.cronograma, dados.registros],
  );

  const dias = concurso ? diasAteProva(concurso.dataProva) : null;
  const base = concurso ? `/c/${concurso.id}` : "";

  return (
    <div className="app">
      <div className="topo-mobile">
        <button type="button" className="btn" onClick={() => setMenuEm(local.pathname)} aria-label="Abrir menu">
          <span style={{ width: 18, height: 18, display: "inline-flex" }}><IcoMenu /></span>
        </button>
        <strong>{concurso?.titulo ?? "Caderno de Concursos"}</strong>
      </div>

      <aside className={`lateral${aberta ? " aberta" : ""}`} aria-label="Menu principal">
        <Link to="/" className="marca">
          <Logo /> Caderno de Concursos
        </Link>

        {concurso ? (
          <>
            <div className="concurso-atual">
              <strong>{concurso.titulo}</strong>
              <span>{[concurso.cargo, concurso.banca].filter(Boolean).join(" · ") || "Complete os dados do concurso"}</span>
              {dias !== null && (
                <span>{dias > 0 ? `Faltam ${dias} dias para a prova` : dias === 0 ? "A prova é hoje" : "Prova já realizada"}</span>
              )}
            </div>

            <nav className="grupo" aria-label="Seções do concurso">
              <NavLink to={base} end className="item"><IcoInicio />Visão geral</NavLink>
              <NavLink to={`${base}/estudar`} className="item"><IcoRelogio />Estudar agora</NavLink>
              <NavLink to={`${base}/planejamento`} className="item"><IcoCalendario />Planejamento</NavLink>
              <NavLink to={`${base}/pesos`} className="item"><IcoPeso />Pesos e metas</NavLink>
              <NavLink to={`${base}/edital`} className="item"><IcoLista />Edital</NavLink>
              <NavLink to={`${base}/historico`} className="item"><IcoGrafico />Histórico</NavLink>
              <NavLink to={`${base}/dados`} className="item"><IcoConfig />Dados do concurso</NavLink>
            </nav>

            <nav className="grupo" aria-label="Outros concursos">
              <div className="grupo-titulo">Trocar de concurso</div>
              <Link to="/" className="item"><IcoVoltar />Todos os concursos</Link>
              {concursos
                .filter((c) => c.id !== concurso.id)
                .slice(0, 5)
                .map((c) => (
                  <Link key={c.id} to={`/c/${c.id}`} className="item">{c.titulo}</Link>
                ))}
            </nav>
          </>
        ) : (
          <nav className="grupo" aria-label="Principal">
            <NavLink to="/" end className="item"><IcoInicio />Meus concursos</NavLink>
            <NavLink to="/configuracoes" className="item"><IcoConfig />Backup e importação</NavLink>
          </nav>
        )}

        <div className="rodape">
          <span>{user?.email}</span>
          <button type="button" onClick={alternar}>Tema {tema === "claro" ? "escuro" : "claro"}</button>
          {concurso && <Link to="/configuracoes" style={{ color: "#cfd7e8" }}>Backup e importação</Link>}
          <button
            type="button"
            onClick={async () => {
              await sair();
              navegar("/login");
            }}
          >
            Sair
          </button>
        </div>
      </aside>

      <main className="conteudo">
        {carregando ? (
          <div className="carregando"><div className="spinner" /><span>Carregando seus dados…</span></div>
        ) : erroCarga ? (
          <div className="vazio">
            <strong>Não foi possível carregar os dados</strong>
            <span>{erroCarga}</span>
            <span className="fraco">Confira se a API está no ar e se VITE_API_URL aponta para ela.</span>
            <button className="btn principal" onClick={() => void recarregar()}>Tentar de novo</button>
          </div>
        ) : concursoId && !concurso ? (
          <div className="vazio">
            <strong>Concurso não encontrado</strong>
            <span>Ele pode ter sido excluído.</span>
            <Link className="btn principal" to="/">Ver meus concursos</Link>
          </div>
        ) : (
          <Outlet context={contexto} />
        )}
      </main>
    </div>
  );
}
