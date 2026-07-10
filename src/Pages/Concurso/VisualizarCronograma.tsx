import styled from "styled-components";
import { useConcurso } from "../../hooks/useConcurso";
import type { DiaSemana } from "../../types/concurso";
import {
  encontrarConteudo,
  encontrarDisciplina,
  formatarMinutos,
} from "../../utils/concursoStats";

const diasSemana: Array<{ key: DiaSemana; label: string }> = [
  { key: "segunda", label: "Segunda" },
  { key: "terca", label: "Terça" },
  { key: "quarta", label: "Quarta" },
  { key: "quinta", label: "Quinta" },
  { key: "sexta", label: "Sexta" },
  { key: "sabado", label: "Sábado" },
  { key: "domingo", label: "Domingo" },
];

const PageContainer = styled.main`
  min-height: 100vh;
  background: #0f172a;
  padding: 32px;
  color: #e2e8f0;
`;

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
`;

const PageTitle = styled.section`
  margin-bottom: 40px;

  > div {
    margin-bottom: 24px;
  }

  span {
    color: #94a3b8;
    font-size: 12px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  h1 {
    font-size: 32px;
    font-weight: 800;
    margin: 12px 0 8px 0;
  }

  p {
    color: #cbd5e1;
    font-size: 15px;
  }
`;

const WeekGridContainer = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 16px;
  margin-bottom: 40px;
`;

const DayColumn = styled.article`
  background: #1e293b;
  border-radius: 12px;
  border: 1px solid #334155;
  overflow: hidden;
  transition: all 0.2s;

  &:hover {
    border-color: #475569;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25);
  }
`;

const DayHeader = styled.div`
  background: linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%);
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid #0f172a;

  strong {
    font-size: 16px;
    font-weight: 700;
  }

  span {
    background: rgba(255, 255, 255, 0.2);
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 600;
  }
`;

const ScheduleList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
`;

const ScheduleItem = styled.div<{ $done?: boolean }>`
  padding: 12px 16px;
  border-bottom: 1px solid #334155;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
  opacity: ${(props) => (props.$done ? 0.6 : 1)};
  background: ${(props) => (props.$done ? "rgba(34, 197, 94, 0.1)" : "transparent")};

  &:last-child {
    border-bottom: none;
  }

  > div:first-child {
    flex: 1;

    span {
      color: #64748b;
      font-size: 12px;
      font-weight: 600;
      display: block;
      margin-bottom: 4px;
    }

    strong {
      display: block;
      font-size: 14px;
      font-weight: 700;
      margin-bottom: 4px;
      text-decoration: ${(props) => (props.$done ? "line-through" : "none")};
    }

    small {
      color: #94a3b8;
      font-size: 12px;
      display: block;
    }
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 8px;
  flex-shrink: 0;
`;

const IconButton = styled.button`
  padding: 6px 10px;
  background: #334155;
  border: none;
  border-radius: 6px;
  color: #e2e8f0;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #475569;
  }

  &.danger {
    color: #fca5a5;

    &:hover {
      background: #7f1d1d;
    }
  }
`;

const EmptyState = styled.div`
  padding: 32px 16px;
  text-align: center;
  color: #64748b;
  font-size: 14px;
`;

const SummarySection = styled.section`
  background: #1e293b;
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 40px;
  border: 1px solid #334155;

  h2 {
    font-size: 18px;
    font-weight: 700;
    margin-bottom: 16px;
  }

  dl {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 20px;

    > div {
      display: flex;
      flex-direction: column;

      dt {
        color: #94a3b8;
        font-size: 12px;
        font-weight: 600;
        text-transform: uppercase;
        margin-bottom: 8px;
      }

      dd {
        font-size: 24px;
        font-weight: 700;
        margin: 0;
      }
    }
  }
`;

export function VisualizarCronograma() {
  const { concurso, cronograma, updateCronogramaItem, removeCronogramaItem } =
    useConcurso();

  const totalHoras = cronograma.reduce((total, item) => total + item.duracaoMinutos, 0);
  const totalConcluidos = cronograma.filter((item) => item.concluido).length;

  return (
    <PageContainer>
      <Container>
        <PageTitle>
          <div>
            <span>Cronograma</span>
            <h1>Visualizar Cronograma</h1>
            <p>{concurso.titulo}</p>
          </div>
        </PageTitle>

        {cronograma.length > 0 && (
          <SummarySection>
            <h2>Resumo</h2>
            <dl>
              <div>
                <dt>Total de Atividades</dt>
                <dd>{cronograma.length}</dd>
              </div>
              <div>
                <dt>Atividades Concluídas</dt>
                <dd>{totalConcluidos}</dd>
              </div>
              <div>
                <dt>Total de Horas</dt>
                <dd>{(totalHoras / 60).toFixed(1)}h</dd>
              </div>
              <div>
                <dt>Taxa de Conclusão</dt>
                <dd>
                  {cronograma.length === 0
                    ? "0%"
                    : ((totalConcluidos / cronograma.length) * 100).toFixed(0)}
                  %
                </dd>
              </div>
            </dl>
          </SummarySection>
        )}

        <WeekGridContainer>
          {diasSemana.map((dia) => {
            const itens = cronograma
              .filter((item) => item.dia === dia.key)
              .sort((a, b) => a.horario.localeCompare(b.horario));

            return (
              <DayColumn key={dia.key}>
                <DayHeader>
                  <strong>{dia.label}</strong>
                  <span>{itens.length}</span>
                </DayHeader>

                {itens.length === 0 ? (
                  <EmptyState>Livre</EmptyState>
                ) : (
                  <ScheduleList>
                    {itens.map((item) => {
                      const disciplina = encontrarDisciplina(
                        concurso.disciplinas,
                        item.disciplinaId,
                      );
                      const conteudo = encontrarConteudo(
                        concurso.disciplinas,
                        item.conteudoId,
                      );

                      return (
                        <ScheduleItem key={item.id} $done={item.concluido}>
                          <div>
                            <span>
                              {item.horario} / {formatarMinutos(item.duracaoMinutos)}
                            </span>
                            <strong>{item.titulo}</strong>
                            <small>
                              {disciplina?.nome || "Sem disciplina"}
                              {conteudo ? ` / ${conteudo.titulo}` : ""}
                            </small>
                          </div>

                          <ButtonGroup>
                            <IconButton
                              type="button"
                              onClick={() =>
                                updateCronogramaItem(item.id, {
                                  concluido: !item.concluido,
                                })
                              }
                            >
                              {item.concluido ? "Reabrir" : "Feito"}
                            </IconButton>
                            <IconButton
                              type="button"
                              className="danger"
                              onClick={() => removeCronogramaItem(item.id)}
                            >
                              Excluir
                            </IconButton>
                          </ButtonGroup>
                        </ScheduleItem>
                      );
                    })}
                  </ScheduleList>
                )}
              </DayColumn>
            );
          })}
        </WeekGridContainer>

        {cronograma.length === 0 && (
          <div style={{ textAlign: "center", padding: "60px 20px", color: "#64748b" }}>
            <p style={{ fontSize: "16px" }}>Nenhum cronograma cadastrado</p>
          </div>
        )}
      </Container>
    </PageContainer>
  );
}
