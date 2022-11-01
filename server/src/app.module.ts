import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ProjectModule } from './project/project.module';
import { ArchiveModule } from './archive/archive.module';
import { LevelModule } from './level/level.module';
import { DivisionModule } from './division/division.module';
import { StudentModule } from './student/student.module';
import { EmployeeModule } from './employee/employee.module';
import { SemesterModule } from './semester/semester.module';
import { AbsentEmployeeModule } from './absent-employee/absent-employee.module';
import { AbsentStudentModule } from './absent-student/absent-student.module';
import { AuthModule } from './auth/auth.module';
import { ExamModule } from './exam/exam.module';
import { SubjectModule } from './subject/subject.module';
import { GradeModule } from './grade/grade.module';
import { ExamResultModule } from './exam-result/exam-result.module';
import { join } from 'path';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          type: 'postgres',
          // host: config.get('DB_HOST_LOC'),
          // port: config.get('DB_PORT_LOC'),
          // username: config.get('DB_USER_LOC'),
          // password: config.get('DB_PASSWORD_LOC'),
          // database: config.get('DB_DATABASE_LOC'),
          host: config.get('DB_HOST'),
          port: config.get('DB_PORT'),
          username: config.get('DB_USER'),
          password: config.get('DB_PASSWORD'),
          database: config.get('DB_DATABASE'),
          autoLoadEntities: true,
          synchronize: true,
        };
      },
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      cors: {
        origin: 'http://localhost:3000',
        credentials: true,
      },
    }),
    ProjectModule,
    ArchiveModule,
    LevelModule,
    DivisionModule,
    StudentModule,
    EmployeeModule,
    SemesterModule,
    AbsentEmployeeModule,
    AbsentStudentModule,
    AuthModule,
    ExamModule,
    SubjectModule,
    GradeModule,
    ExamResultModule,
  ],
})
export class AppModule {}
