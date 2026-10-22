import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import * as db from "../lib/db";
import { useAuth } from "./AuthContext";
import { useAviso } from "./AvisoContext";
import {
  dadosVazios,
  type ConcursoBase,
  type Concurso,
  type ConteudoRow,
  type ConteudoStatus,
  type CronogramaItem,
  type Dados,
  type DisciplinaRow,
  type NovaDisciplina,
  type NovoConcurso,
  type NovoConteudo,
  type NovoCronogramaItem,
  type NovoRegistroEstudo,
  type RegistroEstudo,
} from "../types";
import { montarConcursos } from "../utils/estatisticas";

interface DadosValue {
  dados: Dados;
  concursos: Concurso[];
  carregando: boolean;
  erroCarga: string | null;
  recarregar: () => Promise<void>;

  criarConcurso: (parcial?: NovoConcurso) => string;
  atualizarConcurso: (id: string, parcial: Partial<Omit<ConcursoBase, "id">>) => void;
  removerConcurso: (id: string) => void;

  addDisciplina: (concursoId: string, nova: NovaDisciplina) => string;
  atualizarDisciplina: (id: string, parcial: Partial<Pick<DisciplinaRow, "nome" | "cor" | "peso">>) => void;
  removerDisciplina: (id: string) => void;

  addConteudo: (disciplinaId: string, parentId: string | null, novo: NovoConteudo) => string;
  addConteudosEmLote: (disciplinaId: string, parentId: string | null, titulos: string[]) => void;
  atualizarConteudo: (id: string, parcial: Partial<Pick<ConteudoRow, "titulo" | "observacao">>) => void;
  definirStatus: (id: string, status: ConteudoStatus, comFilhos?: boolean) => void;
  removerConteudo: (id: string) => void;

  addCronograma: (concursoId: string, item: NovoCronogramaItem) => string;
  addCronogramaVarios: (concursoId: string, itens: NovoCronogramaItem[]) => void;
  atualizarCronograma: (id: string, parcial: Partial<Omit<CronogramaItem, "id" | "concursoId">>) => void;
  removerCronograma: (id: string) => void;
  removerCronogramaVarios: (ids: string[]) => void;

  registrarEstudo: (concursoId: string, registro: NovoRegistroEstudo) => string;
  atualizarRegistro: (id: string, parcial: Partial<Omit<RegistroEstudo, "id" | "concursoId">>) => void;
  removerRegistro: (id: string) => void;

  importarPacote: (pacote: Dados) => Promise<void>;
}

const DadosContext = createContext<DadosValue | null>(null);
const novoId = () => crypto.randomUUID();

const descendentes = (conteudos: ConteudoRow[], id: string): Set<string> => {
  const filhos = new Map<string, string[]>();
  conteudos.forEach((c) => {
    if (c.parentId) filhos.set(c.parentId, [...(filhos.get(c.parentId) ?? []), c.id]);
  });
  const resultado = new Set<string>([id]);
  const fila = [id];
  while (fila.length) {
    const atual = fila.pop()!;
    (filhos.get(atual) ?? []).forEach((f) => {
      if (!resultado.has(f)) {
        resultado.add(f);
        fila.push(f);
      }
    });
  }
  return resultado;
};

