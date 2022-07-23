import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { AbsentEmployeeService } from './absent-employee.service';
import { AbsentEmployeeResolver } from './absent-employee.resolver';
import { AbsentEmployee } from 'src/shared/AbsentEntity';
 
@Module({
  imports: [TypeOrmModule.forFeature([AbsentEmployee])],
  providers: [AbsentEmployeeService, AbsentEmployeeResolver],
  
})
export class AbsentEmployeeModule {}
