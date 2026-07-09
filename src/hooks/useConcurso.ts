import { useContext } from "react";
import { ConcursoContext } from "../context/ConcursoContext";

export function useConcurso() {
  const context = useContext(ConcursoContext);

  if (!context) {
    throw new Error("useConcurso deve ser usado dentro de ConcursoProvider");
  }

  return context;
}
