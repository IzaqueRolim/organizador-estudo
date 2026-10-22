import { useMemo, useRef, useState } from "react";
import { useAviso } from "../context/AvisoContext";
import { useDados } from "../context/DadosContext";
import { gerarBackup, interpretarArquivo, converterLegado, lerLocalStorageLegado } from "../utils/importacao";
import type { Dados } from "../types";

const resumo = (d: Dados) =>
  `${d.concursos.length} concurso(s), ${d.disciplinas.length} disciplina(s), ${d.conteudos.length} conteúdo(s)` +
  (d.cronograma.length ? `, ${d.cronograma.length} itens de cronograma` : "") +
  (d.registros.length ? `, ${d.registros.length} registros de estudo` : "");

export function Backup() {
  const { dados, importarPacote, concursos } = useDados();
  const aviso = useAviso();
  const arquivo = useRef<HTMLInputElement>(null);
  const [ocupado, setOcupado] = useState(false);
  const legado = useMemo(() => lerLocalStorageLegado(), []);
  const pacoteLegado = useMemo(() => (legado ? converterLegado(legado) : null), [legado]);

  const importar = async (pacote: Dados, origem: string) => {
    if (concursos.length > 0 && !window.confirm(`Você já tem ${concursos.length} concurso(s) salvo(s). Importar vai ADICIONAR estes dados (${resumo(pacote)}) sem apagar nada. Continuar?`)) return;
    setOcupado(true);
    try {
      await importarPacote(pacote);
      aviso.ok(`Importado de ${origem}: ${resumo(pacote)}`);
    } catch (e) {
      aviso.erro(e instanceof Error ? e.message : "Falha ao importar.");
    } finally {
      setOcupado(false);
    }
  };

  const exportar = () => {
    const blob = new Blob([JSON.stringify(gerarBackup(dados), null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `caderno-concursos-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <div className="pagina-cabecalho">
        <div><h1>Backup e importação</h1><p>Traga os dados que você tinha antes e guarde uma cópia de segurança quando quiser.</p></div>
      </div>

      <section className="painel">
        <div className="painel-cabecalho">
          <div>
            <h2>Dados salvos no navegador (versão anterior)</h2>
            <p>A versão antiga guardava tudo neste navegador. Se você abriu este app no mesmo endereço de antes (ex.: localhost:5173), os dados aparecem aqui.</p>
          </div>
        </div>
        {pacoteLegado ? (
          <div className="acoes">
            <span className="selo ok">Encontrado: {resumo(pacoteLegado)}</span>
            <button className="btn principal" disabled={ocupado} onClick={() => importar(pacoteLegado, "este navegador")}>Importar para minha conta</button>
          </div>
        ) : (
          <div className="vazio pequeno">Nada encontrado neste navegador. Use o arquivo ou os concursos de exemplo abaixo.</div>
        )}
      </section>

      <section className="painel">
        <div className="painel-cabecalho">
          <div>
            <h2>Concursos que vinham no projeto</h2>
            <p>Os editais que estavam embutidos no código da versão anterior (BB, TJSP e Dataprev), com disciplinas e conteúdos.</p>
          </div>
        </div>
        <button className="btn" disabled={ocupado} onClick={async () => {
          const { criarEstadoExemplo } = await import("../data/exemplos");
          await importar(converterLegado(criarEstadoExemplo()), "exemplos do projeto");
        }}>Importar exemplos</button>
      </section>

      <section className="painel">
        <div className="painel-cabecalho">
          <div><h2>Arquivo de backup</h2><p>Exporte tudo em um arquivo JSON ou importe um arquivo exportado antes.</p></div>
        </div>
        <div className="acoes">
          <button className="btn" onClick={exportar} disabled={concursos.length === 0}>Exportar backup</button>
          <button className="btn" disabled={ocupado} onClick={() => arquivo.current?.click()}>Importar arquivo…</button>
          <input ref={arquivo} type="file" accept="application/json,.json" hidden onChange={async (e) => {
            const f = e.target.files?.[0];
            e.target.value = "";
            if (!f) return;
            try {
              await importar(interpretarArquivo(await f.text()), f.name);
            } catch (err) {
              aviso.erro(err instanceof Error ? err.message : "Arquivo inválido.");
            }
          }} />
        </div>
      </section>
    </>
  );
}
