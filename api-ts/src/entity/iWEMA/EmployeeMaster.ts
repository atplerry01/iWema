import { BaseEntity, Column, Entity, PrimaryColumn } from "typeorm";

  @Entity("employee_master")
  export class EmployeeMaster extends BaseEntity {
    
    @PrimaryColumn() 
    idno: number;
  
    @Column("varchar", {length: 15})
    EmployeeNumber: string;
  
    @Column("varchar", {length: 100}) 
    EmployeeName: string;

    @Column("varchar", {length: 100}) 
    Email: string;

    @Column()
    employment_date: Date;

    @Column("varchar", {length: 50})
    Job_Title: string;

    @Column("varchar", {length: 50})
    UnitName: string;

    @Column("varchar", {length: 10})
    dept_id: string;

    @Column("varchar", {length: 10})
    branchcode: string;

    @Column()
    gradeid: number;

    @Column("varchar", {length: 20})
    gsmno: string;

    @Column("varchar", {length: 45})
    roleid: string;

    @Column("varchar", {length: 5})
    status: string;
  }
