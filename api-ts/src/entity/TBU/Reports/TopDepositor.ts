import { BaseEntity, Column, Entity, PrimaryColumn } from "typeorm";

  @Entity("treasury_topdepositor")
  export class TopDepositor extends BaseEntity {
    
    @PrimaryColumn() 
    Id: number;
  
    @Column()
    producttype: number;
  
    @Column()
    branch: string;

    @Column() 
    currency: string;

    @Column() 
    accountnumber: string;

    @Column() 
    customername: string;

    @Column() 
    clearedbalance: string;
  
  }
