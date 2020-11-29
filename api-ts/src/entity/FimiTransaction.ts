import {
  BaseEntity, Column,


  CreateDateColumn, Entity,


  PrimaryColumn
} from "typeorm";

  @Entity("vw_fimi_transactions")
  export class FimiTransaction extends BaseEntity {
      
    @PrimaryColumn("varchar", {length: 100}) 
    tranid: string;
  
    @CreateDateColumn({nullable: true}) 
    trandate: Date | null;

    @Column("varchar", {length: 20}) 
    accountno: string;

    @Column("varchar", {length: 25}) 
    accountno_emp: string;

    @Column("varchar", {length: 200}) 
    accountname: string;
    
    @Column("varchar", {length: 20}) 
    amount: string;

    @Column("text")
    status: string;

    @Column("text")
    retrial: number;

  }
