import { ConfigurableModuleBuilder, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type:"postgres",
      host:"db",
      port:5432,
      username:"admin",
      password:"password",
      database:"example",
      autoLoadEntities:true,
      synchronize:true,
    })],
  controllers: [],
  providers: [],
})
export class AppModule {}
