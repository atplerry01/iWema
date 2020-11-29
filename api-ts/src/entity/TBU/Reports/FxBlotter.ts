import { BaseEntity, Column, Entity, PrimaryColumn } from "typeorm";

  @Entity("fx_blotter_bal")
  export class FxBlotter extends BaseEntity {
    
    @PrimaryColumn() 
    Id: number;

    @Column()
    RequestDate: string;

    @Column()
    OpenBalanceUsd: string;

    @Column() 
    OpenBalanceNgn: string;

    @Column() 
    NewRate: string;
  
  }
