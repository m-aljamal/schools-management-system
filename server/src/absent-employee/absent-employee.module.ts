import { Module } from '@nestjs/common';
import { AbsentEmployeeService } from './absent-employee.service';
import { AbsentEmployeeResolver } from './absent-employee.resolver';

@Module({
  providers: [AbsentEmployeeService, AbsentEmployeeResolver]
})
export class AbsentEmployeeModule {}
