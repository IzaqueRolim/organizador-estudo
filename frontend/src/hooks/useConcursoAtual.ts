import { useOutletContext } from "react-router-dom";
import type { Concurso, CronogramaItem, RegistroEstudo } from "../types";

export interface ContextoConcurso {
  concurso: Concurso;
  cronograma: CronogramaItem[];
  registros: RegistroEstudo[];
}

export const useConcursoAtual = () => useOutletContext<ContextoConcurso>();
