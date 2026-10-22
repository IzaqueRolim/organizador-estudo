import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { config } from "../config";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtAuthGuard } from "./jwt-auth.guard";

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: config.jwtSecret,
      signOptions: { algorithm: "HS256", expiresIn: config.jwtExpiresIn as never },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtAuthGuard],
  exports: [JwtAuthGuard],
})
export class AuthModule {}
