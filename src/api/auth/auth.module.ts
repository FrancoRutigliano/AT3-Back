import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './domain/entities/user.entity';
import { AuthController } from './infrastructure/controllers/auth.controller';
import { UserService } from './domain/services/user.service';
import { UserRepository } from './infrastructure/orm/user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([User])], 
  controllers: [AuthController],
  providers: [UserService, UserRepository],
  exports: [UserService], 
})
export class AuthModule {}
