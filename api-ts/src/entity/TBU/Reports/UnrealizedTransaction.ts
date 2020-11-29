import { BaseEntity, Column, Entity, PrimaryColumn } from "typeorm";

  @Entity("treasury_urealizedtransaction")
  export class UnrealizedTransaction extends BaseEntity {
    
    @PrimaryColumn() 
    Id: number;
  
    @Column()
    buydealnumber: number;
  
    @Column()
    selldealnumber: string;

    @Column() 
    transactiondate: string;

    @Column() 
    datetorealise: string;

    @Column() 
    quantityrealized: string;

    @Column() 
    holdingnumber: string;
    
    @Column() 
    buyprice: string;

    @Column() 
    sellprice: string;
  
  }
