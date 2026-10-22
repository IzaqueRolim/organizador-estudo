export function Configuracao() {
  return (
    <div className="tela-cheia">
      <div className="painel cartao-login" style={{ width: "min(640px, 100%)" }}>
        <h1>Falta apontar para a API</h1>
        <p className="suave">
          O aplicativo precisa saber o endereço do backend. Crie o arquivo <code>frontend/.env</code> (veja{" "}
          <code>.env.example</code>) com:
        </p>
        <pre className="codigo">{`VITE_API_URL=http://localhost:3000`}</pre>
        <p className="suave">
          Depois reinicie o <code>npm run dev</code>. No Render, cadastre <code>VITE_API_URL</code> com a URL pública da
          API em Environment do site estático e faça um novo deploy.
        </p>
      </div>
    </div>
  );
}
