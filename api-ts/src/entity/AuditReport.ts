import {
  BaseEntity, Column, Entity,


  PrimaryColumn
} from "typeorm";

  @Entity("AuditReport")
  export class AuditReport extends BaseEntity {
    
    @PrimaryColumn() 
    Id: number;
  
    @Column()
    process_id: number;
  
    @Column()
    transaction_date: string;

    @Column() 
    account_number: string;

    @Column() 
    transaction_id: string;

    @Column('json') 
    account_info: string;
  
    // @Column() 
    // AdditionalInfo: string;
  }
