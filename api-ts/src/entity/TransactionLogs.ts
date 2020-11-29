import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

  @Entity("transactionLog")
  export class TransactionLog extends BaseEntity {
    
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column("varchar", {length: 255})
    appName: string | null;
  
    @Column("varchar", {nullable: true})
    user: string | null;

    @Column("varchar", {nullable: true})
    branchcode: string | null;    

    @Column("varchar", {nullable: true}) 
    subject: string | null;

    @Column("varchar", {nullable: true}) 
    message: string | null;
    
    @Column("varchar", {nullable: true}) 
    request: string | null;
    
    @Column("varchar") 
    response: string | null;
    
    @Column("varchar", {nullable: true}) 
    ip: string | null;

    @Column("timestamp", {nullable: true})
    createdDate: Date | null;
  
  }
