import { Entity, Column, BaseEntity, PrimaryColumn } from "typeorm";

  @Entity("Branches")
  export class Branches extends BaseEntity {
    
    @PrimaryColumn() 
    idno: number;
  
    @Column("varchar", {length: 10})
    BranchCode: string;
  
    @Column("varchar", {length: 100}) 
    BranchName: string;

    @Column() 
    ZoneCode: number;

    @Column("varchar", {length: 500})
    Address: string;

    @Column("varchar", {length: 50})
    State: string;

    @Column("varchar", {length: 15})
    LineNumber: string;

    @Column("varchar", {length: 1})
    Status: string;
  }
