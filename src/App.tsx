import { useState } from "react";
import { Header, type AppPage } from "./components/Header";
import { ConcursoProvider } from "./context/ConcursoContext";
import { CadastroConcurso } from "./Pages/Concurso/CadastroConcurso";
import { CronogramaEstudo } from "./Pages/Concurso/CronogramaEstudo";
import { Edital } from "./Pages/Concurso/Edital";
import { Estudos } from "./Pages/Concurso/Estudos";
import { Habitos } from "./Pages/Concurso/Habitos";
import { PesoDisciplinas } from "./Pages/Concurso/PesoDisciplinas";
import { Dashboard } from "./Pages/Dashboard/Dashboard";

function AppContent() {
  const [activePage, setActivePage] = useState<AppPage>("dashboard");

  const renderPage = () => {
    switch (activePage) {
      case "cadastro":
        return <CadastroConcurso />;
      case "edital":
        return <Edital />;
      case "pesos":
        return <PesoDisciplinas />;
      case "cronograma":
        return <CronogramaEstudo />;
      case "habitos":
        return <Habitos />;
      case "estudos":
        return <Estudos />;
      case "dashboard":
      default:
        return <Dashboard onNavigate={setActivePage} />;
    }
  };

  return (
    <div className="appShell">
      <Header activePage={activePage} onNavigate={setActivePage} />
      {renderPage()}
    </div>
  );
}

export default function App() {
  return (
    <ConcursoProvider>
      <AppContent />
    </ConcursoProvider>
  );
}
