import { useState, type FormEvent } from "react";
import { useAuth } from "../context/AuthContext";
import { Logo } from "../components/Icones";

export function Login() {
  const { entrar, criarConta } = useAuth();
  const [modo, setModo] = useState<"entrar" | "criar">("entrar");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [enviando, setEnviando] = useState(false);

  const enviar = async (e: FormEvent) => {
    e.preventDefault();
    setErro("");
    setEnviando(true);
    try {
      if (modo === "entrar") {
        await entrar(email.trim(), senha);
      } else {
        await criarConta(email.trim(), senha);
      }
    } catch (err) {
      setErro(err instanceof Error ? err.message : "Não foi possível continuar.");
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div className="tela-cheia">
      <div className="painel cartao-login">
        <div className="marca"><Logo /> Caderno de Concursos</div>
        <div>
          <h1>{modo === "entrar" ? "Entrar" : "Criar conta"}</h1>
          <p className="suave" style={{ marginTop: 6 }}>
            Seus concursos, edital e horas de estudo ficam salvos na sua conta.{modo === "criar" && " Use uma senha com pelo menos 8 caracteres."}
          </p>
        </div>
        <form onSubmit={enviar}>
          <label className="campo">
            E-mail
            <input type="email" required autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>
          <label className="campo">
            Senha
            <input
              type="password"
              required
              minLength={8}
              autoComplete={modo === "entrar" ? "current-password" : "new-password"}
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
          </label>
          {erro && <div className="erro-form" role="alert">{erro}</div>}
          <button className="btn principal" type="submit" disabled={enviando}>
            {enviando ? "Aguarde…" : modo === "entrar" ? "Entrar" : "Criar conta"}
          </button>
        </form>
        <div className="acoes">
          <button className="btn fantasma pequeno" type="button" onClick={() => { setModo(modo === "entrar" ? "criar" : "entrar"); setErro(""); }}>
            {modo === "entrar" ? "Ainda não tenho conta" : "Já tenho conta"}
          </button>
        </div>
      </div>
    </div>
  );
}
