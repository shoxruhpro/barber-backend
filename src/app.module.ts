import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmployeesModule } from './employees/employees.module';
import { AdminModule } from './admin/admin.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from './employees/entities/employee.entity';
import { AuthModule } from './auth/auth.module';
import { Admin } from './admin/entities/admin.entity';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ServicesModule } from './services/services.module';
import { Service } from './services/entities/service.entity';
import { configs } from './config';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: configs.DB_HOST,
      port: 3306,
      username: configs.DB_USERNAME,
      password: configs.DB_PASS,
      database: configs.DB_NAME,
      entities: [Employee, Service, Admin],
      synchronize: true,
    }),
    EmployeesModule,
    AdminModule,
    AuthModule,
    ServicesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
