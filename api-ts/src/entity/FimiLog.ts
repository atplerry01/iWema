import {
    Entity,
    Column,
    BaseEntity,
    PrimaryColumn,
    CreateDateColumn
  } from "typeorm";

  @Entity("vw_fimi_logs")
  export class FimiLog extends BaseEntity {
    
    @PrimaryColumn("varchar", {length: 100})
    tranid: string;
  
    @CreateDateColumn({nullable: true}) 
    logdate: Date | null;

    @Column("varchar", {length: 15}) 
    accountno: string;

    @Column("varchar", {length: 25}) 
    accountno_emp: string;

    @Column("varchar", {length: 200}) 
    accountname: string;
    
    @Column("varchar", {length: 20}) 
    amount: string;

    @Column("text")
    error_desc: string;
    
  }
