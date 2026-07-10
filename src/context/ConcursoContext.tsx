import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  concursoService,
  criarConcursoPadrao,
  criarEstadoInicial,
  createId,
  nowIso,
} from "../services/concurso.service";
import type {
  AppConcursoState,
  Concurso,
  ConcursoContextValue,
  ConcursoDraft,
  Conteudo,
  CronogramaItem,
  Disciplina,
  NovaDisciplina,
  NovoConteudo,
  NovoCronogramaItem,
  NovoRegistroEstudo,
} from "../types/concurso";

export const ConcursoContext = createContext<ConcursoContextValue | null>(null);

interface ConcursoProviderProps {
  children: ReactNode;
}

const criarConteudo = (dados: NovoConteudo): Conteudo => {
  const data = nowIso();

  return {
    id: createId("conteudo"),
    titulo: dados.titulo.trim(),
    observacao: dados.observacao?.trim() || "",
    status: dados.status,
    filhos: [],
    criadoEm: data,
    atualizadoEm: data,
  };
};

const adicionarConteudoNaArvore = (
  conteudos: Conteudo[],
  novoConteudo: Conteudo,
  parentId?: string,
): Conteudo[] => {
  if (!parentId) {
    return [...conteudos, novoConteudo];
  }

  return conteudos.map((conteudo) => {
    if (conteudo.id === parentId) {
      return {
        ...conteudo,
        filhos: [...conteudo.filhos, novoConteudo],
        atualizadoEm: nowIso(),
      };
    }

    return {
      ...conteudo,
      filhos: adicionarConteudoNaArvore(conteudo.filhos, novoConteudo, parentId),
    };
  });
};

const atualizarConteudoNaArvore = (
  conteudos: Conteudo[],
  conteudoId: string,
  dados: Partial<Omit<Conteudo, "id" | "filhos" | "criadoEm">>,
): Conteudo[] =>
  conteudos.map((conteudo) => {
    if (conteudo.id === conteudoId) {
      return {
        ...conteudo,
        ...dados,
        titulo: dados.titulo?.trim() || conteudo.titulo,
        observacao: dados.observacao?.trim() ?? conteudo.observacao,
        atualizadoEm: nowIso(),
      };
    }

    return {
      ...conteudo,
      filhos: atualizarConteudoNaArvore(conteudo.filhos, conteudoId, dados),
    };
  });

const removerConteudoDaArvore = (
  conteudos: Conteudo[],
  conteudoId: string,
): Conteudo[] =>
  conteudos
    .filter((conteudo) => conteudo.id !== conteudoId)
    .map((conteudo) => ({
      ...conteudo,
      filhos: removerConteudoDaArvore(conteudo.filhos, conteudoId),
    }));

const encontrarConcursoAtivo = (estado: AppConcursoState): Concurso => {
  return (
    estado.concursos.find((concurso) => concurso.id === estado.concursoIdAtivo) ??
    estado.concursos[0] ??
    criarConcursoPadrao()
  );
};

const atualizarConcursoAtivo = (
  estado: AppConcursoState,
  updater: (concurso: Concurso) => Concurso,
): AppConcursoState => {
  const ativo = encontrarConcursoAtivo(estado);

  return {
    ...estado,
    concursos: estado.concursos.map((concurso) =>
      concurso.id === ativo.id ? updater(concurso) : concurso,
    ),
    concursoIdAtivo: ativo.id,
  };
};

const dataLocalIso = () => {
  const hoje = new Date();
  const ano = hoje.getFullYear();
  const mes = String(hoje.getMonth() + 1).padStart(2, "0");
  const dia = String(hoje.getDate()).padStart(2, "0");

  return `${ano}-${mes}-${dia}`;
};

