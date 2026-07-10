import styled from "styled-components";
import type { AppPage } from "../../components/Header";
import { useConcurso } from "../../hooks/useConcurso";
import {
  calcularDiasAteProva,
  formatarData,
  progressoConcurso,
  totalConcluidosConcurso,
  totalConteudosConcurso,
} from "../../utils/concursoStats";

interface InformacoesConcursoProps {
  onNavigate: (page: AppPage) => void;
}

const formatCurrency = (value: number) =>
  value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

const PageContainer = styled.main`
  min-height: 100vh;
  background: #0f172a;
  padding: 32px;
  color: #e2e8f0;
`;

const Container = styled.div`
  max-width: 1200px;
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

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 16px;
  margin-bottom: 40px;
`;

const InfoCard = styled.div`
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 12px;
  padding: 20px;
  transition: all 0.2s;

  &:hover {
    border-color: #475569;
    background: #1e293b;
  }

  dt {
    color: #94a3b8;
    font-size: 12px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-bottom: 8px;
  }

  dd {
    font-size: 18px;
    font-weight: 600;
    margin: 0;
  }
`;

const DisciplinasSection = styled.section`
  margin-bottom: 40px;
`;

const SectionTitle = styled.h2`
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 20px;
  color: #f1f5f9;
`;

const DisciplinasGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 16px;
`;

const DisciplinaCard = styled.div<{ $cor?: string }>`
  background: #1e293b;
  border-left: 4px solid ${(props) => props.$cor || "#64748b"};
  border-radius: 8px;
  padding: 20px;
  transition: all 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25);
  }

  h3 {
    font-size: 16px;
    font-weight: 700;
    margin: 0 0 12px 0;
    color: #f1f5f9;
  }

  dl {
    display: flex;
    flex-direction: column;
    gap: 8px;

    > div {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    dt {
      font-size: 12px;
      color: #94a3b8;
      font-weight: 600;
    }

    dd {
      font-size: 14px;
      font-weight: 600;
      margin: 0;
      color: #cbd5e1;
    }
  }
`;

const ActionsSection = styled.section`
  background: #1e293b;
  border-radius: 12px;
  padding: 24px;
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-top: 40px;
`;

const ActionButton = styled.button`
  padding: 10px 20px;
  border-radius: 8px;
  border: none;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 14px;

  &.primary {
    background: #3b82f6;
    color: white;

    &:hover {
      background: #2563eb;
      transform: translateY(-1px);
    }
  }

  &.secondary {
    background: #334155;
    color: #e2e8f0;

    &:hover {
      background: #475569;
    }
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background: #334155;
  border-radius: 4px;
  overflow: hidden;
  margin: 16px 0;

  span {
    display: block;
    height: 100%;
    background: linear-gradient(90deg, #3b82f6, #1e40af);
    transition: width 0.3s;
  }
`;

export function InformacoesConcurso({ onNavigate }: InformacoesConcursoProps) {
  const { concurso } = useConcurso();

  const dias = calcularDiasAteProva(concurso.dataProva);
  const progresso = progressoConcurso(concurso);
  const totalConteudos = totalConteudosConcurso(concurso);
  const concluidos = totalConcluidosConcurso(concurso);
  const totalPeso = concurso.disciplinas.reduce(
    (total, disciplina) => total + disciplina.peso,
    0,
  );

  return (
    <PageContainer>
      <Container>
        <PageTitle>
          <div>
            <span>Informações</span>
            <h1>{concurso.titulo}</h1>
            <p>
              {concurso.cargo || "Cargo não informado"} / {concurso.banca || "Banca não informada"}
            </p>
          </div>
        </PageTitle>

        <InfoGrid>
          <InfoCard>
            <dl>
              <dt>Prova</dt>
              <dd>{formatarData(concurso.dataProva)}</dd>
            </dl>
          </InfoCard>

          <InfoCard>
            <dl>
              <dt>Dias para prova</dt>
              <dd>{dias === null ? "--" : dias}</dd>
            </dl>
          </InfoCard>

          <InfoCard>
            <dl>
              <dt>Órgão</dt>
              <dd>{concurso.orgao || "Não informado"}</dd>
            </dl>
          </InfoCard>

          <InfoCard>
            <dl>
              <dt>Salário</dt>
              <dd>{formatCurrency(concurso.salario)}</dd>
            </dl>
          </InfoCard>

          <InfoCard>
            <dl>
              <dt>Vagas</dt>
              <dd>{concurso.vagas}</dd>
            </dl>
          </InfoCard>

          <InfoCard>
            <dl>
              <dt>Nível</dt>
              <dd>{concurso.nivel}</dd>
            </dl>
          </InfoCard>
        </InfoGrid>

        <section>
          <SectionTitle>Progresso Geral</SectionTitle>
          <InfoCard>
            <dl>
              <dt>Conteúdos Concluídos</dt>
              <dd>
                {concluidos} / {totalConteudos}
              </dd>
            </dl>
            <ProgressBar aria-label={`Progresso ${progresso}%`}>
              <span style={{ width: `${progresso}%` }} />
            </ProgressBar>
          </InfoCard>
        </section>

        <DisciplinasSection>
          <SectionTitle>Disciplinas ({concurso.disciplinas.length})</SectionTitle>
          {concurso.disciplinas.length === 0 ? (
            <div style={{ textAlign: "center", padding: "40px", color: "#94a3b8" }}>
              <p>Nenhuma disciplina cadastrada</p>
            </div>
          ) : (
            <>
              <DisciplinasGrid>
                {concurso.disciplinas.map((disciplina) => {
                  const conteudosDisciplina = disciplina.conteudos;
                  const concluidosDisciplina = conteudosDisciplina.filter(
                    (c) => c.status === "concluido",
                  ).length;

                  return (
                    <DisciplinaCard key={disciplina.id} $cor={disciplina.cor}>
                      <h3>{disciplina.nome}</h3>
                      <dl>
                        <div>
                          <dt>Peso</dt>
                          <dd>{disciplina.peso.toFixed(1)}</dd>
                        </div>
                        <div>
                          <dt>Conteúdos</dt>
                          <dd>
                            {concluidosDisciplina} / {conteudosDisciplina.length}
                          </dd>
                        </div>
                        <div>
                          <dt>Progresso</dt>
                          <dd>
                            {conteudosDisciplina.length === 0
                              ? "0%"
                              : (
                                  (concluidosDisciplina / conteudosDisciplina.length) *
                                  100
                                ).toFixed(0) + "%"}
                          </dd>
                        </div>
                      </dl>
                    </DisciplinaCard>
                  );
                })}
              </DisciplinasGrid>

              <InfoCard style={{ marginTop: "16px" }}>
                <dl>
                  <dt>Peso Total</dt>
                  <dd>{totalPeso.toFixed(1)}</dd>
                </dl>
              </InfoCard>
            </>
          )}
        </DisciplinasSection>

        <ActionsSection>
          <ActionButton className="primary" onClick={() => onNavigate("cadastro")}>
            Editar Dados do Concurso
          </ActionButton>
          <ActionButton className="secondary" onClick={() => onNavigate("edital")}>
            Ver Edital
          </ActionButton>
          <ActionButton className="secondary" onClick={() => onNavigate("pesos")}>
            Definir Pesos das Disciplinas
          </ActionButton>
          <ActionButton className="secondary" onClick={() => onNavigate("cronograma")}>
            Gerenciar Cronograma
          </ActionButton>
          <ActionButton className="secondary" onClick={() => onNavigate("visualizar-cronograma")}>
            Visualizar Cronograma
          </ActionButton>
        </ActionsSection>
      </Container>
    </PageContainer>
  );
}
