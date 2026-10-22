const pad = (n: number) => String(n).padStart(2, "0");

export const paraIso = (d: Date) =>
  `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

export const deIso = (iso: string) => {
  const [a, m, d] = iso.split("-").map(Number);
  return new Date(a, m - 1, d);
};

export const hojeIso = () => paraIso(new Date());

export const somarDias = (iso: string, dias: number) => {
  const d = deIso(iso);
  d.setDate(d.getDate() + dias);
  return paraIso(d);
};

/** Segunda-feira da semana que contém a data. */
export const inicioDaSemana = (iso: string) => {
  const d = deIso(iso);
  const dia = (d.getDay() + 6) % 7; // segunda = 0
  d.setDate(d.getDate() - dia);
  return paraIso(d);
};

export const diasDaSemana = (iso: string) => {
  const inicio = inicioDaSemana(iso);
  return Array.from({ length: 7 }, (_, i) => somarDias(inicio, i));
};

export const inicioDoMes = (iso: string) => `${iso.slice(0, 7)}-01`;

/** Grade do mês (semanas completas, começando na segunda). */
export const diasDoMes = (iso: string) => {
  const primeiro = inicioDoMes(iso);
  const d = deIso(primeiro);
  const ultimo = paraIso(new Date(d.getFullYear(), d.getMonth() + 1, 0));
  const inicio = inicioDaSemana(primeiro);
  const fim = somarDias(inicioDaSemana(ultimo), 6);
  const dias: string[] = [];
  for (let atual = inicio; atual <= fim; atual = somarDias(atual, 1)) dias.push(atual);
  return dias;
};

export const somarMeses = (iso: string, meses: number) => {
  const d = deIso(inicioDoMes(iso));
  d.setMonth(d.getMonth() + meses);
  return paraIso(d);
};

export const diferencaEmDias = (de: string, ate: string) =>
  Math.round((deIso(ate).getTime() - deIso(de).getTime()) / 86_400_000);

export const diasAteProva = (dataProva: string) =>
  dataProva ? diferencaEmDias(hojeIso(), dataProva) : null;

export const formatarData = (iso: string, opcoes?: Intl.DateTimeFormatOptions) =>
  iso
    ? deIso(iso).toLocaleDateString("pt-BR", opcoes ?? { day: "2-digit", month: "2-digit", year: "numeric" })
    : "—";

export const diaSemanaCurto = (iso: string) =>
  deIso(iso).toLocaleDateString("pt-BR", { weekday: "short" }).replace(".", "");

export const diaSemanaLongo = (iso: string) =>
  deIso(iso).toLocaleDateString("pt-BR", { weekday: "long" });

export const mesAno = (iso: string) =>
  deIso(iso).toLocaleDateString("pt-BR", { month: "long", year: "numeric" });

export const formatarMinutos = (minutos: number) => {
  const m = Math.max(0, Math.round(minutos));
  const h = Math.floor(m / 60);
  const r = m % 60;
  if (h === 0) return `${r} min`;
  if (r === 0) return `${h} h`;
  return `${h} h ${pad(r)} min`;
};

export const formatarHoras = (horas: number) =>
  `${horas.toLocaleString("pt-BR", { maximumFractionDigits: 1 })} h`;

export const formatarCronometro = (segundos: number) => {
  const h = Math.floor(segundos / 3600);
  const m = Math.floor((segundos % 3600) / 60);
  const s = segundos % 60;
  return `${pad(h)}:${pad(m)}:${pad(s)}`;
};

export const formatarMoeda = (valor: number) =>
  valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
