import { Entity, Column, BaseEntity, PrimaryColumn } from "typeorm";

  @Entity("Zones")
  export class Zone extends BaseEntity {
    
    @PrimaryColumn() 
    ZoneCode: number;
  
    @Column("varchar", {length: 100})
    ZoneName: string;
  
    @Column() 
    RegionCode: number;

    @Column("varchar", {length: 1})
    Status: string;
  }
