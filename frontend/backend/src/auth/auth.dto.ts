import { Transform } from "class-transformer";
import { IsEmail, IsString, MaxLength, MinLength } from "class-validator";

const minusculo = ({ value }: { value: unknown }) => (typeof value === "string" ? value.trim().toLowerCase() : value);

export class CredenciaisDto {
  @Transform(minusculo)
  @IsEmail({}, { message: "Informe um e-mail válido." })
  @MaxLength(254)
  email: string;

  @IsString()
  @MinLength(8, { message: "A senha precisa ter pelo menos 8 caracteres." })
  @MaxLength(72, { message: "A senha pode ter no máximo 72 caracteres." }) // limite do bcrypt
  senha: string;
}
