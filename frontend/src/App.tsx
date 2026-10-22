import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { AvisoProvider } from "./context/AvisoContext";
import { DadosProvider } from "./context/DadosContext";
import { Layout } from "./components/Layout";
import { apiConfigurada } from "./lib/api";
import { useTema } from "./hooks/useTema";
import { Login } from "./pages/Login";
import { Configuracao } from "./pages/Configuracao";
import { Concursos } from "./pages/Concursos";
import { ConcursoRota } from "./pages/ConcursoRota";
import { VisaoGeral } from "./pages/VisaoGeral";
import { Edital } from "./pages/Edital";
import { Pesos } from "./pages/Pesos";
import { Planejamento } from "./pages/Planejamento";
import { Estudar } from "./pages/Estudar";
import { Historico } from "./pages/Historico";
import { DadosConcurso } from "./pages/DadosConcurso";
import { Backup } from "./pages/Backup";
 
function Protegido({ children }: { children: React.ReactNode }) {
  const { user, carregando } = useAuth();
  const local = useLocation();
  if (carregando) return <div className="tela-cheia"><div className="spinner" /></div>;
  if (!user) return <Navigate to="/login" state={{ de: local.pathname }} replace />;
  return <>{children}</>;
}

function Rotas() {
  useTema(); // aplica o tema salvo (ou o do sistema) já na tela de login
  const { user } = useAuth();
  

  return (
    <Routes>
      <Route path="/login" element={user ? <Navigate to="/" replace /> : <Login />} />
      <Route
        element={
          <Protegido>
            <DadosProvider>
              <Layout />
            </DadosProvider>
          </Protegido>
        }
      >
        <Route index element={<Concursos />} />
        <Route path="configuracoes" element={<Backup />} />
        <Route path="c/:concursoId" element={<ConcursoRota />}>
          <Route index element={<VisaoGeral />} />
          <Route path="estudar" element={<Estudar />} />
          <Route path="planejamento" element={<Planejamento />} />
          <Route path="pesos" element={<Pesos />} />
          <Route path="edital" element={<Edital />} />
          <Route path="historico" element={<Historico />} />
          <Route path="dados" element={<DadosConcurso />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

export default function App() {
  if (!apiConfigurada) return <Configuracao />;
  return (
    <AvisoProvider>
      <AuthProvider>
        <Rotas />
      </AuthProvider>
    </AvisoProvider>
  );
}
