import { Outlet, useOutletContext } from "react-router-dom";
import type { ContextoConcurso } from "../hooks/useConcursoAtual";

/** Repassa o contexto do concurso aberto (montado no Layout) para as telas filhas. */
export function ConcursoRota() {
  const contexto = useOutletContext<ContextoConcurso | null>();
  if (!contexto) return null;
  return <Outlet context={contexto} />;
}