export function ConcursoProvider({ children }: ConcursoProviderProps) {
  const [estado, setEstado] = useState<AppConcursoState>(() =>
    concursoService.carregar(),
  );

  useEffect(() => {
    concursoService.salvar(estado);
  }, [estado]);

  const concurso = encontrarConcursoAtivo(estado);

  const criarConcurso = useCallback((dados: Partial<ConcursoDraft> = {}) => {
    const novoConcurso = criarConcursoPadrao(dados);

    setEstado((atual) => ({
      ...atual,
      concursos: [...atual.concursos, novoConcurso],
      concursoIdAtivo: novoConcurso.id,
    }));

    return novoConcurso.id;
  }, []);

  const selecionarConcurso = useCallback((concursoId: string) => {
    setEstado((atual) => {
      if (!atual.concursos.some((item) => item.id === concursoId)) {
        return atual;
      }

      return {
        ...atual,
        concursoIdAtivo: concursoId,
      };
    });
  }, []);

  const removeConcurso = useCallback((concursoId: string) => {
    setEstado((atual) => {
      if (atual.concursos.length <= 1) {
        const inicial = criarEstadoInicial();
        return inicial;
      }

      const concursos = atual.concursos.filter(
        (concursoItem) => concursoItem.id !== concursoId,
      );

      return {
        ...atual,
        concursos,
        concursoIdAtivo:
          atual.concursoIdAtivo === concursoId
            ? concursos[0].id
            : atual.concursoIdAtivo,
        cronograma: atual.cronograma.filter(
          (item) => item.concursoId !== concursoId,
        ),
        registrosEstudo: atual.registrosEstudo.filter(
          (registro) => registro.concursoId !== concursoId,
        ),
      };
    });
  }, []);

  const updateConcurso = useCallback((dados: Partial<ConcursoDraft>) => {
    setEstado((atual) =>
      atualizarConcursoAtivo(atual, (concursoAtual) => ({
        ...concursoAtual,
        ...dados,
        titulo: dados.titulo?.trim() || concursoAtual.titulo,
        orgao: dados.orgao?.trim() ?? concursoAtual.orgao,
        banca: dados.banca?.trim() ?? concursoAtual.banca,
        cargo: dados.cargo?.trim() ?? concursoAtual.cargo,
        atualizadoEm: nowIso(),
      })),
    );
  }, []);

  const addDisciplina = useCallback((dados: NovaDisciplina) => {
    if (!dados.nome.trim()) {
      return null;
    }

    const data = nowIso();
    const disciplina: Disciplina = {
      id: createId("disciplina"),
      nome: dados.nome.trim(),
      cor: dados.cor,
      peso: Math.max(0, dados.peso),
      conteudos: [],
      criadoEm: data,
      atualizadoEm: data,
    };

    setEstado((atual) =>
      atualizarConcursoAtivo(atual, (concursoAtual) => ({
        ...concursoAtual,
        disciplinas: [...concursoAtual.disciplinas, disciplina],
        atualizadoEm: data,
      })),
    );

    return disciplina;
  }, []);

  const updateDisciplina = useCallback(
    (
      disciplinaId: string,
      dados: Partial<Omit<Disciplina, "id" | "conteudos" | "criadoEm">>,
    ) => {
      setEstado((atual) =>
        atualizarConcursoAtivo(atual, (concursoAtual) => ({
          ...concursoAtual,
          disciplinas: concursoAtual.disciplinas.map((disciplina) =>
            disciplina.id === disciplinaId
              ? {
                  ...disciplina,
                  ...dados,
                  nome: dados.nome?.trim() || disciplina.nome,
                  peso:
                    typeof dados.peso === "number"
                      ? Math.max(0, dados.peso)
                      : disciplina.peso,
                  atualizadoEm: nowIso(),
                }
              : disciplina,
          ),
          atualizadoEm: nowIso(),
        })),
      );
    },
    [],
  );

  const removeDisciplina = useCallback((disciplinaId: string) => {
    setEstado((atual) =>
      atualizarConcursoAtivo(
        {
          ...atual,
          cronograma: atual.cronograma.filter(
            (item) => item.disciplinaId !== disciplinaId,
          ),
          registrosEstudo: atual.registrosEstudo.map((registro) =>
            registro.disciplinaId === disciplinaId
              ? {
                  ...registro,
                  disciplinaId: undefined,
                  conteudoId: undefined,
                }
              : registro,
          ),
        },
        (concursoAtual) => ({
          ...concursoAtual,
          disciplinas: concursoAtual.disciplinas.filter(
            (disciplina) => disciplina.id !== disciplinaId,
          ),
          atualizadoEm: nowIso(),
        }),
      ),
    );
  }, []);

  const addConteudo = useCallback(
    (disciplinaId: string, dados: NovoConteudo, parentId?: string) => {
      if (!dados.titulo.trim()) {
        return;
      }

      const novoConteudo = criarConteudo(dados);
      setEstado((atual) =>
        atualizarConcursoAtivo(atual, (concursoAtual) => ({
          ...concursoAtual,
          disciplinas: concursoAtual.disciplinas.map((disciplina) =>
            disciplina.id === disciplinaId
              ? {
                  ...disciplina,
                  conteudos: adicionarConteudoNaArvore(
                    disciplina.conteudos,
                    novoConteudo,
                    parentId,
                  ),
                  atualizadoEm: nowIso(),
                }
              : disciplina,
          ),
          atualizadoEm: nowIso(),
        })),
      );
    },
    [],
  );

  const updateConteudo = useCallback(
    (
      disciplinaId: string,
      conteudoId: string,
      dados: Partial<Omit<Conteudo, "id" | "filhos" | "criadoEm">>,
    ) => {
      setEstado((atual) =>
        atualizarConcursoAtivo(atual, (concursoAtual) => ({
          ...concursoAtual,
          disciplinas: concursoAtual.disciplinas.map((disciplina) =>
            disciplina.id === disciplinaId
              ? {
                  ...disciplina,
                  conteudos: atualizarConteudoNaArvore(
                    disciplina.conteudos,
                    conteudoId,
                    dados,
                  ),
                  atualizadoEm: nowIso(),
                }
              : disciplina,
          ),
          atualizadoEm: nowIso(),
        })),
      );
    },
    [],
  );

  const removeConteudo = useCallback(
    (disciplinaId: string, conteudoId: string) => {
      setEstado((atual) =>
        atualizarConcursoAtivo(
          {
            ...atual,
            cronograma: atual.cronograma.filter(
              (item) => item.conteudoId !== conteudoId,
            ),
            registrosEstudo: atual.registrosEstudo.map((registro) =>
              registro.conteudoId === conteudoId
                ? {
                    ...registro,
                    conteudoId: undefined,
                  }
                : registro,
            ),
          },
          (concursoAtual) => ({
            ...concursoAtual,
            disciplinas: concursoAtual.disciplinas.map((disciplina) =>
              disciplina.id === disciplinaId
                ? {
                    ...disciplina,
                    conteudos: removerConteudoDaArvore(
                      disciplina.conteudos,
                      conteudoId,
                    ),
                    atualizadoEm: nowIso(),
                  }
                : disciplina,
            ),
            atualizadoEm: nowIso(),
          }),
        ),
      );
    },
    [],
  );

  const updatePeso = useCallback(
    (disciplinaId: string, peso: number) => {
      updateDisciplina(disciplinaId, { peso });
    },
    [updateDisciplina],
  );

  const addCronogramaItem = useCallback(
    (dados: NovoCronogramaItem) => {
      if (!dados.titulo.trim()) {
        return;
      }

      const data = nowIso();
      const item: CronogramaItem = {
        id: createId("cronograma"),
        concursoId: concurso.id,
        dia: dados.dia,
        horario: dados.horario,
        duracaoMinutos: Math.max(5, dados.duracaoMinutos),
        disciplinaId: dados.disciplinaId || undefined,
        conteudoId: dados.conteudoId || undefined,
        titulo: dados.titulo.trim(),
        concluido: false,
        criadoEm: data,
        atualizadoEm: data,
      };

      setEstado((atual) => ({
        ...atual,
        cronograma: [...atual.cronograma, item],
      }));
    },
    [concurso.id],
  );

  const updateCronogramaItem = useCallback(
    (
      itemId: string,
      dados: Partial<Omit<CronogramaItem, "id" | "concursoId" | "criadoEm">>,
    ) => {
      setEstado((atual) => ({
        ...atual,
        cronograma: atual.cronograma.map((item) =>
          item.id === itemId
            ? {
                ...item,
                ...dados,
                titulo: dados.titulo?.trim() || item.titulo,
                atualizadoEm: nowIso(),
              }
            : item,
        ),
      }));
    },
    [],
  );

  const removeCronogramaItem = useCallback((itemId: string) => {
    setEstado((atual) => ({
      ...atual,
      cronograma: atual.cronograma.filter((item) => item.id !== itemId),
    }));
  }, []);

  const registrarEstudo = useCallback(
    (dados: NovoRegistroEstudo) => {
      const minutos = Math.max(1, Math.round(dados.minutos));
      const registro = {
        id: createId("estudo"),
        concursoId: concurso.id,
        disciplinaId: dados.disciplinaId || undefined,
        conteudoId: dados.conteudoId || undefined,
        data: dados.data || dataLocalIso(),
        minutos,
        anotacao: dados.anotacao?.trim() || "",
        criadoEm: nowIso(),
      };

      setEstado((atual) => ({
        ...atual,
        registrosEstudo: [...atual.registrosEstudo, registro],
      }));
    },
    [concurso.id],
  );

  const resetConcurso = useCallback(() => {
    setEstado((atual) => {
      const data = nowIso();
      const novoConcurso = {
        ...criarConcursoPadrao(),
        id: createId("concurso"),
        criadoEm: data,
        atualizadoEm: data,
      };

      return {
        ...atual,
        concursos: atual.concursos.map((item) =>
          item.id === atual.concursoIdAtivo ? novoConcurso : item,
        ),
        concursoIdAtivo: novoConcurso.id,
        cronograma: atual.cronograma.filter(
          (item) => item.concursoId !== atual.concursoIdAtivo,
        ),
        registrosEstudo: atual.registrosEstudo.filter(
          (registro) => registro.concursoId !== atual.concursoIdAtivo,
        ),
      };
    });
  }, []);

  const cronograma = useMemo(
    () => estado.cronograma.filter((item) => item.concursoId === concurso.id),
    [estado.cronograma, concurso.id],
  );

  const registrosEstudo = useMemo(
    () =>
      estado.registrosEstudo.filter(
        (registro) => registro.concursoId === concurso.id,
      ),
    [estado.registrosEstudo, concurso.id],
  );

  const value = useMemo<ConcursoContextValue>(
    () => ({
      concursos: estado.concursos,
      concurso,
      concursoIdAtivo: estado.concursoIdAtivo,
      cronograma,
      registrosEstudo,
      criarConcurso,
      selecionarConcurso,
      removeConcurso,
      updateConcurso,
      addDisciplina,
      updateDisciplina,
      removeDisciplina,
      addConteudo,
      updateConteudo,
      removeConteudo,
      updatePeso,
      addCronogramaItem,
      updateCronogramaItem,
      removeCronogramaItem,
      registrarEstudo,
      resetConcurso,
    }),
    [
      estado.concursos,
      estado.concursoIdAtivo,
      concurso,
      cronograma,
      registrosEstudo,
      criarConcurso,
      selecionarConcurso,
      removeConcurso,
      updateConcurso,
      addDisciplina,
      updateDisciplina,
      removeDisciplina,
      addConteudo,
      updateConteudo,
      removeConteudo,
      updatePeso,
      addCronogramaItem,
      updateCronogramaItem,
      removeCronogramaItem,
      registrarEstudo,
      resetConcurso,
    ],
  );

  return (
    <ConcursoContext.Provider value={value}>
      {children}
    </ConcursoContext.Provider>
  );
}
