import styled from "styled-components";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Page = styled.div`
  min-height: 100vh;
  background: #0f172a;
  padding: 32px;
  color: #e2e8f0;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Title = styled.h1`
  text-align: center;
  font-size: 32px;
  font-weight: 800;
  margin-bottom: 32px;
`;

const Grid4 = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-bottom: 24px;
`;

const Grid2 = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin-bottom: 24px;
`;

const CardBox = styled.div`
  background: #1e293b;
  padding: 16px;
  border-radius: 14px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.25);
  transition: 0.2s;

  &:hover {
    transform: translateY(-3px);
  }
`;

const CardTitle = styled.p`
  color: #94a3b8;
  font-size: 14px;
`;

const CardValue = styled.h2`
  font-size: 28px;
  font-weight: 800;
  margin-top: 4px;
`;

const Section = styled.div`
  background: #1e293b;
  border-radius: 14px;
  padding: 20px;
  margin-bottom: 24px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.25);
`;

const SectionTitle = styled.h2`
  font-size: 20px;
  margin-bottom: 16px;
  font-weight: 700;
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const ListItem = styled.li`
  padding: 10px 0;
  border-bottom: 1px solid #334155;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  th {
    text-align: left;
    padding: 8px;
    color: #94a3b8;
    border-bottom: 1px solid #334155;
  }

  td {
    padding: 10px 8px;
    border-bottom: 1px solid #334155;
  }
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 10px;
  background: #334155;
  border-radius: 8px;
  overflow: hidden;
`;

const ProgressFill = styled.div<{ width: number }>`
  height: 100%;
  width: ${(p) => p.width}%;
  background: linear-gradient(90deg, #22c55e, #16a34a);
`;

const editalData = {
  diasRestantes: 120,
  progressoEdital: 42,
  disciplinaSelecionada: "Português",
  assuntosMaisCobrados: [
    "Regência Verbal",
    "Colocação Pronominal",
    "Preposições",
    "Crase",
    "Concordância",
  ],
  materias: [
    { nome: "TI", peso: 95, prioridade: 5, horasEstimadas: 60, estudado: 30 },
    { nome: "Português", peso: 85, prioridade: 5, horasEstimadas: 45, estudado: 20 },
    { nome: "Conhecimentos Bancários", peso: 80, prioridade: 4, horasEstimadas: 40, estudado: 10 },
    { nome: "Matemática", peso: 65, prioridade: 3, horasEstimadas: 35, estudado: 15 },
    { nome: "Inglês", peso: 50, prioridade: 2, horasEstimadas: 20, estudado: 5 },
  ],
  cronograma: [
    { dia: "Segunda", materia: "Português", horas: 2 },
    { dia: "Terça", materia: "TI", horas: 3 },
    { dia: "Quarta", materia: "Matemática", horas: 2 },
  ],
  metasDiarias: [
    "Resolver 40 questões",
    "Assistir 2 aulas",
    "Revisar conteúdo de ontem",
  ],
};

function estrelas(qtd: number) {
  return "⭐".repeat(qtd);
}

export default function ConcursoInfo() {
  return (
    <Page>
      <Container>

        <Title>Análise do Edital</Title>

        {/* CARDS */}
        <Grid4>
          <Card titulo="Dias Restantes" valor={`${editalData.diasRestantes}`} />
          <Card titulo="Progresso" valor={`${editalData.progressoEdital}%`} />
          <Card titulo="Disciplinas" valor={`${editalData.materias.length}`} />
          <Card
            titulo="Horas Totais"
            valor={`${editalData.materias.reduce(
              (acc, item) => acc + item.horasEstimadas,
              0
            )}`}
          />
        </Grid4>

        {/* GRAFICO */}
        <Section>
          <SectionTitle>Peso das Disciplinas</SectionTitle>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={editalData.materias}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="nome" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="peso" fill="#60a5fa" />
            </BarChart>
          </ResponsiveContainer>
        </Section>

        {/* GRID */}
        <Grid2>

          <Section>
            <SectionTitle>Assuntos Mais Cobrados</SectionTitle>
            <List>
              {editalData.assuntosMaisCobrados.map((a) => (
                <ListItem key={a}>{a}</ListItem>
              ))}
            </List>
          </Section>

          <Section>
            <SectionTitle>Ranking de Prioridade</SectionTitle>
            <Table>
              <thead>
                <tr>
                  <th>Matéria</th>
                  <th>Prioridade</th>
                </tr>
              </thead>
              <tbody>
                {editalData.materias.map((m) => (
                  <tr key={m.nome}>
                    <td>{m.nome}</td>
                    <td>{estrelas(m.prioridade)}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Section>

        </Grid2>

        {/* PROGRESSO */}
        <Section>
          <SectionTitle>Mapa das Disciplinas</SectionTitle>

          {editalData.materias.map((m) => {
            const percent = (m.estudado / m.horasEstimadas) * 100;

            return (
              <div key={m.nome} style={{ marginBottom: 16 }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span>{m.nome}</span>
                  <span>{m.estudado}h / {m.horasEstimadas}h</span>
                </div>

                <ProgressBar>
                  <ProgressFill width={percent} />
                </ProgressBar>
              </div>
            );
          })}
        </Section>

        {/* FINAL */}
        <Grid2>

          <Section>
            <SectionTitle>Cronograma</SectionTitle>
            <Table>
              <thead>
                <tr>
                  <th>Dia</th>
                  <th>Disciplina</th>
                  <th>Horas</th>
                </tr>
              </thead>
              <tbody>
                {editalData.cronograma.map((c) => (
                  <tr key={c.dia}>
                    <td>{c.dia}</td>
                    <td>{c.materia}</td>
                    <td>{c.horas}h</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Section>

          <Section>
            <SectionTitle>Objetivos Diários</SectionTitle>
            <List>
              {editalData.metasDiarias.map((m) => (
                <ListItem key={m}>✅ {m}</ListItem>
              ))}
            </List>
          </Section>

        </Grid2>

      </Container>
    </Page>
  );
}

/* CARD */
function Card({ titulo, valor }: { titulo: string; valor: string }) {
  return (
    <CardBox>
      <CardTitle>{titulo}</CardTitle>
      <CardValue>{valor}</CardValue>
    </CardBox>
  );
}