export function DadosProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const aviso = useAviso();
  const [dados, setDados] = useState<Dados>(dadosVazios);
  const [carregando, setCarregando] = useState(true);
  const [erroCarga, setErroCarga] = useState<string | null>(null);
  const dadosRef = useRef(dados);
  // mantém a referência e o estado sempre juntos: várias mudanças no mesmo
  // instante (antes de um novo render) precisam enxergar umas às outras
  const definir = useCallback((novo: Dados) => {
    dadosRef.current = novo;
    setDados(novo);
  }, []);

  const recarregar = useCallback(async () => {
    setCarregando(true);
    setErroCarga(null);
    try {
      definir(await db.carregarTudo());
    } catch (e) {
      setErroCarga(e instanceof Error ? e.message : "Não foi possível carregar os dados.");
    } finally {
      setCarregando(false);
    }
  }, [definir]);

  // o provider só existe com usuário logado; recarrega se a conta mudar
  const userId = user?.id;
  useEffect(() => {
    let cancelado = false;
    db.carregarTudo()
      .then((d) => {
        if (cancelado) return;
        definir(d);
        setErroCarga(null);
        setCarregando(false);
      })
      .catch((e: unknown) => {
        if (cancelado) return;
        setErroCarga(e instanceof Error ? e.message : "Não foi possível carregar os dados.");
        setCarregando(false);
      });
    return () => {
      cancelado = true;
    };
  }, [userId, definir]);

  /**
   * Atualiza a tela na hora e grava no banco em seguida. As gravações entram
   * numa fila (uma por vez, na ordem) para que chaves estrangeiras sempre
   * existam quando forem referenciadas. Se o banco recusar, avisa e volta a
   * mostrar o que está realmente salvo.
   */
  const fila = useRef<Promise<unknown>>(Promise.resolve());
  const mutar = useCallback(
    (aplicar: (d: Dados) => Dados, gravar: () => Promise<unknown>) => {
      definir(aplicar(dadosRef.current));
      fila.current = fila.current
        .then(gravar)
        .catch(async (e: unknown) => {
          aviso.erro(e instanceof Error ? e.message : "Não foi possível salvar a alteração.");
          try {
            definir(await db.carregarTudo());
          } catch {
            /* mantém o estado atual se a ressincronização também falhar */
          }
        });
    },
    [aviso, definir],
  );

  /* ------------------------------ concursos ------------------------------ */

  const criarConcurso = useCallback(
    (parcial: NovoConcurso = {}) => {
      const concurso: ConcursoBase = {
        id: novoId(),
        titulo: parcial.titulo?.trim() || "Novo concurso",
        orgao: parcial.orgao ?? "",
        banca: parcial.banca ?? "",
        cargo: parcial.cargo ?? "",
        nivel: parcial.nivel ?? "superior",
        vagas: parcial.vagas ?? 0,
        salario: parcial.salario ?? 0,
        dataProva: parcial.dataProva ?? "",
        dataInscricaoInicio: parcial.dataInscricaoInicio ?? "",
        dataInscricaoFim: parcial.dataInscricaoFim ?? "",
        urlEdital: parcial.urlEdital ?? "",
        observacoes: parcial.observacoes ?? "",
        metaHorasSemana: parcial.metaHorasSemana ?? 20,
      };
      mutar(
        (d) => ({ ...d, concursos: [...d.concursos, concurso] }),
        () => db.inserir("concursos", db.concursoParaRow(concurso)),
      );
      return concurso.id;
    },
    [mutar],
  );

  const atualizarConcurso = useCallback<DadosValue["atualizarConcurso"]>(
    (id, parcial) => {
      const limpo = { ...parcial };
      if (limpo.titulo !== undefined && !limpo.titulo.trim()) delete limpo.titulo;
      mutar(
        (d) => ({ ...d, concursos: d.concursos.map((c) => (c.id === id ? { ...c, ...limpo } : c)) }),
        () => db.atualizar("concursos", id, db.concursoParaRow(limpo)),
      );
    },
    [mutar],
  );

  const removerConcurso = useCallback(
    (id: string) =>
      mutar(
        (d) => ({
          concursos: d.concursos.filter((c) => c.id !== id),
          disciplinas: d.disciplinas.filter((x) => x.concursoId !== id),
          conteudos: d.conteudos.filter((x) => x.concursoId !== id),
          cronograma: d.cronograma.filter((x) => x.concursoId !== id),
          registros: d.registros.filter((x) => x.concursoId !== id),
        }),
        () => db.remover("concursos", id),
      ),
    [mutar],
  );

  /* ----------------------------- disciplinas ----------------------------- */

  const addDisciplina = useCallback<DadosValue["addDisciplina"]>(
    (concursoId, nova) => {
      const ordem = dadosRef.current.disciplinas.filter((d) => d.concursoId === concursoId).length;
      const disciplina: DisciplinaRow = {
        id: novoId(),
        concursoId,
        nome: nova.nome.trim() || "Disciplina",
        cor: nova.cor,
        peso: Math.min(1000, Math.max(0, nova.peso)),
        ordem,
      };
      mutar(
        (d) => ({ ...d, disciplinas: [...d.disciplinas, disciplina] }),
        () => db.inserir("disciplinas", db.disciplinaParaRow(disciplina)),
      );
      return disciplina.id;
    },
    [mutar],
  );

  const atualizarDisciplina = useCallback<DadosValue["atualizarDisciplina"]>(
    (id, parcial) => {
      const limpo = { ...parcial };
      if (limpo.nome !== undefined && !limpo.nome.trim()) delete limpo.nome;
      if (limpo.peso !== undefined) limpo.peso = Math.min(1000, Math.max(0, limpo.peso));
      mutar(
        (d) => ({ ...d, disciplinas: d.disciplinas.map((x) => (x.id === id ? { ...x, ...limpo } : x)) }),
        () => db.atualizar("disciplinas", id, db.disciplinaParaRow(limpo)),
      );
    },
    [mutar],
  );

  const removerDisciplina = useCallback(
    (id: string) =>
      mutar(
        (d) => ({
          ...d,
          disciplinas: d.disciplinas.filter((x) => x.id !== id),
          conteudos: d.conteudos.filter((x) => x.disciplinaId !== id),
          cronograma: d.cronograma.map((x) =>
            x.disciplinaId === id ? { ...x, disciplinaId: null, conteudoId: null } : x,
          ),
          registros: d.registros.map((x) =>
            x.disciplinaId === id ? { ...x, disciplinaId: null, conteudoId: null } : x,
          ),
        }),
        () => db.remover("disciplinas", id),
      ),
    [mutar],
  );

  /* ------------------------------ conteúdos ------------------------------ */

  const montarConteudos = (disciplinaId: string, parentId: string | null, titulos: NovoConteudo[]) => {
    const disciplina = dadosRef.current.disciplinas.find((d) => d.id === disciplinaId);
    const irmaos = dadosRef.current.conteudos.filter(
      (c) => c.disciplinaId === disciplinaId && c.parentId === parentId,
    ).length;
    return titulos
      .filter((t) => t.titulo.trim())
      .map<ConteudoRow>((t, i) => ({
        id: novoId(),
        concursoId: disciplina?.concursoId ?? "",
        disciplinaId,
        parentId,
        titulo: t.titulo.trim(),
        observacao: t.observacao?.trim() ?? "",
        status: t.status ?? "pendente",
        ordem: irmaos + i,
      }));
  };

  const inserirConteudos = useCallback(
    (linhas: ConteudoRow[]) => {
      if (!linhas.length) return;
      mutar(
        (d) => ({ ...d, conteudos: [...d.conteudos, ...linhas] }),
        () => db.inserir("conteudos", linhas.map(db.conteudoParaRow)),
      );
    },
    [mutar],
  );

  const addConteudo = useCallback<DadosValue["addConteudo"]>(
    (disciplinaId, parentId, novo) => {
      const [linha] = montarConteudos(disciplinaId, parentId, [novo]);
      if (!linha) return "";
      inserirConteudos([linha]);
      return linha.id;
    },
    [inserirConteudos],
  );

  const addConteudosEmLote = useCallback<DadosValue["addConteudosEmLote"]>(
    (disciplinaId, parentId, titulos) =>
      inserirConteudos(montarConteudos(disciplinaId, parentId, titulos.map((titulo) => ({ titulo })))),
    [inserirConteudos],
  );

  const atualizarConteudo = useCallback<DadosValue["atualizarConteudo"]>(
    (id, parcial) => {
      const limpo = { ...parcial };
      if (limpo.titulo !== undefined && !limpo.titulo.trim()) delete limpo.titulo;
      mutar(
        (d) => ({ ...d, conteudos: d.conteudos.map((c) => (c.id === id ? { ...c, ...limpo } : c)) }),
        () => db.atualizar("conteudos", id, db.conteudoParaRow(limpo)),
      );
    },
    [mutar],
  );

  const definirStatus = useCallback<DadosValue["definirStatus"]>(
    (id, status, comFilhos = true) => {
      const alvo = comFilhos ? descendentes(dadosRef.current.conteudos, id) : new Set([id]);
      mutar(
        (d) => ({ ...d, conteudos: d.conteudos.map((c) => (alvo.has(c.id) ? { ...c, status } : c)) }),
        () => db.atualizarVarios("conteudos", [...alvo], { status }),
      );
    },
    [mutar],
  );

  const removerConteudo = useCallback(
    (id: string) => {
      const alvo = descendentes(dadosRef.current.conteudos, id);
      mutar(
        (d) => ({
          ...d,
          conteudos: d.conteudos.filter((c) => !alvo.has(c.id)),
          cronograma: d.cronograma.map((i) => (i.conteudoId && alvo.has(i.conteudoId) ? { ...i, conteudoId: null } : i)),
          registros: d.registros.map((r) => (r.conteudoId && alvo.has(r.conteudoId) ? { ...r, conteudoId: null } : r)),
        }),
        () => db.remover("conteudos", id),
      );
    },
    [mutar],
  );

  /* ------------------------------ cronograma ----------------------------- */

  const montarItem = (concursoId: string, item: NovoCronogramaItem): CronogramaItem => ({
    ...item,
    id: novoId(),
    concursoId,
    concluido: item.concluido ?? false,
    duracaoMinutos: Math.min(1440, Math.max(5, Math.round(item.duracaoMinutos))),
    titulo: item.titulo.trim() || "Estudo",
  });

  const addCronogramaVarios = useCallback<DadosValue["addCronogramaVarios"]>(
    (concursoId, itens) => {
      const novos = itens.map((i) => montarItem(concursoId, i));
      if (!novos.length) return;
      mutar(
        (d) => ({ ...d, cronograma: [...d.cronograma, ...novos] }),
        () => db.inserir("cronograma_itens", novos.map(db.cronogramaParaRow)),
      );
    },
    [mutar],
  );

  const addCronograma = useCallback<DadosValue["addCronograma"]>(
    (concursoId, item) => {
      const novo = montarItem(concursoId, item);
      mutar(
        (d) => ({ ...d, cronograma: [...d.cronograma, novo] }),
        () => db.inserir("cronograma_itens", db.cronogramaParaRow(novo)),
      );
      return novo.id;
    },
    [mutar],
  );

  const atualizarCronograma = useCallback<DadosValue["atualizarCronograma"]>(
    (id, parcial) => {
      const limpo = { ...parcial };
      if (limpo.duracaoMinutos !== undefined)
        limpo.duracaoMinutos = Math.min(1440, Math.max(5, Math.round(limpo.duracaoMinutos)));
      mutar(
        (d) => ({ ...d, cronograma: d.cronograma.map((i) => (i.id === id ? { ...i, ...limpo } : i)) }),
        () => db.atualizar("cronograma_itens", id, db.cronogramaParaRow(limpo)),
      );
    },
    [mutar],
  );

  const removerCronograma = useCallback(
    (id: string) =>
      mutar(
        (d) => ({ ...d, cronograma: d.cronograma.filter((i) => i.id !== id) }),
        () => db.remover("cronograma_itens", id),
      ),
    [mutar],
  );

  const removerCronogramaVarios = useCallback(
    (ids: string[]) => {
      const alvo = new Set(ids);
      mutar(
        (d) => ({ ...d, cronograma: d.cronograma.filter((i) => !alvo.has(i.id)) }),
        async () => {
          for (const id of ids) await db.remover("cronograma_itens", id);
        },
      );
    },
    [mutar],
  );

  /* ------------------------------- registros ------------------------------ */

  const registrarEstudo = useCallback<DadosValue["registrarEstudo"]>(
    (concursoId, registro) => {
      const novo: RegistroEstudo = {
        ...registro,
        id: novoId(),
        concursoId,
        criadoEm: new Date().toISOString(),
        minutos: Math.min(1440, Math.max(1, Math.round(registro.minutos))),
        questoesAcertos: Math.min(registro.questoesAcertos, registro.questoesFeitas),
      };
      const conteudo = novo.conteudoId
        ? dadosRef.current.conteudos.find((c) => c.id === novo.conteudoId)
        : undefined;
      const iniciarConteudo = conteudo?.status === "pendente";
      const item = novo.cronogramaItemId
        ? dadosRef.current.cronograma.find((i) => i.id === novo.cronogramaItemId)
        : undefined;
      const concluirItem = Boolean(item && !item.concluido);

      mutar(
        (d) => ({
          ...d,
          registros: [...d.registros, novo],
          conteudos: iniciarConteudo
            ? d.conteudos.map((c) => (c.id === novo.conteudoId ? { ...c, status: "em_estudo" as const } : c))
            : d.conteudos,
          cronograma: concluirItem
            ? d.cronograma.map((i) => (i.id === novo.cronogramaItemId ? { ...i, concluido: true } : i))
            : d.cronograma,
        }),
        async () => {
          await db.inserir("registros_estudo", db.registroParaRow(novo));
          if (iniciarConteudo && novo.conteudoId) await db.atualizar("conteudos", novo.conteudoId, { status: "em_estudo" });
          if (concluirItem && novo.cronogramaItemId)
            await db.atualizar("cronograma_itens", novo.cronogramaItemId, { concluido: true });
        },
      );
      return novo.id;
    },
    [mutar],
  );

  const atualizarRegistro = useCallback<DadosValue["atualizarRegistro"]>(
    (id, parcial) =>
      mutar(
        (d) => ({ ...d, registros: d.registros.map((r) => (r.id === id ? { ...r, ...parcial } : r)) }),
        () => db.atualizar("registros_estudo", id, db.registroParaRow(parcial)),
      ),
    [mutar],
  );

  const removerRegistro = useCallback(
    (id: string) =>
      mutar(
        (d) => ({ ...d, registros: d.registros.filter((r) => r.id !== id) }),
        () => db.remover("registros_estudo", id),
      ),
    [mutar],
  );

  /* ------------------------------- importação ------------------------------ */

  const importarPacote = useCallback(
    async (pacote: Dados) => {
      await db.inserirPacote(pacote);
      await recarregar();
    },
    [recarregar],
  );

  const concursos = useMemo(() => montarConcursos(dados), [dados]);

  const value = useMemo<DadosValue>(
    () => ({
      dados,
      concursos,
      carregando,
      erroCarga,
      recarregar,
      criarConcurso,
      atualizarConcurso,
      removerConcurso,
      addDisciplina,
      atualizarDisciplina,
      removerDisciplina,
      addConteudo,
      addConteudosEmLote,
      atualizarConteudo,
      definirStatus,
      removerConteudo,
      addCronograma,
      addCronogramaVarios,
      atualizarCronograma,
      removerCronograma,
      removerCronogramaVarios,
      registrarEstudo,
      atualizarRegistro,
      removerRegistro,
      importarPacote,
    }),
    [
      dados, concursos, carregando, erroCarga, recarregar, criarConcurso, atualizarConcurso, removerConcurso,
      addDisciplina, atualizarDisciplina, removerDisciplina, addConteudo, addConteudosEmLote, atualizarConteudo,
      definirStatus, removerConteudo, addCronograma, addCronogramaVarios, atualizarCronograma, removerCronograma,
      removerCronogramaVarios, registrarEstudo, atualizarRegistro, removerRegistro, importarPacote,
    ],
  );

  return <DadosContext.Provider value={value}>{children}</DadosContext.Provider>;
}

export function useDados() {
  const ctx = useContext(DadosContext);
  if (!ctx) throw new Error("useDados deve ser usado dentro de DadosProvider");
  return ctx;
}
