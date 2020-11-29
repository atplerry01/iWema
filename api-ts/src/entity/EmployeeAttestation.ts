import { Entity, BaseEntity, PrimaryColumn, CreateDateColumn } from "typeorm";

  @Entity("employee_atestation")
  export class EmployeeAttestation extends BaseEntity {
    
    @PrimaryColumn("varchar", {length: 50}) 
    email: string;

    @PrimaryColumn("varchar", {length: 10}) 
    staffId: string;

    @PrimaryColumn("varchar", {length: 100}) 
    name: string;


    @CreateDateColumn()
    date_accepted: Date;
  }
