import type { ReactNode } from "react";

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

const icone = (conteudo: ReactNode) =>
  function Icone() {
    return <svg {...base}>{conteudo}</svg>;
  };

export const IcoInicio = icone(<><path d="M3 11l9-8 9 8" /><path d="M5 10v10h14V10" /></>);
export const IcoLista = icone(<><path d="M8 6h13M8 12h13M8 18h13" /><path d="M3 6h.01M3 12h.01M3 18h.01" /></>);
export const IcoPeso = icone(<><path d="M4 20V10M10 20V4M16 20v-7M22 20H2" /></>);
export const IcoCalendario = icone(<><rect x="3" y="4" width="18" height="17" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></>);
export const IcoRelogio = icone(<><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>);
export const IcoGrafico = icone(<><path d="M3 3v18h18" /><path d="M7 15l4-5 3 3 5-7" /></>);
export const IcoConfig = icone(<><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z" /></>);
export const IcoSeta = icone(<path d="M9 6l6 6-6 6" />);
export const IcoCheck = icone(<path d="M5 12l5 5 9-10" />);
export const IcoMais = icone(<path d="M12 5v14M5 12h14" />);
export const IcoLapis = icone(<><path d="M12 20h9" /><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z" /></>);
export const IcoLixeira = icone(<><path d="M3 6h18M8 6V4h8v2M6 6l1 14h10l1-14" /></>);
export const IcoMenu = icone(<path d="M3 6h18M3 12h18M3 18h18" />);
export const IcoFechar = icone(<path d="M6 6l12 12M18 6L6 18" />);
export const IcoVoltar = icone(<path d="M15 6l-6 6 6 6" />);

export function Logo() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <rect width="64" height="64" rx="14" fill="#ffe45c" />
      <rect x="14" y="20" width="36" height="9" rx="2" fill="#14213d" />
      <rect x="14" y="35" width="24" height="5" rx="2" fill="#14213d" opacity=".8" />
      <rect x="14" y="44" width="30" height="5" rx="2" fill="#14213d" opacity=".5" />
    </svg>
  );
}
