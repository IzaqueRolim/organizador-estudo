import { PartialType } from "@nestjs/mapped-types";
import { Type } from "class-transformer";
import {
  ArrayMaxSize,
  IsArray,
  IsBoolean,
  IsIn,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Matches,
  Max,
  MaxLength,
  Min,
  MinLength,
  ValidateNested,
} from "class-validator";

export const NIVEIS = ["fundamental", "medio", "tecnico", "superior", "outro"] as const;
export const STATUS = ["pendente", "em_estudo", "concluido"] as const;
export const TIPOS = ["teoria", "questoes", "revisao", "resumo", "simulado", "leitura"] as const;
export const ATIVIDADES = ["aula", "questoes", "revisao", "leitura", "resumo", "simulado"] as const;

/** "" ou "AAAA-MM-DD" (vazio vira NULL no banco). */
const DATA = /^(\d{4}-\d{2}-\d{2})?$/;
const HORA = /^([01]\d|2[0-3]):[0-5]\d$/;

export class ConcursoDto {
  @IsOptional() @IsUUID() id?: string;
  @IsString() @MinLength(1) @MaxLength(200) titulo: string;
  @IsOptional() @IsString() @MaxLength(200) orgao?: string;
  @IsOptional() @IsString() @MaxLength(200) banca?: string;
  @IsOptional() @IsString() @MaxLength(200) cargo?: string;
  @IsOptional() @IsIn(NIVEIS) nivel?: string;
  @IsOptional() @IsInt() @Min(0) @Max(10_000_000) vagas?: number;
  @IsOptional() @IsNumber() @Min(0) @Max(9_999_999_999) salario?: number;
  @IsOptional() @Matches(DATA) dataProva?: string;
  @IsOptional() @Matches(DATA) dataInscricaoInicio?: string;
  @IsOptional() @Matches(DATA) dataInscricaoFim?: string;
  @IsOptional() @IsString() @MaxLength(2000) urlEdital?: string;
  @IsOptional() @IsString() @MaxLength(10_000) observacoes?: string;
  @IsOptional() @IsNumber() @Min(0) @Max(168) metaHorasSemana?: number;
}
export class AtualizarConcursoDto extends PartialType(ConcursoDto) {}

