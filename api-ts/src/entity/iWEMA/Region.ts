import { Entity, Column, BaseEntity, PrimaryColumn } from "typeorm";

  @Entity("Region")
  export class Region extends BaseEntity {
    
    @PrimaryColumn() 
    RegionCode: number;
  
    @Column("varchar", {length: 100})
    RegionName: string;

    @Column() 
    orderno: number;

    @Column("varchar", {length: 1})
    Status: string;
  }
