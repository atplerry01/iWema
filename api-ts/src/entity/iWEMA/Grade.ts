import { Entity, Column, BaseEntity, PrimaryColumn } from "typeorm";

  @Entity("grades")
  export class Grade extends BaseEntity {
    
    @PrimaryColumn() 
    idno: number;
    
    @Column() 
    gradeid: number;

    @Column("varchar", {length: 90})
    GradeName: string;
  
    @Column("varchar", {length: 10}) 
    gradeshortname: string;

    @Column("varchar", {length: 1})
    Status: string;
    
  }