export class DisciplinaDto {
  @IsOptional() @IsUUID() id?: string;
  @IsUUID() concursoId: string;
  @IsString() @MinLength(1) @MaxLength(300) nome: string;
  @IsOptional() @Matches(/^#[0-9a-fA-F]{6}$/) cor?: string;
  @IsOptional() @IsNumber() @Min(0) @Max(1000) peso?: number;
  @IsOptional() @IsInt() @Min(0) ordem?: number;
}
export class AtualizarDisciplinaDto {
  @IsOptional() @IsString() @MinLength(1) @MaxLength(300) nome?: string;
  @IsOptional() @Matches(/^#[0-9a-fA-F]{6}$/) cor?: string;
  @IsOptional() @IsNumber() @Min(0) @Max(1000) peso?: number;
  @IsOptional() @IsInt() @Min(0) ordem?: number;
}

export class ConteudoDto {
  @IsOptional() @IsUUID() id?: string;
  @IsUUID() disciplinaId: string;
  @IsOptional() @IsUUID() parentId?: string | null;
  @IsString() @MinLength(1) @MaxLength(2000) titulo: string;
  @IsOptional() @IsString() @MaxLength(5000) observacao?: string;
  @IsOptional() @IsIn(STATUS) status?: string;
  @IsOptional() @IsInt() @Min(0) ordem?: number;
}
export class AtualizarConteudoDto {
  @IsOptional() @IsString() @MinLength(1) @MaxLength(2000) titulo?: string;
  @IsOptional() @IsString() @MaxLength(5000) observacao?: string;
  @IsOptional() @IsIn(STATUS) status?: string;
  @IsOptional() @IsInt() @Min(0) ordem?: number;
}
export class StatusEmLoteDto {
  @IsArray() @ArrayMaxSize(5000) @IsUUID("all", { each: true }) ids: string[];
  @IsIn(STATUS) status: string;
}

export class CronogramaDto {
  @IsOptional() @IsUUID() id?: string;
  @IsUUID() concursoId: string;
  @IsOptional() @IsUUID() disciplinaId?: string | null;
  @IsOptional() @IsUUID() conteudoId?: string | null;
  @Matches(/^\d{4}-\d{2}-\d{2}$/) data: string;
  @IsOptional() @Matches(HORA) horario?: string;
  @IsOptional() @IsInt() @Min(5) @Max(1440) duracaoMinutos?: number;
  @IsOptional() @IsString() @MaxLength(2000) titulo?: string;
  @IsOptional() @IsString() @MaxLength(5000) descricao?: string;
  @IsOptional() @IsIn(TIPOS) tipo?: string;
  @IsOptional() @IsBoolean() concluido?: boolean;
}
export class AtualizarCronogramaDto {
  @IsOptional() @IsUUID() disciplinaId?: string | null;
  @IsOptional() @IsUUID() conteudoId?: string | null;
  @IsOptional() @Matches(/^\d{4}-\d{2}-\d{2}$/) data?: string;
  @IsOptional() @Matches(HORA) horario?: string;
  @IsOptional() @IsInt() @Min(5) @Max(1440) duracaoMinutos?: number;
  @IsOptional() @IsString() @MaxLength(2000) titulo?: string;
  @IsOptional() @IsString() @MaxLength(5000) descricao?: string;
  @IsOptional() @IsIn(TIPOS) tipo?: string;
  @IsOptional() @IsBoolean() concluido?: boolean;
}

export class RegistroDto {
  @IsOptional() @IsUUID() id?: string;
  @IsUUID() concursoId: string;
  @IsOptional() @IsUUID() disciplinaId?: string | null;
  @IsOptional() @IsUUID() conteudoId?: string | null;
  @IsOptional() @IsUUID() cronogramaItemId?: string | null;
  @Matches(/^\d{4}-\d{2}-\d{2}$/) data: string;
  @IsInt() @Min(1) @Max(1440) minutos: number;
  @IsOptional() @IsArray() @ArrayMaxSize(6) @IsIn(ATIVIDADES, { each: true }) atividades?: string[];
  @IsOptional() @IsInt() @Min(0) @Max(100_000) questoesFeitas?: number;
  @IsOptional() @IsInt() @Min(0) @Max(100_000) questoesAcertos?: number;
  @IsOptional() @IsInt() @Min(1) @Max(5) foco?: number | null;
  @IsOptional() @IsString() @MaxLength(10_000) anotacao?: string;
  @IsOptional() @IsString() iniciadoEm?: string | null;
}
export class AtualizarRegistroDto {
  @IsOptional() @IsUUID() disciplinaId?: string | null;
  @IsOptional() @IsUUID() conteudoId?: string | null;
  @IsOptional() @Matches(/^\d{4}-\d{2}-\d{2}$/) data?: string;
  @IsOptional() @IsInt() @Min(1) @Max(1440) minutos?: number;
  @IsOptional() @IsArray() @ArrayMaxSize(6) @IsIn(ATIVIDADES, { each: true }) atividades?: string[];
  @IsOptional() @IsInt() @Min(0) @Max(100_000) questoesFeitas?: number;
  @IsOptional() @IsInt() @Min(0) @Max(100_000) questoesAcertos?: number;
  @IsOptional() @IsInt() @Min(1) @Max(5) foco?: number | null;
  @IsOptional() @IsString() @MaxLength(10_000) anotacao?: string;
}

/** Pacote completo usado na importação (backup / dados da versão antiga). */
export class PacoteDto {
  @IsArray() @ArrayMaxSize(200) @ValidateNested({ each: true }) @Type(() => ConcursoDto) concursos: ConcursoDto[];
  @IsArray() @ArrayMaxSize(5000) @ValidateNested({ each: true }) @Type(() => DisciplinaDto) disciplinas: DisciplinaDto[];
  @IsArray() @ArrayMaxSize(100_000) @ValidateNested({ each: true }) @Type(() => ConteudoDto) conteudos: ConteudoDto[];
  @IsArray() @ArrayMaxSize(100_000) @ValidateNested({ each: true }) @Type(() => CronogramaDto) cronograma: CronogramaDto[];
  @IsArray() @ArrayMaxSize(200_000) @ValidateNested({ each: true }) @Type(() => RegistroDto) registros: RegistroDto[];
}
