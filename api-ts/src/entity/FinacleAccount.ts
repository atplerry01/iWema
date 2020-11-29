import { Entity, Column, BaseEntity, PrimaryColumn } from "typeorm";

  @Entity("FINACLE_ACCOUNTS")
  export class FinacleAccount extends BaseEntity {
    
    @PrimaryColumn("varchar", {length: 16}) 
    accountnumber: string;
  
    @Column("varchar", {length: 50})
    customerid: string;
  
    @Column("varchar", {length: 11}) 
    acid: string;

    @Column("varchar", {length: 800})
    accountname: string;

  }
