export type AppPage =
  | "dashboard"
  | "cadastro"
  | "edital"
  | "pesos"
  | "cronograma"
  | "habitos"
  | "estudos";

interface HeaderProps {
  activePage: AppPage;
  onNavigate: (page: AppPage) => void;
}

const pages: Array<{ key: AppPage; label: string }> = [
  { key: "dashboard", label: "Concursos" },
  { key: "cadastro", label: "Cadastro" },
  { key: "edital", label: "Edital" },
  { key: "pesos", label: "Pesos" },
  { key: "cronograma", label: "Cronograma" },
  { key: "habitos", label: "Habitos" },
  { key: "estudos", label: "Estudos" },
];

export function Header({ activePage, onNavigate }: HeaderProps) {
  return (
    <header className="appHeader">
      <div>
        <strong>Gestao de Concursos</strong>
        <span>Planejamento por edital, habitos e estudo.</span>
      </div>

      <nav aria-label="Navegacao principal">
        {pages.map((page) => (
          <button
            key={page.key}
            type="button"
            className={activePage === page.key ? "active" : ""}
            onClick={() => onNavigate(page.key)}
          >
            {page.label}
          </button>
        ))}
      </nav>
    </header>
  );
}
